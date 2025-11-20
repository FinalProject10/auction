import React, { useState, useEffect, useRef } from "react";

const AuctionTimer = ({ startTime, endTime }) => {
  const timerRef = useRef(null);
  const [timeLeft, setTimeLeft] = useState(null);
  const [isEnded, setIsEnded] = useState(false);
  const [isEndingSoon, setIsEndingSoon] = useState(false);

  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const endTimestamp = new Date(endTime).getTime();
    const startTimestamp = new Date(startTime).getTime();

    // Check if auction has ended
    if (now >= endTimestamp) {
      setIsEnded(true);
      return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };
    }

    // Check if auction hasn't started yet
    if (now < startTimestamp) {
      const difference = startTimestamp - now;
      return calculateTimeUnits(difference);
    }

    // Auction is active - calculate time until end
    const difference = endTimestamp - now;
    const timeUnits = calculateTimeUnits(difference);
    
    // Check if ending soon (less than 1 hour)
    if (difference < 3600000) { // 1 hour in milliseconds
      setIsEndingSoon(true);
    } else {
      setIsEndingSoon(false);
    }

    return timeUnits;
  };

  const calculateTimeUnits = (difference) => {
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % 1000) / 1000);

    return {
      days,
      hours,
      minutes,
      seconds: Math.floor((difference % (1000 * 60)) / 1000),
      total: difference,
    };
  };

  useEffect(() => {
    // Initial calculation
    const initialTime = calculateTimeLeft();
    setTimeLeft(initialTime);

    // Set up interval
    timerRef.current = setInterval(() => {
      const newTime = calculateTimeLeft();
      setTimeLeft(newTime);

      // Stop timer if auction has ended
      if (newTime.total <= 0) {
        setIsEnded(true);
        clearInterval(timerRef.current);
      }
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [startTime, endTime]);

  // If auction has ended
  if (isEnded || (timeLeft && timeLeft.total <= 0)) {
    return (
      <div className="auction-timer-ended">
        <div className="timer-ended-content">
          <span className="timer-ended-icon">⏰</span>
          <span className="timer-ended-text">Auction Ended</span>
        </div>
      </div>
    );
  }

  // If timeLeft is not calculated yet
  if (!timeLeft) {
    return (
      <div className="auction-time-countdown">
        <span className="countdown-loading">Calculating time...</span>
      </div>
    );
  }

  return (
    <div className={`main-auction auction-time-countdown hasCountdown ${isEndingSoon ? 'ending-soon' : ''}`}>
      <div className="auction-time">
        {isEndingSoon && (
          <div className="ending-soon-warning">
            <span className="warning-icon">⚠️</span>
            <span className="warning-text">Ending Soon!</span>
          </div>
        )}
        <div className="countdown-container">
          <span className="countdown_row curren">
            {timeLeft.days > 0 && (
              <span className={`countdown_section ${isEndingSoon ? 'urgent' : ''}`}>
                <span className="countdown_amount">{timeLeft.days}</span>
                <br />
                <span className="countdown_label">Days</span>
              </span>
            )}
            <span className={`countdown_section ${isEndingSoon ? 'urgent' : ''}`}>
              <span className="countdown_amount">{String(timeLeft.hours).padStart(2, '0')}</span>
              <br />
              <span className="countdown_label">Hours</span>
            </span>
            <span className={`countdown_section ${isEndingSoon ? 'urgent' : ''}`}>
              <span className="countdown_amount">{String(timeLeft.minutes).padStart(2, '0')}</span>
              <br />
              <span className="countdown_label">Minutes</span>
            </span>
            <span className={`countdown_section ${isEndingSoon ? 'urgent' : ''}`}>
              <span className="countdown_amount">{String(timeLeft.seconds).padStart(2, '0')}</span>
              <br />
              <span className="countdown_label">Seconds</span>
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default AuctionTimer;
