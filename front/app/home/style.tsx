"use client";
import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const Style = () => {
  const router = useRouter();

  const bodyTypes = [
    {
      name: "Sedan",
      image: "/images/categories/autobid-main_categ1.png",
      category: "sedan"
    },
    {
      name: "SUV",
      image: "/images/categories/autobid-main_categ2.png",
      category: "suv"
    },
    {
      name: "Sports",
      image: "/images/categories/autobid-main_categ3.png",
      category: "sports"
    },
    {
      name: "Convertible",
      image: "/images/categories/autobid-main_categ4.png",
      category: "convertible"
    },
    {
      name: "Compact",
      image: "/images/categories/autobid-main_categ5.png",
      category: "compact"
    },
    {
      name: "Pick Up",
      image: "/images/categories/autobid-main_categ6.png",
      category: "pickup"
    },
    {
      name: "Cross Over",
      image: "/images/categories/autobid-main_categ7.png",
      category: "crossover"
    },
    {
      name: "Electric",
      image: "/images/categories/autobid-main_categ8.png",
      category: "electric"
    }
  ];

  const handleCategoryClick = (category: string) => {
    localStorage.setItem('category', category);
    router.push('/shop');
  };

  return (
    <div className="body-type-section">
      <div className="body-type-container">
        <div className="section-header">
          <span className="section-tag">Find Your Style</span>
          <h2 className="section-title">Search by Body Type</h2>
          <p className="section-description">
            Browse our extensive collection of vehicles by body type
          </p>
        </div>

        <div className="body-types-grid">
          {bodyTypes.map((type, index) => (
            <div
              key={index}
              className="body-type-card"
              onClick={() => handleCategoryClick(type.category)}
            >
              <div className="body-type-image">
                <Image
                  src={type.image}
                  alt={type.name}
                  width={200}
                  height={150}
                  className="body-type-img"
                  unoptimized={true}
                  onError={(e) => {
                    // Fallback to placeholder if image fails
                    e.currentTarget.src = '/placeholder-car.png';
                  }}
                />
              </div>
              <h3 className="body-type-name">{type.name}</h3>
            </div>
          ))}
        </div>

        <div className="body-type-cta">
          <Link href="/shop">
            <button className="btn-primary btn-large">Check Our Shop</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Style;
