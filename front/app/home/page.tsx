"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import "./home.css";

const Auctions = dynamic(() => import("./auctions"));
const Aboutus = dynamic(() => import("./aboutus"));
const StartNow = dynamic(() => import("./startNow"));
const Offers = dynamic(() => import("./offers"));
const Style = dynamic(() => import("./style"));
const Services = dynamic(() => import("./services"));

const Home = () => {
  const router = useRouter();
  const image = [
    "https://autobid.modeltheme.com/wp-content/uploads/2023/11/autobid-home-scaled.jpg",
    "https://autobid.modeltheme.com/wp-content/uploads/2023/12/autobid-home2.jpg",
  ];
  const [i, setI] = useState(0);

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setI((prev) => (prev + 1) % image.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [image.length]);

  const carouselData = [
    {
      year: "2019",
      brand: "Mercedes-Benz",
      model: "AMG GT-R",
      price: "$3,400",
      itemId: 6
    },
    {
      year: "2021",
      brand: "Ferrari-F8",
      model: "Tributo",
      price: "$3,400",
      itemId: 2
    }
  ];

  const currentCar = carouselData[i];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <div
        className="hero-section"
        style={{
          backgroundImage: `url(${image[i]})`,
        }}
      >
        <div className="hero-overlay"></div>
        
        <div className="hero-content">
          <div className="hero-text">
            <p className="hero-year">{currentCar.year}</p>
            <h1 className="hero-brand">{currentCar.brand}</h1>
            <h2 className="hero-model">{currentCar.model}</h2>
            <p className="hero-price">
              Starting bid from <span className="price-highlight">{currentCar.price}</span>
            </p>
            <div className="hero-buttons">
              <button
                onClick={() => router.push('/shop')}
                className="btn-hero btn-hero-primary"
              >
                Place Bid
              </button>
              <button
                onClick={() => router.push(`/item/${currentCar.itemId}`)}
                className="btn-hero btn-hero-secondary"
              >
                Check Car
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={() => setI(i === 0 ? image.length - 1 : i - 1)}
          className="carousel-nav carousel-nav-left"
          aria-label="Previous slide"
        >
          <KeyboardArrowLeftIcon fontSize="large" />
        </button>
        <button
          onClick={() => setI((i + 1) % image.length)}
          className="carousel-nav carousel-nav-right"
          aria-label="Next slide"
        >
          <KeyboardArrowRightIcon fontSize="large" />
        </button>

        {/* Slide Indicators */}
        <div className="carousel-indicators">
          {image.map((_, index) => (
            <button
              key={index}
              onClick={() => setI(index)}
              className={`indicator ${i === index ? 'active' : ''}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Main Content Sections */}
      <Auctions />
      <Aboutus />
      <StartNow />
      <Offers />
      <Style />
      <Services />
    </div>
  );
};

export default Home;
