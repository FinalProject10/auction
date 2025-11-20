"use client";

import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import axios from "axios";
import { API_URL } from "../../../utils/api";

function AuctionHistory({ itemId, timeStart, timeEnd, price }) {
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalBids, setTotalBids] = useState(0);

  useEffect(() => {
    if (!itemId) return;

    const fetchBidHistory = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await axios.get(`${API_URL}/bid/history/${itemId}`);
        const data = response.data;

        if (data.bids && data.bids.length > 0) {
          // Format data for chart
          const formattedData = [
            // Add starting price point
            {
              time: new Date(timeStart).getTime(),
              amount: price,
              label: "Auction Start",
              bidder: "Starting Price",
              isStart: true,
            },
            // Add all bids
            ...data.bids.map((bid, index) => ({
              time: new Date(bid.x).getTime(),
              amount: bid.y,
              label: new Date(bid.x).toLocaleTimeString(),
              bidder: bid.bidder,
              bidderId: bid.bidderId,
              bidId: bid.bidId,
              isBid: true,
            })),
          ];

          // Sort by time
          formattedData.sort((a, b) => a.time - b.time);

          setChartData(formattedData);
          setTotalBids(data.totalBids || 0);
        } else {
          // No bids yet - show only starting price
          setChartData([
            {
              time: new Date(timeStart).getTime(),
              amount: price,
              label: "Auction Start",
              bidder: "Starting Price",
              isStart: true,
            },
          ]);
          setTotalBids(0);
        }
      } catch (err) {
        console.error("Error fetching bid history:", err);
        setError("Failed to load bid history");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBidHistory();

    // Refresh every 10 seconds for real-time updates
    const interval = setInterval(fetchBidHistory, 10000);

    return () => clearInterval(interval);
  }, [itemId, timeStart, timeEnd, price]);

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: any[] }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="chart-tooltip">
          <p className="tooltip-label">{data.bidder}</p>
          <p className="tooltip-amount">
            {formatCurrency(data.amount)}
          </p>
          <p className="tooltip-time">
            {new Date(data.time).toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Calculate price change
  const getPriceChange = () => {
    if (chartData.length < 2) return { change: 0, percent: 0 };
    const startPrice = chartData[0].amount;
    const currentPrice = chartData[chartData.length - 1].amount;
    const change = currentPrice - startPrice;
    const percent = startPrice > 0 ? (change / startPrice) * 100 : 0;
    return { change, percent };
  };

  const priceChange = getPriceChange();
  const isPositive = priceChange.change >= 0;

  if (isLoading) {
    return (
      <div className="auction-history-container">
        <div className="chart-loading">
          <div className="spinner"></div>
          <p>Loading bid history...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="auction-history-container">
        <div className="chart-error">
          <p>⚠️ {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="auction-history-container">
      <div className="chart-header">
        <h3 className="chart-title">Bid History</h3>
        <div className="chart-stats">
          <div className="stat-item">
            <span className="stat-label">Total Bids:</span>
            <span className="stat-value">{totalBids}</span>
          </div>
          {chartData.length > 1 && (
            <div className="stat-item">
              <span className="stat-label">Price Change:</span>
              <span className={`stat-value ${isPositive ? "positive" : "negative"}`}>
                {isPositive ? "+" : ""}
                {formatCurrency(priceChange.change)} ({isPositive ? "+" : ""}
                {priceChange.percent.toFixed(2)}%)
              </span>
            </div>
          )}
        </div>
      </div>

      {chartData.length > 0 ? (
        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="time"
                type="number"
                scale="time"
                domain={["dataMin", "dataMax"]}
                tickFormatter={(value) => new Date(value).toLocaleTimeString()}
                stroke="#666"
                style={{ fontSize: "12px" }}
              />
              <YAxis
                tickFormatter={(value) => `$${value.toLocaleString()}`}
                stroke="#666"
                style={{ fontSize: "12px" }}
              />
              <Tooltip content={(props: any) => <CustomTooltip {...props} />} />
              <ReferenceLine
                y={price}
                stroke="#9ca3af"
                strokeDasharray="5 5"
                label={{ value: "Starting Price", position: "right" }}
              />
              <Line
                type="monotone"
                dataKey="amount"
                stroke={isPositive ? "#10b981" : "#ef4444"}
                strokeWidth={3}
                dot={{ fill: isPositive ? "#10b981" : "#ef4444", r: 4 }}
                activeDot={{ r: 6 }}
                animationDuration={500}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="chart-empty">
          <p>No bid history available yet.</p>
          <p className="empty-subtitle">Bids will appear here once placed.</p>
        </div>
      )}

      <style jsx>{`
        .auction-history-container {
          background: white;
          border-radius: 16px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07), 0 10px 20px rgba(0, 0, 0, 0.05);
          padding: 24px;
          margin-top: 24px;
        }

        .chart-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          flex-wrap: wrap;
          gap: 16px;
        }

        .chart-title {
          font-size: 24px;
          font-weight: 700;
          color: #333;
          margin: 0;
        }

        .chart-stats {
          display: flex;
          gap: 24px;
          flex-wrap: wrap;
        }

        .stat-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .stat-label {
          font-size: 12px;
          color: #666;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .stat-value {
          font-size: 18px;
          font-weight: 700;
          color: #333;
        }

        .stat-value.positive {
          color: #10b981;
        }

        .stat-value.negative {
          color: #ef4444;
        }

        .chart-wrapper {
          margin-top: 16px;
        }

        .chart-loading,
        .chart-error,
        .chart-empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 60px 20px;
          text-align: center;
        }

        .chart-loading .spinner {
          width: 40px;
          height: 40px;
          border: 4px solid #e5e7eb;
          border-top-color: #ef4444;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          margin-bottom: 16px;
        }

        .chart-error p {
          color: #dc2626;
          font-size: 16px;
        }

        .chart-empty p {
          color: #666;
          font-size: 16px;
          margin: 8px 0;
        }

        .empty-subtitle {
          font-size: 14px;
          color: #999;
        }

        .chart-tooltip {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .tooltip-label {
          font-size: 14px;
          font-weight: 600;
          color: #333;
          margin: 0 0 4px 0;
        }

        .tooltip-amount {
          font-size: 18px;
          font-weight: 700;
          color: #ef4444;
          margin: 4px 0;
        }

        .tooltip-time {
          font-size: 12px;
          color: #666;
          margin: 4px 0 0 0;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        @media (max-width: 768px) {
          .auction-history-container {
            padding: 16px;
          }

          .chart-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .chart-stats {
            width: 100%;
            justify-content: space-between;
          }
        }
      `}</style>
    </div>
  );
}

export default AuctionHistory;
