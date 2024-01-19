import React, { useState, useEffect, useRef } from "react";

const AuctionTimer = ({ startTime, endTime }) => {
  const timerRef = useRef(null);

  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const startTimestamp = new Date(endTime).getTime();
    const endTimestamp = new Date(startTime).getTime();
    console.log(
      startTimestamp,
      (endTimestamp - now) / (1000 * 60 * 60 * 24 * 30.44)
    );

    let difference = def();
    function def() {
      if (now < startTimestamp) {
        return startTimestamp - now;
      } else if (now < endTimestamp) {
        return endTimestamp - now;
      } else {
        return 0;
      }
    }

    const months = Math.floor(difference / (1000 * 60 * 60 * 24 * 30.44));
    const weeks = Math.floor(
      (difference % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24 * 7)
    );
    const days = Math.floor(
      (difference % (1000 * 60 * 60 * 24 * 7)) / (1000 * 60 * 60 * 24)
    );
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { months, weeks, days, hours, minutes, seconds };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [startTime, endTime]);

  useEffect(() => {
    if (
      timeLeft.months === 0 &&
      timeLeft.weeks === 0 &&
      timeLeft.days === 0 &&
      timeLeft.hours === 0 &&
      timeLeft.minutes === 0 &&
      timeLeft.seconds === 0
    ) {
      clearInterval(timerRef.current);
    }
  }, [timeLeft]);

  return (
    <div className="main-auction auction-time-countdown hasCountdown">
      <div className="auction-time  ">
        <div className="main-auction auction-time-countdown hasCountdown">
          <span className="countdown_row curren">
            <span className="countdown_section">
              <span className="countdown_amount">{timeLeft.months}</span>
              <br />
              Months
            </span>
            <span className="countdown_section">
              <span className="countdown_amount">{timeLeft.weeks}</span>
              <br />
              Weeks
            </span>
            <span className="countdown_section">
              <span className="countdown_amount">{timeLeft.days}</span>
              <br />
              Days
            </span>
            <span className="countdown_section">
              <span className="countdown_amount">{timeLeft.hours}</span>
              <br />
              Hours
            </span>
            <span className="countdown_section">
              <span className="countdown_amount">{timeLeft.minutes}</span>
              <br />
              Minutes
            </span>
            <span className="countdown_section">
              <span className="countdown_amount">{timeLeft.seconds}</span>
              <br />
              Seconds
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default AuctionTimer;
