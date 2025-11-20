"use client";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import Image from "next/image";
import "./style/itemGallery.css";

interface Item {
  id?: number;
  images?: string | string[];
  [key: string]: any;
}

interface GalleryProps {
  items: Item[] | Item;
}

const Gallery: React.FC<GalleryProps> = ({ items }) => {
  // Helper function to parse images (handle string, array, or null) - memoized
  const parseImages = useCallback((images: any): string[] => {
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
  }, []);

  // Normalize items to always be an array - memoized
  const itemsArray = useMemo(() => {
    return Array.isArray(items) ? items : [items];
  }, [items]);
  
  // Get images for the first item - memoized
  const firstItemImages = useMemo(() => {
    return itemsArray.length > 0 ? parseImages(itemsArray[0]?.images) : [];
  }, [itemsArray, parseImages]);
  
  const [currentImage, setCurrentImage] = useState(firstItemImages[0] || "");

  // Update current image when items change
  useEffect(() => {
    if (firstItemImages.length > 0 && firstItemImages[0] !== currentImage) {
      setCurrentImage(firstItemImages[0]);
    }
  }, [firstItemImages, currentImage]);

  const handleClick = useCallback((image: string) => {
    setCurrentImage(image);
  }, []);

  // Don't render if no items or no images
  if (itemsArray.length === 0 || firstItemImages.length === 0) {
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
          {itemsArray.map((item) => {
            const itemImages = parseImages(item.images);
            return itemImages.map((image, index) => (
              <div
                className="img-holder"
                key={`${item.id || index}-${index}`}
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
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                />
              </div>
            ));
          })}
        </div>
      </section>
    </section>
  );
};

export default React.memo(Gallery);
