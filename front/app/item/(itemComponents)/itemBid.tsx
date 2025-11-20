"use client";
import React, { useState, useEffect, useCallback } from "react";
import "./style/itemBid.css";
import { FaPlus, FaMinus, FaTimes } from "react-icons/fa";
import AuctionTimer from "./auctionTimer";
import LiveAuctionTimer from "./liveAuctionTimer";
import ProxyBid from "./proxyBid";
import getSocket from "./bid/socket";
import { API_URL } from "../../../utils/api";
import { useRouter } from "next/navigation";
import InfoTooltip from "../../components/InfoTooltip";

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

    // Track notification timeout for cleanup
    let notificationTimeout: NodeJS.Timeout | null = null;

    // Handle new bid notifications
    const handlePlacedBid = (data) => {
      if (data.bidAmount) {
        const newBidAmount = typeof data.bidAmount === 'string' ? parseFloat(data.bidAmount) : data.bidAmount;
        
        // Convert both userIds to integers for proper comparison
        const currentUserIdInt = userId ? parseInt(userId) : null;
        const bidUserIdInt = data.userId ? parseInt(data.userId) : null;
        
        // Check if this is someone else's bid (not current user)
        const isSomeoneElseBid = bidUserIdInt && currentUserIdInt && bidUserIdInt !== currentUserIdInt;
        const isCurrentUserBid = bidUserIdInt && currentUserIdInt && bidUserIdInt === currentUserIdInt;
        
        // IMMEDIATELY update price display - no delay, instant socket update
        setCurrentBid(prev => ({
          ...prev,
          bidAmount: newBidAmount,
          createdAt: new Date()
        }));
        setHasBids(true);
        
        // Calculate new minimum bid immediately
        const minIncrement = newBidAmount < 100 ? 5 : 
                            newBidAmount < 1000 ? 10 : 
                            newBidAmount < 10000 ? 50 : 100;
        const newMinimum = newBidAmount + minIncrement;
        setMinimumBid(newMinimum);
        setBidAmount(newMinimum);
        
        // If someone else bid (not current user), IMMEDIATELY allow bidding again
        if (isSomeoneElseBid) {
          setIsCurrentHighestBidder(false);
          setErrorMessage("");
          setSuccessMessage(""); // Clear success message too
          
          // Show prominent notification for someone else's bid
          setNewBidNotification({
            amount: newBidAmount,
            timestamp: new Date(),
            isNewBidder: true // Flag to show it's someone else
          });
        } else if (isCurrentUserBid) {
          // If current user bid, mark them as highest bidder
          setIsCurrentHighestBidder(true);
          setNewBidNotification({
            amount: newBidAmount,
            timestamp: new Date(),
            isNewBidder: false
          });
        } else {
          // If userId is not available, assume it's someone else and allow bidding
          setIsCurrentHighestBidder(false);
          setErrorMessage("");
          setNewBidNotification({
            amount: newBidAmount,
            timestamp: new Date(),
            isNewBidder: true
          });
        }
        
        // Refresh current bid data in background to get full bidder information
        // This doesn't block the immediate UI update
        setTimeout(() => {
          fetchCurrentBid();
        }, 300);
        
        // Clear existing timeout if any
        if (notificationTimeout) {
          clearTimeout(notificationTimeout);
        }
        
        // Set new timeout - show notification longer for someone else's bid
        const notificationDuration = isSomeoneElseBid ? 5000 : 3000;
        notificationTimeout = setTimeout(() => {
          setNewBidNotification(null);
          notificationTimeout = null;
        }, notificationDuration);
      }
    };

    const handleNotification = (message) => {
      const bidAmount = parseFloat(message);
      if (!isNaN(bidAmount)) {
        // When notification comes without userId, treat it as someone else's bid
        // This allows the user to bid again
        handlePlacedBid({ 
          bidAmount,
          userId: null // No userId means it's not from current user
        });
      }
    };

    socket.on("placedBid", handlePlacedBid);
    socket.on("notification", handleNotification);

    return () => {
      // Clean up socket listeners
      socket.off("placedBid", handlePlacedBid);
      socket.off("notification", handleNotification);
      
      // Clean up notification timeout
      if (notificationTimeout) {
        clearTimeout(notificationTimeout);
      }
    };
  }, [itemId, userId, fetchCurrentBid]);

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

    // Check if user is the current highest bidder on THIS SPECIFIC ITEM
    // Users can bid on multiple items, but cannot bid twice on the same item until someone else bids
    if (isCurrentHighestBidder) {
      setErrorMessage("You are currently the highest bidder on this item. Please wait for another user to place a bid before you can bid again on this item. (You can still bid on other items)");
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
        <div className="current-bid-section relative">
          <div className="absolute top-2 right-2">
            <InfoTooltip 
              content={
                <div>
                  <p className="font-semibold mb-1 text-yellow-300">Bidding Power:</p>
                  <p className="mb-2">Your maximum bidding power = Total Deposits × 10</p>
                  <p className="text-xs mb-1">Example: $100 deposit = $1,000 bidding power</p>
                  <p className="text-xs mt-2">You can bid up to your total bidding power across all auctions. Check your deposit account to see your current bidding power.</p>
                </div>
              }
              position="left"
              iconSize="sm"
            />
          </div>
          {hasBids && currentBid ? (
            <>
              <p className="current-bid-label">Current Highest Bid</p>
              <p 
                key={`bid-${currentBid.bidAmount}-${currentBid.createdAt?.getTime() || Date.now()}`}
                className="current-bid-amount pulse-animation"
              >
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
          {hasBids ? (
            <LiveAuctionTimer 
              itemId={itemId} 
              endTime={item.timeEnd}
              lastBidTime={currentBid?.createdAt}
            />
          ) : (
            <AuctionTimer startTime={item.timeStart} endTime={item.timeEnd} />
          )}
        </div>

        {/* Proxy Bid Component */}
        {!isAuctionEnded && userId && userRole === "client" && (
          <div className="proxy-bid-section" style={{ marginTop: "20px" }}>
            <ProxyBid 
              itemId={itemId}
              currentBid={currentBid?.bidAmount || 0}
              openingBid={item.price || 0}
            />
          </div>
        )}

        {/* Bid Form */}
        {!isAuctionEnded && (
          <div className="bid-form-section">
            <form onSubmit={handleSubmit} className="bid-form" noValidate>
              <div className="bid-input-group">
                <label className="bid-label flex items-center gap-2">
                  {hasBids ? `Minimum Bid: ${formatCurrency(minimumBid)}` : "Enter your bid"}
                  <InfoTooltip 
                    content={
                      <div>
                        <p className="font-semibold mb-1 text-yellow-300">Minimum Bid Calculation:</p>
                        <p className="mb-2">The minimum bid is calculated based on the current highest bid plus an increment:</p>
                        <ul className="list-disc list-inside space-y-1 text-xs">
                          <li>Bids under $100: +$5 increment</li>
                          <li>Bids $100-$999: +$10 increment</li>
                          <li>Bids $1,000-$9,999: +$50 increment</li>
                          <li>Bids $10,000+: +$100 increment</li>
                        </ul>
                        <p className="mt-2 text-xs">Your bid must meet or exceed this minimum amount.</p>
                      </div>
                    }
                    position="top"
                    iconSize="sm"
                  />
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
                    disabled={isLoading || isAuctionEnded || isCurrentHighestBidder}
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

                {/* Quick bid amount buttons - shown for both first bids and existing bids */}
                <div className="quick-increment-buttons relative">
                  <div className="absolute -top-6 right-0">
                    <InfoTooltip 
                      content="Quick bid buttons let you quickly increase your bid by preset amounts. These amounts are automatically calculated based on the item's value."
                      position="top"
                      iconSize="sm"
                    />
                  </div>
                  {(() => {
                    const openingBid = item?.price || 0;
                    const currentHighest = hasBids && currentBid ? currentBid.bidAmount : openingBid;
                    
                    // Calculate quick bid amounts based on item value
                    let quickAmounts = [];
                    if (openingBid < 100) {
                      // Low value items: 10, 25, 50, 100
                      quickAmounts = [10, 25, 50, 100];
                    } else if (openingBid < 1000) {
                      // Medium value items: 50, 100, 250, 500
                      quickAmounts = [50, 100, 250, 500];
                    } else if (openingBid < 10000) {
                      // High value items: 100, 500, 1000, 2500
                      quickAmounts = [100, 500, 1000, 2500];
                    } else {
                      // Very high value items: 500, 1000, 5000, 10000
                      quickAmounts = [500, 1000, 5000, 10000];
                    }
                    
                    return quickAmounts.map((amount) => {
                      const bidValue = hasBids ? currentHighest + amount : openingBid + amount;
                      return (
                        <button
                          key={amount}
                          type="button"
                          onClick={() => setBidAmount(bidValue)}
                          className="increment-btn"
                          disabled={isLoading || isAuctionEnded || isCurrentHighestBidder}
                          title={`Bid ${formatCurrency(bidValue)}`}
                        >
                          {hasBids ? `+${formatCurrency(amount)}` : formatCurrency(bidValue)}
                        </button>
                      );
                    });
                  })()}
                </div>
              </div>

              {/* Error Message */}
              {errorMessage && (
                <div className="error-message relative" role="alert">
                  <div className="flex items-start gap-2">
                    <span className="error-icon">⚠️</span>
                    <span className="flex-1">{errorMessage}</span>
                    <InfoTooltip 
                      content={
                        <div>
                          <p className="font-semibold mb-2 text-yellow-300">What does this error mean?</p>
                          <p className="mb-2">
                            {errorMessage.includes("bidding power") ? 
                              "You don't have enough bidding power to place this bid. Your bidding power = Total Deposits × 10." :
                              errorMessage.includes("outbid yourself") || errorMessage.includes("highest bidder") ?
                              "You are currently the highest bidder on this item. Wait for someone else to bid first before you can bid again." :
                              errorMessage.includes("minimum bid") ?
                              "Your bid amount is too low. It must meet the minimum bid requirement." :
                              "An error occurred while placing your bid."}
                          </p>
                          <p className="font-semibold mb-2 text-yellow-300">What should you do?</p>
                          <ul className="list-disc list-inside space-y-1 mb-2">
                            {errorMessage.includes("bidding power") ? (
                              <>
                                <li>Go to your Dashboard → Deposit Account</li>
                                <li>Add more deposits to increase bidding power</li>
                                <li>Each $1 deposit = $10 in bidding power</li>
                                <li>Example: $100 deposit = $1,000 bidding power</li>
                              </>
                            ) : errorMessage.includes("outbid yourself") || errorMessage.includes("highest bidder") ? (
                              <>
                                <li>Wait for another user to place a bid</li>
                                <li>You can still bid on other items</li>
                                <li>Once someone else bids, you can bid again</li>
                              </>
                            ) : errorMessage.includes("minimum bid") ? (
                              <>
                                <li>Increase your bid amount</li>
                                <li>Check the minimum bid shown above</li>
                                <li>Use the quick bid buttons for suggested amounts</li>
                              </>
                            ) : (
                              <>
                                <li>Check your internet connection</li>
                                <li>Make sure you're logged in</li>
                                <li>Try again in a moment</li>
                              </>
                            )}
                          </ul>
                        </div>
                      }
                      position="left"
                      iconSize="sm"
                    />
                  </div>
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
                    disabled={isLoading || isAuctionEnded || isCurrentHighestBidder}
                    title={!hasBids ? "Be the first one to bid!" : isCurrentHighestBidder ? "Wait for another bidder" : "Place your bid"}
              >
                {isLoading ? (
                  <>
                    <span className="spinner"></span>
                    Placing Bid...
                  </>
                ) : isCurrentHighestBidder ? (
                  "Waiting for Another Bidder"
                ) : !hasBids ? (
                  `Place First Bid - ${formatCurrency(bidAmount)}`
                ) : (
                  `Place Bid - ${formatCurrency(bidAmount)}`
                )}
                  </button>

              {!hasBids && (
                <p className="info-message">
                  Be the first to bid! Enter your bid amount above.
                </p>
              )}

              {isCurrentHighestBidder && hasBids && (
                <div className="info-message bg-blue-50 border-blue-200 text-blue-800 flex items-start gap-2">
                  <div className="flex-1">
                    <span className="font-semibold">✓ You are the current highest bidder!</span>
                    <p className="text-sm mt-1">Please wait for another user to place a bid before you can bid again.</p>
                  </div>
                  <InfoTooltip 
                    content={
                      <div>
                        <p className="font-semibold mb-1 text-yellow-300">Why can't I bid again?</p>
                        <p className="mb-2">To prevent bidding wars, you can only place one bid at a time. Once someone else bids, you'll be able to bid again.</p>
                        <p className="text-xs mt-2">💡 You can still bid on other items while waiting!</p>
                      </div>
                    }
                    position="left"
                    iconSize="sm"
                  />
                </div>
              )}
              </form>
                      </div>
        )}

        {/* New Bid Notification - Prominent display when someone else bids */}
        {newBidNotification && (
          <div className={`new-bid-notification slide-in ${newBidNotification.isNewBidder ? 'new-bidder-notification' : ''}`}>
            <span className="notification-icon">{newBidNotification.isNewBidder ? '🎯' : '🔔'}</span>
            <div>
              <p className="notification-title">
                {newBidNotification.isNewBidder ? 'New Bidder!' : 'Your Bid Placed!'}
              </p>
              <p className="notification-amount">{formatCurrency(newBidNotification.amount)}</p>
              {newBidNotification.isNewBidder && (
                <p className="notification-subtitle">You can bid now!</p>
              )}
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
