"use client";
import React from 'react';
import Image from 'next/image';
import img1 from '../images/img2.png';

const Aboutus = () => {
  const features = [
    {
      title: "Diverse Inventory",
      description: "Explore a wide range of vehicles, each meticulously curated for quality and authenticity."
    },
    {
      title: "Live Auctions",
      description: "Immerse yourself in the excitement of real-time bidding with our live auction platform."
    },
    {
      title: "Transparency",
      description: "We believe in openness and provide detailed information about every vehicle."
    },
    {
      title: "User-Friendly Platform",
      description: "Navigate effortlessly through our website with an intuitive and modern interface."
    },
    {
      title: "Secure Transactions",
      description: "Bid with confidence, knowing that your transactions are secure and protected."
    }
  ];

  return (
    <div className="about-section">
      <div className="about-container">
        <div className="about-image">
          <Image
            src={img1}
            alt="About AutoBid"
            fill
            className="about-img"
          />
        </div>

        <div className="about-content">
          <span className="section-tag">About Us</span>
          <h2 className="about-title">
            Redefining the Car-Buying Experience
          </h2>
          <p className="about-description">
            At Autobid, we redefine the car-buying experience by merging cutting-edge technology 
            with the excitement of live auctions. Our user-friendly interface allows you to browse 
            an extensive inventory of carefully curated vehicles, from sleek sedans to powerful 
            trucks and everything in between.
          </p>

          <ul className="features-list">
            {features.map((feature, index) => (
              <li key={index} className="feature-item">
                <div className="feature-icon">✓</div>
                <div className="feature-content">
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-text">{feature.description}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="signature">
            <Image
              src="/images/about/autobid-signature.png"
              alt="AutoBid Signature"
              width={200}
              height={60}
              className="signature-img"
              unoptimized={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Aboutus;
