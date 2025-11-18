"use client";
import React, { useState, useEffect, useCallback } from "react";
import "./style/itemBid.css";
import { FaPlus, FaMinus, FaTimes } from "react-icons/fa";
import AuctionTimer from "./auctionTimer";
import getSocket from "./bid/socket";
import { API_URL } from "../../../utils/api";
import { useRouter } from "next/navigation";

const ItemBid = ({ items }) => {
  const [currentBid, setCurrentBid] = useState(null);
  const [bidAmount, setBidAmount] = useState(0);
  const [minimumBid, setMinimumBid] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isAuctionEnded, setIsAuctionEnded] = useState(false);
  const [winner, setWinner] = useState(null);
  const [hasBids, setHasBids] = useState(false);
  const [newBidNotification, setNewBidNotification] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isCurrentHighestBidder, setIsCurrentHighestBidder] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  
  const router = useRouter();
  const itemId = items && items.length > 0 ? items[0]?.id : null;
  const item = items && items.length > 0 ? items[0] : null;

  // Get user info from localStorage on client side only
  useEffect(() => {
    if (typeof window !== "undefined") {
      setUserId(localStorage.getItem("userId"));
      setUserRole(localStorage.getItem("role"));
    }
  }, []);

  // Fetch current bid and auction status
  const fetchCurrentBid = useCallback(async () => {
    if (!itemId) return;

    try {
      const response = await fetch(`${API_URL}/bid/current/${itemId}`);
      const data = await response.json();
      
      if (data.hasBids) {
        setCurrentBid(data.bid);
        setHasBids(true);
        // Check if current user is the highest bidder
        if (userId && data.bid.bidder && data.bid.bidder.id === parseInt(userId)) {
          setIsCurrentHighestBidder(true);
        } else {
          setIsCurrentHighestBidder(false);
        }
        // Calculate minimum bid
        const minIncrement = data.bid.bidAmount < 100 ? 5 : 
                            data.bid.bidAmount < 1000 ? 10 : 
                            data.bid.bidAmount < 10000 ? 50 : 100;
        setMinimumBid(data.bid.bidAmount + minIncrement);
        setBidAmount(data.bid.bidAmount + minIncrement);
      } else {
        setHasBids(false);
        setCurrentBid(null);
        setIsCurrentHighestBidder(false);
        setMinimumBid(item?.price || 0);
        setBidAmount(item?.price || 0);
      }
    } catch (error) {
      console.error("Error fetching current bid:", error);
    }
  }, [itemId, item]);

  // Check auction status and winner
  const checkAuctionStatus = useCallback(async () => {
    if (!itemId || !item) return;

    const now = new Date();
    const endTime = new Date(item.timeEnd);
    
    if (now >= endTime) {
      setIsAuctionEnded(true);
      // Fetch winner
      try {
        const response = await fetch(`${API_URL}/bid/winner/${itemId}`);
        const data = await response.json();
        if (data.ended && data.hasWinner) {
          setWinner(data.winner);
        }
      } catch (error) {
        console.error("Error fetching winner:", error);
      }
    } else {
      setIsAuctionEnded(false);
    }
  }, [itemId, item]);

  // Initial load
  useEffect(() => {
    if (itemId && item) {
      fetchCurrentBid();
      checkAuctionStatus();
      
      // Check auction status periodically
      const statusInterval = setInterval(checkAuctionStatus, 60000); // Every minute
      
      return () => clearInterval(statusInterval);
    }
  }, [itemId, item, fetchCurrentBid, checkAuctionStatus]);

  // Socket setup for real-time updates
  useEffect(() => {
    if (!itemId || typeof window === "undefined") return;

    const socket = getSocket();
    // Join the item's room
    socket.emit("create", itemId.toString());

    // Handle new bid notifications
    const handlePlacedBid = (data) => {
      if (data.bidAmount) {
        const newBidAmount = typeof data.bidAmount === 'string' ? parseFloat(data.bidAmount) : data.bidAmount;
        
        // If someone else bid (not current user), reset the highest bidder status
        // This allows the user to bid again
        if (data.userId && data.userId !== userId) {
          setIsCurrentHighestBidder(false);
        } else if (data.userId === userId) {
          // If current user bid, mark them as highest bidder
          setIsCurrentHighestBidder(true);
        }
        
        setCurrentBid(prev => ({
          ...prev,
          bidAmount: newBidAmount,
          createdAt: new Date()
        }));
        setHasBids(true);
        
        // Calculate new minimum bid
        const minIncrement = newBidAmount < 100 ? 5 : 
                            newBidAmount < 1000 ? 10 : 
                            newBidAmount < 10000 ? 50 : 100;
        const newMinimum = newBidAmount + minIncrement;
        setMinimumBid(newMinimum);
        setBidAmount(newMinimum);
        
        // Show notification
        setNewBidNotification({
          amount: newBidAmount,
          timestamp: new Date()
        });
        
        setTimeout(() => setNewBidNotification(null), 3000);
      }
    };

    const handleNotification = (message) => {
      const bidAmount = parseFloat(message);
      if (!isNaN(bidAmount)) {
        handlePlacedBid({ bidAmount });
      }
    };

    socket.on("placedBid", handlePlacedBid);
    socket.on("notification", handleNotification);

    return () => {
      socket.off("placedBid", handlePlacedBid);
      socket.off("notification", handleNotification);
    };
  }, [itemId, userId]);

  // Calculate minimum increment based on current bid
  const calculateMinIncrement = (amount) => {
    if (amount < 100) return 5;
    if (amount < 1000) return 10;
    if (amount < 10000) return 50;
    return 100;
  };

  // Adjust bid amount
  const adjustBid = (amount) => {
    if (isAuctionEnded || isLoading) return;
    
    const newAmount = bidAmount + amount;
    const minBid = hasBids && currentBid ? 
      currentBid.bidAmount + calculateMinIncrement(currentBid.bidAmount) : 
      (item?.price || 0);
    
    if (newAmount >= minBid) {
      setBidAmount(newAmount);
      setErrorMessage("");
    }
  };

  // Handle input change
  const handleInputChange = (e) => {
    if (isAuctionEnded || isLoading) return;
    
    const value = Number(e.target.value);
    if (!isNaN(value) && value >= 0) {
      setBidAmount(value);
      setErrorMessage("");
    }
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Handle bid submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prevent concurrent bid submissions - early return if already processing
    if (isLoading) {
      console.log("Bid submission already in progress. Please wait...");
      return;
    }
    
    // Check if user is logged in and is a client
    if (!userId || userRole !== "client") {
      setShowLoginModal(true);
      return;
    }

    if (!itemId) {
      setErrorMessage("Item information is missing.");
      return;
    }

    if (isAuctionEnded) {
      setErrorMessage("This auction has ended.");
      return;
    }

    // Client-side validation
    if (!hasBids) {
      setErrorMessage("You cannot place the first bid. Please wait for someone else to start the bidding.");
      return;
    }

    // Check if user is the current highest bidder
    if (isCurrentHighestBidder) {
      setErrorMessage("You are currently the highest bidder. Please wait for another user to place a bid before you can bid again.");
      return;
    }

    const minBid = minimumBid;
    if (bidAmount < minBid) {
      setErrorMessage(`Minimum bid is ${formatCurrency(minBid)}.`);
      return;
    }

    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await fetch(`${API_URL}/bid/placeBid`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          itemId: itemId,
          bidAmount: bidAmount,
        }),
      });

      let data;
      try {
        data = await response.json();
      } catch (parseError) {
        console.error("Error parsing response:", parseError);
        setErrorMessage("Invalid response from server. Please try again.");
        setIsLoading(false);
        return;
      }

      if (!response.ok) {
        setErrorMessage(data.message || "Failed to place bid. Please try again.");
        setIsLoading(false);
        return;
      }

      // Success
      setSuccessMessage("Bid placed successfully!");
      setIsLoading(false);
      
      // Mark user as current highest bidder
      setIsCurrentHighestBidder(true);
      
      // Refresh current bid
      setTimeout(() => {
        fetchCurrentBid();
        setSuccessMessage("");
      }, 2000);

      // Emit socket event
      if (typeof window !== "undefined") {
        const socket = getSocket();
        socket.emit("placeBid", {
          userId: userId,
          itemId: itemId,
          bidAmount: bidAmount,
        });
      }

    } catch (error) {
      console.error("Error placing bid:", error);
      setErrorMessage("Network error. Please check your connection and try again.");
      setIsLoading(false);
    }
  };

  // Don't render if items are not loaded
  if (!items || items.length === 0 || !item) {
    return <div className="summary">Loading item data...</div>;
  }

  return (
    <div className="summary">
      <div className="bid-card">
        {/* Auction Ended Banner */}
        {isAuctionEnded && (
          <div className="auction-ended-banner">
            <h3>🏆 Auction Ended</h3>
            {winner ? (
              <div className="winner-info">
                <p className="winner-label">Winner:</p>
                <p className="winner-name">{winner.bidder.name}</p>
                <p className="winner-amount">{formatCurrency(winner.bidAmount)}</p>
              </div>
            ) : (
              <p>No bids were placed.</p>
            )}
          </div>
        )}

        {/* Current Bid Display */}
        <div className="current-bid-section">
          {hasBids && currentBid ? (
            <>
              <p className="current-bid-label">Current Highest Bid</p>
              <p className="current-bid-amount pulse-animation">
                {formatCurrency(currentBid.bidAmount)}
              </p>
              {currentBid.bidder && (
                <p className="current-bidder">by {currentBid.bidder.name}</p>
              )}
            </>
          ) : (
            <>
              <p className="current-bid-label">Starting Price</p>
              <p className="current-bid-amount">{formatCurrency(item.price)}</p>
              <p className="no-bids-message">No bids yet - Waiting for first bidder</p>
            </>
          )}
        </div>

        {/* Auction Timer */}
        <div className="auction-time-section">
            <AuctionTimer startTime={item.timeStart} endTime={item.timeEnd} />
          </div>

        {/* Bid Form */}
        {!isAuctionEnded && (
          <div className="bid-form-section">
            <form onSubmit={handleSubmit} className="bid-form" noValidate>
              <div className="bid-input-group">
                <label className="bid-label">
                  {hasBids ? `Minimum Bid: ${formatCurrency(minimumBid)}` : "Enter your bid"}
                </label>
                
                <div className="bid-input-container">
                  <button
                    type="button"
                    className="bid-adjust-btn"
                    onClick={() => adjustBid(-calculateMinIncrement(bidAmount))}
                    disabled={isLoading || bidAmount <= minimumBid}
                    aria-label="Decrease bid"
                  >
                    <FaMinus />
                  </button>
                  
                  <input
                    type="number"
                    className="bid-input"
                    value={bidAmount}
                    onChange={handleInputChange}
                    min={minimumBid}
                    step={calculateMinIncrement(bidAmount)}
                    disabled={isLoading || !hasBids}
                    placeholder={formatCurrency(minimumBid)}
                  />
                  
                  <button
                    type="button"
                    className="bid-adjust-btn"
                    onClick={() => adjustBid(calculateMinIncrement(bidAmount))}
                    disabled={isLoading}
                    aria-label="Increase bid"
                  >
                    <FaPlus />
                  </button>
                </div>

                {/* Quick increment buttons */}
                {hasBids && (
                  <div className="quick-increment-buttons">
                    <button
                      type="button"
                      onClick={() => setBidAmount(minimumBid)}
                      className="increment-btn"
                      disabled={isLoading}
                    >
                      +{calculateMinIncrement(minimumBid)}
                    </button>
                    <button
                      type="button"
                      onClick={() => setBidAmount(minimumBid + 10)}
                      className="increment-btn"
                      disabled={isLoading}
                    >
                      +10
                    </button>
                    <button
                      type="button"
                      onClick={() => setBidAmount(minimumBid + 50)}
                      className="increment-btn"
                      disabled={isLoading}
                    >
                      +50
                    </button>
                    <button
                      type="button"
                      onClick={() => setBidAmount(minimumBid + 100)}
                      className="increment-btn"
                      disabled={isLoading}
                    >
                      +100
                    </button>
                  </div>
                )}
              </div>

              {/* Error Message */}
              {errorMessage && (
                <div className="error-message" role="alert">
                  <span className="error-icon">⚠️</span>
                  {errorMessage}
                </div>
              )}

              {/* Success Message */}
              {successMessage && (
                <div className="success-message" role="alert">
                  <span className="success-icon">✓</span>
                  {successMessage}
                </div>
              )}

              {/* Submit Button */}
                  <button
                    type="submit"
                className="bid-submit-btn"
                disabled={isLoading || !hasBids || isAuctionEnded || isCurrentHighestBidder}
              >
                {isLoading ? (
                  <>
                    <span className="spinner"></span>
                    Placing Bid...
                  </>
                ) : !hasBids ? (
                  "Waiting for First Bid"
                ) : isCurrentHighestBidder ? (
                  "Waiting for Another Bidder"
                ) : (
                  `Place Bid - ${formatCurrency(bidAmount)}`
                )}
                  </button>

              {!hasBids && (
                <p className="info-message">
                  You cannot place the first bid. Please wait for someone else to start the bidding.
                </p>
              )}

              {isCurrentHighestBidder && hasBids && (
                <div className="info-message bg-blue-50 border-blue-200 text-blue-800">
                  <span className="font-semibold">✓ You are the current highest bidder!</span>
                  <p className="text-sm mt-1">Please wait for another user to place a bid before you can bid again.</p>
                </div>
              )}
              </form>
                      </div>
        )}

        {/* New Bid Notification */}
        {newBidNotification && (
          <div className="new-bid-notification slide-in">
            <span className="notification-icon">🔔</span>
                      <div>
              <p className="notification-title">New Bid Placed!</p>
              <p className="notification-amount">{formatCurrency(newBidNotification.amount)}</p>
                    </div>
                  </div>
                )}

        {/* Auction End Info */}
        <div className="auction-info">
          <p className="auction-end-info">
            Auction ends: {new Date(item.timeEnd).toLocaleString()}
                        </p>
                      </div>
              </div>

      {/* Login Required Modal */}
      {showLoginModal && (
        <div className="login-modal-overlay" onClick={() => setShowLoginModal(false)}>
          <div className="login-modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="login-modal-close"
              onClick={() => setShowLoginModal(false)}
              aria-label="Close modal"
            >
              <FaTimes />
            </button>
            <div className="login-modal-header">
              <div className="login-modal-icon">
                <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
              <h2 className="login-modal-title">Login Required</h2>
              <p className="login-modal-message">
                {userRole === "seller" 
                  ? "Sellers cannot place bids. Please log in as a client to bid on auctions."
                  : "You need to be logged in as a client to place bids on auctions."}
                        </p>
                      </div>
            <div className="login-modal-body">
              <p className="text-gray-600 mb-6">
                {userRole === "seller" 
                  ? "Sellers can only list items for auction, not place bids. Switch to a client account to bid."
                  : "Please log in to your client account to continue bidding on this item."}
              </p>
              <div className="flex flex-col gap-3">
                {userRole === "seller" ? (
                  <>
                    <button
                      onClick={() => {
                        // Clear seller session and redirect to role selection
                        localStorage.clear();
                        router.push("/");
                      }}
                      className="login-modal-btn-primary"
                    >
                      Switch to Client Account
                    </button>
                    <button
                      onClick={() => setShowLoginModal(false)}
                      className="login-modal-btn-secondary"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        // Store current URL to return after login
                        if (typeof window !== "undefined") {
                          localStorage.setItem("returnUrl", window.location.pathname);
                        }
                        router.push("/login/client");
                      }}
                      className="login-modal-btn-primary"
                    >
                      Go to Login Page
                    </button>
                    <button
                      onClick={() => setShowLoginModal(false)}
                      className="login-modal-btn-secondary"
                    >
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemBid;
