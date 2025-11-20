"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import img3 from '../images/img3.png';
import { API_URL } from '../../utils/api';
import axios from 'axios';
import Link from 'next/link';

const Offers = () => {
  const [users, setUsers] = useState(0);

  useEffect(() => {
    axios.get(`${API_URL}/getallusers`)
      .then(r => setUsers(r.data?.total || 0))
      .catch(err => console.log(err));
  }, []);

  const stats = [
    { number: `${users.toLocaleString()}+`, label: "Registered Members", icon: "👥" },
    { number: "5M+", label: "Inventory Sold", icon: "🚗" },
    { number: "100%", label: "Selling Price Received", icon: "💰" },
    { number: "4+", label: "Years Experience", icon: "⭐" }
  ];

  const carSpecs = [
    { label: "Year", value: "2023" },
    { label: "Make", value: "Mercedes-Benz" },
    { label: "Mileage", value: "15,000 miles" },
    { label: "Color", value: "Midnight Black" },
    { label: "Model", value: "G AMG" },
    { label: "Condition", value: "Excellent" },
    { label: "Engine", value: "4.0L V8 Twin-Turbo" },
    { label: "Transmission", value: "9-Speed Automatic" }
  ];

  return (
    <div className="offers-section">
      {/* Stats Section */}
      <div className="stats-section">
        <div className="stats-container">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Auction Section */}
      <div className="featured-auction-section">
        <div className="featured-container">
          <div className="featured-content">
            <span className="section-tag">New Offers</span>
            <h2 className="featured-title">
              Exciting & Exclusive Auction Lot – Cars Ready for Bidding!
            </h2>
            <p className="featured-description">
              Get ready to bid for the car of your dreams and experience the thrill of owning
              a masterpiece on wheels! Find out below how to bid.
            </p>

            <div className="car-specs">
              {carSpecs.map((spec, index) => (
                <div key={index} className="spec-item">
                  <span className="spec-label">{spec.label}:</span>
                  <span className="spec-value">{spec.value}</span>
                </div>
              ))}
            </div>

            <div className="featured-actions">
              <button className="btn-primary">Submit Entry</button>
              <button className="btn-secondary">View Slot</button>
            </div>
          </div>

          <div className="featured-image">
            <Image
              src={img3}
              alt="Mercedes-Benz G AMG"
              fill
              className="featured-img"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offers;
