"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import "./footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      {/* Main Footer Content */}
      <div className="footer-main">
        <div className="footer-container" style={{ width: '100%' }}>
          {/* Company Info Section */}
          <div className="footer-section footer-about">
            <div className="footer-logo">
              <Image
                src="/images/logo/logo-autobid.svg"
                alt="AutoBid Logo"
                width={335}
                height={151}
                className="logo-img"
                style={{ width: 'auto' }}
              />
            </div>
            <p className="footer-description">
              Your trusted platform for premium car auctions. Find your dream vehicle or sell with confidence.
            </p>
            <div className="footer-social">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="Facebook"
              >
                <FaFacebook />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="Twitter"
              >
                <FaTwitter />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="LinkedIn"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="YouTube"
              >
                <FaYoutube />
              </a>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="footer-section">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              <li>
                <Link href="/home">Home</Link>
              </li>
              <li>
                <Link href="/shop">Shop</Link>
              </li>
              <li>
                <Link href="/Howitwork">How It Works</Link>
              </li>
              <li>
                <Link href="/aboutUs">About Us</Link>
              </li>
              <li>
                <Link href="/faq">FAQ</Link>
              </li>
              <li>
                <Link href="/getInTouch">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Services Section */}
          <div className="footer-section">
            <h3 className="footer-title">Services</h3>
            <ul className="footer-links">
              <li>
                <Link href="/shop">Browse Auctions</Link>
              </li>
              <li>
                <Link href="/createitem">Sell Your Car</Link>
              </li>
              <li>
                <Link href="/membershipCard">Membership Plans</Link>
              </li>
              <li>
                <Link href="/register/client/firstStep">Register as Buyer</Link>
              </li>
              <li>
                <Link href="/register/seller/firstStep">Register as Seller</Link>
              </li>
              <li>
                <Link href="/login">Login</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info Section */}
          <div className="footer-section footer-contact">
            <h3 className="footer-title">Contact Info</h3>
            <ul className="footer-contact-list">
              <li>
                <FaPhoneAlt className="contact-icon" />
                <div>
                  <span className="contact-label">Phone</span>
                  <a href="tel:+84961566302" className="contact-value">
                    +84961566302
                  </a>
                </div>
              </li>
              <li>
                <FaEnvelope className="contact-icon" />
                <div>
                  <span className="contact-label">Email</span>
                  <a href="mailto:khelifisalmen9@gmail.com" className="contact-value">
                    khelifisalmen9@gmail.com
                  </a>
                </div>
              </li>
              <li>
                <FaMapMarkerAlt className="contact-icon" />
                <div>
                  <span className="contact-label">Address</span>
                  <span className="contact-value">Tunis, Tunisia</span>
                </div>
              </li>
              <li>
                <FaClock className="contact-icon" />
                <div>
                  <span className="contact-label">Working Hours</span>
                  <span className="contact-value">Mon - Fri: 10:00 - 18:00</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="footer-container">
          <div className="footer-bottom-content">
            <p className="copyright">
              © {currentYear} AutoBid. All rights reserved.
            </p>
            <div className="footer-legal">
              <Link href="/privacy" className="legal-link">
                Privacy Policy
              </Link>
              <span className="legal-separator">|</span>
              <Link href="/terms" className="legal-link">
                Terms of Service
              </Link>
              <span className="legal-separator">|</span>
              <Link href="/cookie" className="legal-link">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

