"use client";
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaQuoteLeft, FaStar } from 'react-icons/fa';
import Image from 'next/image';
import { API_URL } from '../../utils/api';
import axios from 'axios';

const Services = () => {
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    axios.get(`${API_URL}/dash/getReclam`)
      .then(r => setData(r.data || []))
      .catch(err => console.log(err));
  }, []);

  // Default testimonials if API doesn't return data
  const defaultTestimonials = [
    {
      name: "John Smith",
      role: "Car Enthusiast",
      image: "https://i.pravatar.cc/150?img=1",
      message: "AutoBid has completely transformed how I buy cars. The live auction experience is thrilling, and I've found amazing deals on premium vehicles. The platform is intuitive and secure."
    },
    {
      name: "Sarah Johnson",
      role: "Business Owner",
      image: "https://i.pravatar.cc/150?img=2",
      message: "As a seller, AutoBid exceeded my expectations. I received competitive bids and sold my vehicle quickly. The transparency and professionalism of the platform is outstanding."
    },
    {
      name: "Michael Chen",
      role: "Collector",
      image: "https://i.pravatar.cc/150?img=3",
      message: "The variety of vehicles available is incredible. From classic cars to modern luxury vehicles, AutoBid has it all. The bidding process is smooth and fair."
    }
  ];

  const testimonials = data.length > 0
    ? data.map(t => ({
        name: t.Client?.name || "Customer",
        role: "Client",
        image: t.Client?.image || "https://i.pravatar.cc/150",
        message: t.message || "Great experience!"
      }))
    : defaultTestimonials;

  const nextTestimonial = () => {
    setIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <>
      {/* Testimonials Section */}
      <div className="testimonials-section">
        <div className="testimonials-container">
          <div className="testimonials-header">
            <span className="section-tag">Find out Now</span>
            <h2 className="section-title">User Testimonials: What Our Customers Are Saying</h2>
            <p className="section-description">
              Don't just take our word for it. See what our satisfied customers have to say about their AutoBid experience.
            </p>
          </div>

          <div className="testimonials-carousel">
            <button
              className="carousel-btn carousel-btn-left"
              onClick={prevTestimonial}
              aria-label="Previous testimonial"
            >
              <FaChevronLeft />
            </button>

            <div className="testimonial-card">
              <div className="testimonial-content">
                <FaQuoteLeft className="quote-icon" />
                <p className="testimonial-message">
                  {testimonials[index]?.message}
                </p>
                <div className="testimonial-rating">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="star-icon" />
                  ))}
                </div>
              </div>
              <div className="testimonial-author">
                <Image
                  src={testimonials[index]?.image || "https://i.pravatar.cc/150"}
                  alt={testimonials[index]?.name}
                  width={80}
                  height={80}
                  className="author-avatar"
                />
                <div className="author-info">
                  <h4 className="author-name">{testimonials[index]?.name}</h4>
                  <p className="author-role">{testimonials[index]?.role}</p>
                </div>
              </div>
            </div>

            <button
              className="carousel-btn carousel-btn-right"
              onClick={nextTestimonial}
              aria-label="Next testimonial"
            >
              <FaChevronRight />
            </button>
          </div>

          <div className="testimonial-dots">
            {testimonials.map((_, i) => (
              <button
                key={i}
                className={`dot ${i === index ? 'active' : ''}`}
                onClick={() => setIndex(i)}
                aria-label={`Go to testimonial ${i + 1}`}
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
    </>
  );
};

export default Services;
