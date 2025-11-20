"use client";
import React, { useState, useEffect, useRef } from "react";
import getSocket from "./bid/socket";
import InfoTooltip from "../../components/InfoTooltip";

interface LiveAuctionTimerProps {
  itemId: number;
  endTime: string;
  lastBidTime?: string;
}

type CountdownStage = "normal" | "goingOnce" | "goingTwice" | "sold";

const LiveAuctionTimer: React.FC<LiveAuctionTimerProps> = ({
  itemId,
  endTime,
  lastBidTime,
}) => {
  const [stage, setStage] = useState<CountdownStage>("normal");
  const [countdown, setCountdown] = useState<number>(30); // 30 seconds countdown
  const [isEnded, setIsEnded] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const lastBidTimeRef = useRef<string | null>(lastBidTime || null);

  const COUNTDOWN_DURATION = 30; // 30 seconds countdown
  const GOING_ONCE_TIME = 20; // At 20 seconds: "Going Once"
  const GOING_TWICE_TIME = 10; // At 10 seconds: "Going Twice"
  const SOLD_TIME = 0; // At 0 seconds: "Sold"

  useEffect(() => {
    // Listen for new bids via socket
    const socket = getSocket();
    
    const handleNewBid = () => {
      // Reset countdown when new bid arrives
      lastBidTimeRef.current = new Date().toISOString();
      setCountdown(COUNTDOWN_DURATION);
      setStage("normal");
    };

    socket.on("placedBid", handleNewBid);

    return () => {
      socket.off("placedBid", handleNewBid);
    };
  }, [itemId]);

  useEffect(() => {
    // Check if auction has ended
    const now = new Date().getTime();
    const endTimestamp = new Date(endTime).getTime();

    if (now >= endTimestamp) {
      setIsEnded(true);
      setStage("sold");
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      return;
    }

    // Start countdown timer
    timerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 0) {
          setStage("sold");
          setIsEnded(true);
          if (timerRef.current) {
            clearInterval(timerRef.current);
          }
          return 0;
        }

        const newCountdown = prev - 1;

        // Update stage based on countdown
        if (newCountdown <= SOLD_TIME) {
          setStage("sold");
        } else if (newCountdown <= GOING_TWICE_TIME) {
          setStage("goingTwice");
        } else if (newCountdown <= GOING_ONCE_TIME) {
          setStage("goingOnce");
        } else {
          setStage("normal");
        }

        return newCountdown;
      });
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [endTime]);

  if (isEnded || stage === "sold") {
    return (
      <div className="live-auction-timer sold">
        <div className="sold-banner">
          <span className="sold-icon">🏆</span>
          <span className="sold-text">SOLD!</span>
        </div>
      </div>
    );
  }

  const getStageText = () => {
    switch (stage) {
      case "goingOnce":
        return "Going Once...";
      case "goingTwice":
        return "Going Twice...";
      default:
        return "Bidding Active";
    }
  };

  const getStageColor = () => {
    switch (stage) {
      case "goingOnce":
        return "text-yellow-600";
      case "goingTwice":
        return "text-orange-600";
      default:
        return "text-green-600";
    }
  };

  return (
    <div className={`live-auction-timer stage-${stage} relative`}>
      <div className="absolute top-2 right-2">
        <InfoTooltip 
          content={
            <div>
              <p className="font-semibold mb-1 text-yellow-300">Live Auction Timer:</p>
              <p className="mb-2">This timer counts down from 30 seconds after each bid. If no new bids are placed, the auction ends when it reaches 0.</p>
              <p className="text-xs mb-1">Stages:</p>
              <ul className="list-disc list-inside space-y-1 text-xs">
                <li><strong>20 seconds:</strong> "Going Once..."</li>
                <li><strong>10 seconds:</strong> "Going Twice..."</li>
                <li><strong>0 seconds:</strong> "SOLD!"</li>
              </ul>
              <p className="text-xs mt-2">💡 Each new bid resets the timer to 30 seconds!</p>
            </div>
          }
          position="left"
          iconSize="sm"
        />
      </div>
      <div className="countdown-display">
        <div className={`stage-indicator ${getStageColor()}`}>
          {getStageText()}
        </div>
        <div className="countdown-seconds">
          <span className="countdown-number">{countdown}</span>
          <span className="countdown-label">seconds</span>
        </div>
        {stage !== "normal" && (
          <div className="stage-warning">
            {stage === "goingOnce" && "⚠️ Last chance to bid!"}
            {stage === "goingTwice" && "⚠️⚠️ Final warning!"}
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveAuctionTimer;

