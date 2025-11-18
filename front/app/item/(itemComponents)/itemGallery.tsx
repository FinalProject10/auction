"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import "./style/itemGallery.css";

const Gallery: React.FC<GalleryProps> = ({ items }) => {
  // Helper function to parse images (handle string, array, or null)
  const parseImages = (images: any): string[] => {
    if (!images) return [];
    if (Array.isArray(images)) return images;
    if (typeof images === 'string') {
      try {
        const parsed = JSON.parse(images);
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        // If parsing fails, treat as single image URL
        return [images];
      }
    }
    return [];
  };

  // Get images for the first item
  const firstItemImages = items && items.length > 0 ? parseImages(items[0]?.images) : [];
  const [currentImage, setCurrentImage] = useState(firstItemImages[0] || "");

  // Update current image when items change
  useEffect(() => {
    if (items && items.length > 0) {
      const images = parseImages(items[0]?.images);
      if (images.length > 0) {
        setCurrentImage(images[0]);
      }
    }
  }, [items]);

  const handleClick = (image: string) => {
    setCurrentImage(image);
  };

  // Don't render if no items or no images
  if (!items || items.length === 0 || firstItemImages.length === 0) {
    return (
      <section className="gallery-holder hide-in-mobile">
        <section className="gallery">
          <div className="image">
            <div className="flex items-center justify-center h-[500px] bg-gray-200">
              <p>No images available</p>
            </div>
          </div>
        </section>
      </section>
    );
  }

  return (
    <section className="gallery-holder hide-in-mobile">
      <section className="gallery">
        <div className="image">
          {currentImage && (
            <Image
              className="image"
              src={currentImage}
              alt="product"
              width={900}
              height={500}
            />
          )}
        </div>

        <div className="thumbnails">
          {items.map((item) => {
            const itemImages = parseImages(item.images);
            return itemImages.map((image, index) => (
              <div
                className="img-holder"
                key={index}
                onClick={() => handleClick(image)}
              >
                <div
                  className={`outlay ${currentImage === image && "activated"}`}
                ></div>
                <Image
                  src={image}
                  alt={`product-${index + 1}`}
                  width={100}
                  height={100}
                />
              </div>
            ));
          })}
        </div>
      </section>
    </section>
  );
};

export default Gallery;
