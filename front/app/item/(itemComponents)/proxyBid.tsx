"use client";
import React, { useState, useEffect } from "react";
import { API_URL } from "../../../utils/api";
import axios from "axios";
import InfoTooltip from "../../components/InfoTooltip";
import { FaRobot, FaCheckCircle, FaTimesCircle, FaInfoCircle, FaSpinner } from "react-icons/fa";
import "./style/proxyBid.css";

interface ProxyBidProps {
  itemId: number;
  currentBid: number;
  openingBid: number;
}

const ProxyBid: React.FC<ProxyBidProps> = ({ itemId, currentBid, openingBid }) => {
  const [maxAmount, setMaxAmount] = useState<string>("");
  const [activeProxyBids, setActiveProxyBids] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const id = localStorage.getItem("userId");
      setUserId(id);
      if (id) {
        // Fetch silently on initial load to avoid showing errors unnecessarily
        fetchActiveProxyBids(id, true);
      }
    }
  }, [itemId]);

  // Auto-dismiss messages after 5 seconds
  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError("");
        setSuccess("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);

  const fetchActiveProxyBids = async (clientId: string, silent: boolean = false) => {
    try {
      const response = await axios.get(`${API_URL}/proxy/active/${clientId}`);
      setActiveProxyBids(response.data.proxyBids || []);
      // Clear any previous errors on successful fetch
      if (error && error === "Failed to load proxy bids") {
        setError("");
      }
    } catch (err: any) {
      console.error("Error fetching proxy bids:", err);
      // Only show error if not silent mode and not a 503 (table doesn't exist)
      if (!silent && err.response?.status !== 503) {
        // Don't show error if we have a success message (to avoid conflicting messages)
        if (!success) {
          setError("Failed to load proxy bids");
        }
      }
    }
  };

  const handleCreateProxyBid = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!userId) {
      setError("Please log in to create a proxy bid");
      return;
    }

    const amount = parseFloat(maxAmount);
    const minBid = Number(currentBid || openingBid || 0);
    const minimumRequired = minBid + (minBid < 100 ? 5 : minBid < 1000 ? 10 : minBid < 10000 ? 50 : 100);

    if (isNaN(amount) || amount < minimumRequired) {
      setError(`Maximum proxy bid must be at least $${minimumRequired.toFixed(2)} (current bid + minimum increment)`);
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${API_URL}/proxy/create`, {
        clientId: parseInt(userId),
        itemId,
        maxAmount: amount,
      });

      setSuccess(`Proxy bid activated! Maximum bid set to $${amount.toFixed(2)}. The system will automatically bid for you.`);
      setMaxAmount("");
      // Fetch silently after successful creation to avoid showing errors
      await fetchActiveProxyBids(userId, true);
    } catch (err: any) {
      console.error("Error creating proxy bid:", err);
      const errorMsg = err.response?.data?.message || "Failed to create proxy bid";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelProxyBid = async (proxyBidId: number) => {
    if (!confirm("Are you sure you want to cancel this proxy bid?")) {
      return;
    }

    try {
      await axios.delete(`${API_URL}/proxy/${proxyBidId}`);
      setSuccess("Proxy bid cancelled successfully");
      if (userId) {
        // Fetch silently after successful cancellation
        await fetchActiveProxyBids(userId, true);
      }
    } catch (err: any) {
      console.error("Error cancelling proxy bid:", err);
      setError(err.response?.data?.message || "Failed to cancel proxy bid");
    }
  };

  const currentProxyBid = activeProxyBids.find((pb) => pb.itemId === itemId);
  const minBid = Number(currentBid || openingBid || 0);
  const minimumRequired = minBid + (minBid < 100 ? 5 : minBid < 1000 ? 10 : minBid < 10000 ? 50 : 100);

  if (!userId) {
    return null;
  }

  return (
    <div className="proxy-bid-container">
      <div className="proxy-bid-header">
        <div className="flex items-center gap-2">
          <FaRobot className="text-blue-600 text-xl" />
          <h3 className="text-xl font-bold text-gray-900">Proxy Bid (Auto-Bid)</h3>
          <InfoTooltip 
            content={
              <div>
                <p className="font-semibold mb-1 text-yellow-300">How Proxy Bidding Works:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Set your maximum bid amount</li>
                  <li>System automatically bids for you when outbid</li>
                  <li>Bids incrementally up to your maximum</li>
                  <li>You can cancel anytime</li>
                </ul>
                <p className="text-xs mt-2">💡 This helps you win auctions without constantly monitoring them!</p>
              </div>
            }
            position="top"
            iconSize="sm"
          />
        </div>
        <p className="text-sm text-gray-600 mt-2">
          Set your maximum bid. We'll automatically bid for you up to this amount.
        </p>
      </div>

      {error && (
        <div className="proxy-bid-alert proxy-bid-alert-error">
          <FaTimesCircle className="text-red-600" />
          <div>
            <p className="font-semibold">Error</p>
            <p>{error}</p>
          </div>
        </div>
      )}

      {success && (
        <div className="proxy-bid-alert proxy-bid-alert-success">
          <FaCheckCircle className="text-green-600" />
          <div>
            <p className="font-semibold">Success</p>
            <p>{success}</p>
          </div>
        </div>
      )}

      {currentProxyBid ? (
        <div className="proxy-bid-active">
          <div className="proxy-bid-active-header">
            <div className="flex items-center gap-2">
              <div className="proxy-bid-status-indicator"></div>
              <div>
                <p className="font-bold text-gray-900">Active Proxy Bid</p>
                <p className="text-xs text-gray-500">Auto-bidding is enabled</p>
              </div>
            </div>
          </div>
          <div className="proxy-bid-active-content">
            <div className="proxy-bid-info-row">
              <span className="proxy-bid-label">Maximum Bid:</span>
              <span className="proxy-bid-value">${Number(currentProxyBid.maxAmount || 0).toFixed(2)}</span>
            </div>
            {currentProxyBid.currentBid && Number(currentProxyBid.currentBid) > 0 && (
              <div className="proxy-bid-info-row">
                <span className="proxy-bid-label">Current Proxy Bid:</span>
                <span className="proxy-bid-value text-blue-600">${Number(currentProxyBid.currentBid || 0).toFixed(2)}</span>
              </div>
            )}
            <div className="proxy-bid-info-row">
              <span className="proxy-bid-label">Remaining Budget:</span>
              <span className="proxy-bid-value text-green-600">
                ${(Number(currentProxyBid.maxAmount || 0) - Number(currentProxyBid.currentBid || 0)).toFixed(2)}
              </span>
            </div>
          </div>
          <button
            onClick={() => handleCancelProxyBid(currentProxyBid.id)}
            className="proxy-bid-cancel-btn"
          >
            <FaTimesCircle />
            Cancel Proxy Bid
          </button>
        </div>
      ) : (
        <form onSubmit={handleCreateProxyBid} className="proxy-bid-form">
          <div className="proxy-bid-input-group">
            <label htmlFor="maxAmount" className="proxy-bid-label flex items-center gap-2">
              Maximum Proxy Bid Amount
              <InfoTooltip 
                content="Enter the maximum amount you're willing to pay. The system will bid automatically up to this amount, but will stop if someone bids higher than your maximum."
                position="top"
                iconSize="sm"
              />
            </label>
            <div className="proxy-bid-input-wrapper">
              <span className="proxy-bid-currency">$</span>
              <input
                type="number"
                id="maxAmount"
                value={maxAmount}
                onChange={(e) => setMaxAmount(e.target.value)}
                className="proxy-bid-input"
                placeholder={`${minimumRequired.toFixed(2)}`}
                min={minimumRequired}
                step="10"
                required
              />
            </div>
            <div className="proxy-bid-hint">
              <p className="text-xs text-gray-500">
                Current bid: <span className="font-semibold">${minBid.toFixed(2)}</span> • 
                Minimum: <span className="font-semibold">${minimumRequired.toFixed(2)}</span>
              </p>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading || !maxAmount}
            className="proxy-bid-submit-btn"
          >
            {loading ? (
              <>
                <FaSpinner className="animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <FaRobot />
                Activate Proxy Bid
              </>
            )}
          </button>
        </form>
      )}

      {activeProxyBids.length > 0 && (
        <div className="proxy-bid-list">
          <p className="proxy-bid-list-title">Your Active Proxy Bids</p>
          <div className="proxy-bid-list-items">
            {activeProxyBids.map((proxyBid) => (
              <div
                key={proxyBid.id}
                className={`proxy-bid-list-item ${proxyBid.itemId === itemId ? 'active' : ''}`}
              >
                <div className="proxy-bid-list-item-content">
                  <p className="proxy-bid-list-item-name">
                    {proxyBid.itemName || `Item #${proxyBid.itemId}`}
                  </p>
                  <p className="proxy-bid-list-item-amount">
                    Max: ${Number(proxyBid.maxAmount || 0).toFixed(2)}
                  </p>
                </div>
                {proxyBid.itemId !== itemId && (
                  <button
                    onClick={() => handleCancelProxyBid(proxyBid.id)}
                    className="proxy-bid-list-item-cancel"
                    title="Cancel proxy bid"
                  >
                    <FaTimesCircle />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProxyBid;
