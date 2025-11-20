"use client";
import React from 'react';
import Image from 'next/image';

const StartNow = () => {
  const steps = [
    {
      icon: "/images/how-it-works/autobid-main_how1-2.svg",
      title: "Registration and Account",
      description: "Your premier destination for a thrilling and dynamic online auction experience. Our platform is designed to bring together buyers and sellers in a secure and user-friendly environment."
    },
    {
      icon: "/images/how-it-works/autobid-main_how3.svg",
      title: "Browse and Select a Vehicle",
      description: "Embark on your journey to automotive excellence with our curated selection of high-quality vehicles spanning various makes, models, and styles."
    },
    {
      icon: "/images/how-it-works/autobid-main_how2.png",
      title: "Place Bids and Monitor",
      description: "Take control of your bidding destiny with our user-friendly Place Bid and Monitor feature. Track your bids in real-time and stay ahead of the competition."
    }
  ];

  return (
    <div className="how-it-works-section">
      <div className="how-it-works-container">
        <div className="section-header">
          <span className="section-tag">Start Now</span>
          <h2 className="section-title">How It Works</h2>
          <p className="section-description">
            Get started with AutoBid in three simple steps
          </p>
        </div>

        <div className="steps-grid">
          {steps.map((step, index) => (
            <div key={index} className="step-card">
              <div className="step-number">{index + 1}</div>
              <div className="step-icon">
                <Image
                  src={step.icon}
                  alt={step.title}
                  width={80}
                  height={80}
                  className="step-icon-img"
                />
              </div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-description">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StartNow;
