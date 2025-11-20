"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from "../home/navbar";
import Footer from "../footer/Footer";
import { FaStar, FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { API_URL } from '../../utils/api';
import axios from 'axios';
import "./about.css";

const Page = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [users, setUsers] = useState(0);

  useEffect(() => {
    // Fetch testimonials
    axios.get(`${API_URL}/dash/getReclam`)
      .then(r => setTestimonials(r.data || []))
      .catch(err => console.log(err));

    // Fetch user count
    axios.get(`${API_URL}/getallusers`)
      .then(r => setUsers(r.data?.total || 0))
      .catch(err => console.log(err));
  }, []);

  // Default testimonials if API doesn't return data
  const defaultTestimonials = [
    {
      name: "John Smith",
      role: "Car Enthusiast",
      image: "https://i.pravatar.cc/150?img=1",
      message: "AutoBid has completely transformed how I buy cars. The live auction experience is thrilling, and I've found amazing deals on premium vehicles. The platform is intuitive and secure.",
      rating: 5
    },
    {
      name: "Sarah Johnson",
      role: "Business Owner",
      image: "https://i.pravatar.cc/150?img=2",
      message: "As a seller, AutoBid exceeded my expectations. I received competitive bids and sold my vehicle quickly. The transparency and professionalism of the platform is outstanding.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Collector",
      image: "https://i.pravatar.cc/150?img=3",
      message: "The variety of vehicles available is incredible. From classic cars to modern luxury vehicles, AutoBid has it all. The bidding process is smooth and fair.",
      rating: 5
    }
  ];

  const displayTestimonials = testimonials.length > 0 
    ? testimonials.map(t => ({
        name: t.Client?.name || "Customer",
        role: "Client",
        image: t.Client?.image || "https://i.pravatar.cc/150",
        message: t.message || "Great experience!",
        rating: 5
      }))
    : defaultTestimonials;

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % displayTestimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + displayTestimonials.length) % displayTestimonials.length);
  };

  return (
    <div className="about-page">
      <Navbar />
      
      {/* Hero Section */}
      <div className="about-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">About Us at AutoBid</h1>
          <h2 className="hero-subtitle">
            DISCOVER, BID, AND WIN – YOUR GATEWAY TO EXCEPTIONAL AUCTION EXPERIENCES!
          </h2>
        </div>
      </div>

      {/* Stats Section */}
      <div className="stats-section">
        <div className="stats-container">
          <div className="stat-card">
            <div className="stat-number">{users.toLocaleString()}+</div>
            <div className="stat-label">Registered Members</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">5M+</div>
            <div className="stat-label">Inventory Sold</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">100%</div>
            <div className="stat-label">Selling Price Received</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">4+</div>
            <div className="stat-label">Years Experience</div>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="mission-section">
        <div className="mission-container">
          <div className="mission-content">
            <div className="section-header">
              <span className="section-tag">Our Mission</span>
              <h2 className="section-title">Our Mission in the Company</h2>
            </div>
            <div className="mission-text">
              <p>
                Discover a seamless Registration and Account experience at Autobid, where we seamlessly blend innovative technology with a hassle-free process, ensuring you embark on your car-buying journey with confidence.
              </p>
              <ul className="mission-features">
                <li>
                  <strong>Effortless Registration:</strong> Simply fill in your details, and you're ready to dive into our world of vehicles.
                </li>
                <li>
                  <strong>Real-Time Updates:</strong> Receive updates on your bids, auction status, and exclusive offers.
                </li>
                <li>
                  <strong>Personalized Account:</strong> Save your favorite vehicles, track your bidding history, and set custom alerts for upcoming auctions.
                </li>
                <li>
                  <strong>Secure Profile Management:</strong> Your personal information and transactions are safeguarded, allowing you to bid confidently in a secure environment.
                </li>
              </ul>
            </div>
            <div className="mission-years">
              <Image
                src="/images/about/Autobid-24.png"
                alt="Years"
                width={90}
                height={90}
                className="years-badge"
                unoptimized={true}
              />
              <div>
                <p className="years-text">Years on the Market</p>
                <p className="years-description">
                  Our platform is a dynamic fusion of curated collections, spirited bidding, and unbeatable excitement.
                </p>
              </div>
            </div>
          </div>
          <div className="mission-image">
            <Image
              src="/images/about/Autobid-About_comp.jpg"
              alt="About AutoBid"
              fill
              className="mission-img"
              unoptimized={true}
            />
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="team-section">
        <div className="team-container">
          <h2 className="team-title">The Team Behind the Business</h2>
          <div className="team-grid">
            <div className="team-member">
              <div className="team-avatar">
                <Image
                  src="https://i.pravatar.cc/150?img=10"
                  alt="SALIM BEN SLIM"
                  fill
                  className="team-img"
                />
              </div>
              <h3 className="team-name">SALIM BEN SLIM</h3>
              <p className="team-role">Scrum Master</p>
            </div>
            <div className="team-member">
              <div className="team-avatar">
                <Image
                  src="/images/about/salmen-khlifi.jpg"
                  alt="SALMEN KHLIFI"
                  fill
                  className="team-img"
                />
              </div>
              <h3 className="team-name">SALMEN KHLIFI</h3>
              <p className="team-role">Product Owner</p>
            </div>
            <div className="team-member">
              <div className="team-avatar">
                <Image
                  src="https://i.pravatar.cc/150?img=12"
                  alt="SALAH HLEL"
                  fill
                  className="team-img"
                />
              </div>
              <h3 className="team-name">SALAH HLEL</h3>
              <p className="team-role">Developer</p>
            </div>
            <div className="team-member">
              <div className="team-avatar">
                <Image
                  src="https://i.pravatar.cc/150?img=13"
                  alt="ADIB JAZIRI"
                  fill
                  className="team-img"
                />
              </div>
              <h3 className="team-name">ADIB JAZIRI</h3>
              <p className="team-role">Developer</p>
            </div>
            <div className="team-member">
              <div className="team-avatar">
                <Image
                  src="https://i.pravatar.cc/150?img=14"
                  alt="ZAKARIA ASKRI"
                  fill
                  className="team-img"
                />
              </div>
              <h3 className="team-name">ZAKARIA ASKRI</h3>
              <p className="team-role">Developer</p>
            </div>
          </div>
        </div>
      </div>

      {/* Partners Section */}
      <div className="partners-section">
        <div className="partners-container">
          <h2 className="partners-title">Our Trustworthy Partners</h2>
          <div className="partners-grid">
            {[
              {
                name: "AutoFinance Solutions",
                logo: "https://via.placeholder.com/200x100/FF2800/FFFFFF?text=AutoFinance"
              },
              {
                name: "Premium Motors",
                logo: "https://via.placeholder.com/200x100/1F2937/FFFFFF?text=Premium+Motors"
              },
              {
                name: "CarSecure Insurance",
                logo: "https://via.placeholder.com/200x100/3B82F6/FFFFFF?text=CarSecure"
              },
              {
                name: "Elite Auto Group",
                logo: "https://via.placeholder.com/200x100/10B981/FFFFFF?text=Elite+Auto"
              },
              {
                name: "Vehicle Logistics Pro",
                logo: "https://via.placeholder.com/200x100/F59E0B/FFFFFF?text=Vehicle+Logistics"
              },
              {
                name: "AutoTech Services",
                logo: "https://via.placeholder.com/200x100/8B5CF6/FFFFFF?text=AutoTech"
              },
              {
                name: "Classic Car Collection",
                logo: "https://via.placeholder.com/200x100/EF4444/FFFFFF?text=Classic+Cars"
              },
              {
                name: "Motor Inspection Co",
                logo: "https://via.placeholder.com/200x100/06B6D4/FFFFFF?text=Motor+Inspection"
              }
            ].map((partner, index) => (
              <div key={index} className="partner-logo" title={partner.name}>
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={150}
                  height={80}
                  className="partner-img"
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="testimonials-section">
        <div className="testimonials-container">
          <div className="testimonials-header">
            <span className="section-tag">Testimonials</span>
            <h2 className="section-title">What Our Customers Are Saying</h2>
            <p className="section-description">
              Don't just take our word for it. See what our satisfied customers have to say about their AutoBid experience.
            </p>
          </div>

          <div className="testimonials-carousel">
            <button className="carousel-btn carousel-btn-left" onClick={prevTestimonial} aria-label="Previous testimonial">
              <FaChevronLeft />
            </button>

            <div className="testimonial-card">
              <div className="testimonial-content">
                <FaQuoteLeft className="quote-icon" />
                <p className="testimonial-message">
                  {displayTestimonials[currentTestimonial]?.message}
                </p>
                <div className="testimonial-rating">
                  {[...Array(displayTestimonials[currentTestimonial]?.rating || 5)].map((_, i) => (
                    <FaStar key={i} className="star-icon" />
                  ))}
                </div>
              </div>
              <div className="testimonial-author">
                <Image
                  src={displayTestimonials[currentTestimonial]?.image || "https://i.pravatar.cc/150"}
                  alt={displayTestimonials[currentTestimonial]?.name}
                  width={80}
                  height={80}
                  className="author-avatar"
                />
                <div className="author-info">
                  <h4 className="author-name">{displayTestimonials[currentTestimonial]?.name}</h4>
                  <p className="author-role">{displayTestimonials[currentTestimonial]?.role}</p>
                </div>
              </div>
            </div>

            <button className="carousel-btn carousel-btn-right" onClick={nextTestimonial} aria-label="Next testimonial">
              <FaChevronRight />
            </button>
          </div>

          <div className="testimonial-dots">
            {displayTestimonials.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentTestimonial ? 'active' : ''}`}
                onClick={() => setCurrentTestimonial(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <Link href="/membershipCard" className="services-link">
            <button className="btn-primary">Our Services</button>
          </Link>
        </div>
      </div>

      {/* CTA Section */}
      <div className="cta-section">
        <div className="cta-container">
          <h2 className="cta-title">Are You a Certified Seller?</h2>
          <p className="cta-description">Join our platform and reach thousands of buyers</p>
          <Link href="/register/seller/firstStep">
            <button className="btn-primary btn-large">Register As Vendor</button>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Page;
