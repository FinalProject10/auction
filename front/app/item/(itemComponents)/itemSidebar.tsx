"use client";
import React, { useEffect, useState } from "react";
import "./style/itemSidebar.css";
import Image from "next/image";
import { FaHammer } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { RiAccountPinCircleFill } from "react-icons/ri";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Link from "next/link";
import axios from "axios";
import { API_URL } from "../../../utils/api";

const ItemSidebar = ({ items }) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${API_URL}/items/fetch-items/?page=${page}`
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [page]);

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  const handleLoadBack = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  // Calculate days remaining for an auction
  const calculateDaysRemaining = (timeEnd) => {
    const now = new Date().getTime();
    const endTime = new Date(timeEnd).getTime();
    const diff = endTime - now;
    
    if (diff <= 0) return 0;
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) {
      return `${days} ${days === 1 ? 'day' : 'days'}`;
    } else if (hours > 0) {
      return `${hours} ${hours === 1 ? 'hour' : 'hours'}`;
    } else {
      return 'Ending soon';
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="item-sidebar-container">
      {/* Seller Information Card */}
      {items.map((item) => (
        <div key={item.id} className="seller-card">
          <div className="seller-header">
            <div className="seller-avatar">
              <Image
                className="seller-avatar-img"
                src={item.seller?.avatar || "https://autobid.modeltheme.com/wp-content/uploads/2023/11/autobid-vehicle-13-768x486.jpg"}
                alt={item.seller?.name || "Seller"}
                width={70}
                height={70}
              />
            </div>
            <div className="seller-info">
              <h3 className="seller-name">{item.seller?.name || "Seller"}</h3>
              <div className="seller-location">
                <FaLocationDot className="location-icon" />
                <span>{item.seller?.address || "Address not available"}</span>
              </div>
            </div>
          </div>

          <div className="seller-actions">
            <Link
              href={`/Seller/profile/${item.seller?.id}`}
              className="seller-link"
            >
              <RiAccountPinCircleFill className="link-icon" />
              <span>Check more offers from this vendor</span>
            </Link>
          </div>

          <div className="seller-buttons">
            <button className="btn-send-message">
              <MdMessage className="btn-icon" />
              <span>Send Message</span>
            </button>
            <a 
              href={`tel:${item.seller?.telNumb || ''}`}
              className="btn-call-vendor"
            >
              <FaPhoneAlt className="btn-icon" />
              <span>Call Vendor</span>
            </a>
          </div>
        </div>
      ))}

      {/* Related Auctions Section */}
      <div className="related-auctions-section">
        <div className="section-header">
          <h3 className="section-title">Related Auctions</h3>
          {data.length > 0 && (
            <div className="pagination-controls">
              <button
                onClick={handleLoadBack}
                disabled={page === 1 || loading}
                className="pagination-btn"
                aria-label="Previous page"
              >
                <FaChevronLeft />
              </button>
              <span className="page-indicator">Page {page}</span>
              <button
                onClick={handleLoadMore}
                disabled={loading || data.length === 0}
                className="pagination-btn"
                aria-label="Next page"
              >
                <FaChevronRight />
              </button>
            </div>
          )}
        </div>

        {loading ? (
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Loading auctions...</p>
          </div>
        ) : data.length === 0 ? (
          <div className="empty-state">
            <p>No related auctions found</p>
          </div>
        ) : (
          <div className="related-auctions-grid">
            {data.map((el) => (
              <Link href={`/item/${el.id}`} key={el.id} className="auction-card-link">
                <div className="auction-card">
                  <div className="auction-image-container">
                    <Image
                      src={el.images?.[0] || 'https://via.placeholder.com/300x200'}
                      alt={el.name}
                      fill
                      className="auction-image"
                    />
                    <div className="auction-overlay">
                      <div className="auction-badge">
                        <FaHammer className="badge-icon" />
                      </div>
                      <div className="time-remaining-badge">
                        {calculateDaysRemaining(el.timeEnd)}
                      </div>
                    </div>
                  </div>

                  <div className="auction-content">
                    <h4 className="auction-title">{el.name}</h4>
                    <div className="auction-specs">
                      <span className="spec-item">{el.year || 'N/A'}</span>
                      <span className="spec-separator">·</span>
                      <span className="spec-item">{el.mileage || 'N/A'} km</span>
                      <span className="spec-separator">·</span>
                      <span className="spec-item">{el.cubicCapacity || 'N/A'}</span>
                      {el.fuel && (
                        <>
                          <span className="spec-separator">·</span>
                          <span className="spec-item">{el.fuel}</span>
                        </>
                      )}
                    </div>
                    <div className="auction-bid">
                      <span className="bid-label">Current Bid:</span>
                      <span className="bid-amount">{formatPrice(el.price || 0)}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemSidebar;
