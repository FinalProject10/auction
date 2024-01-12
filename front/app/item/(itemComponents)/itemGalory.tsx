"use client";
import React, { useState } from "react";
import Image from "next/image";
import "./style/itemGaliry.css";
// import { TImage } from "react-icons/t";

// Assuming images are located in the 'public/images' directory
const IMAGES = [
  "https://autobid.modeltheme.com/wp-content/uploads/2023/11/autobid-vehicle-22.jpg",
  "https://autobid.modeltheme.com/wp-content/uploads/2023/11/autobid-vehicle-22-v3.jpg",
  "https://autobid.modeltheme.com/wp-content/uploads/2023/11/autobid-vehicle-22-v1.jpg",
  "https://autobid.modeltheme.com/wp-content/uploads/2023/11/autobid-vehicle-22-v2.jpg",
];
const THUMBS = [
  "https://autobid.modeltheme.com/wp-content/uploads/2023/11/autobid-vehicle-22.jpg",
  "https://autobid.modeltheme.com/wp-content/uploads/2023/11/autobid-vehicle-22-v3.jpg",
  "https://autobid.modeltheme.com/wp-content/uploads/2023/11/autobid-vehicle-22-v1.jpg",
  "https://autobid.modeltheme.com/wp-content/uploads/2023/11/autobid-vehicle-22-v2.jpg",
];

interface GalleryProps {}

const Gallery: React.FC<GalleryProps> = () => {
  const [currentImage, setCurrentImage] = useState(IMAGES[0]);

  const handleClick = (index: number) => {
    setCurrentImage(IMAGES[index]);
  };

  const removeActivatedClass = (parent: HTMLElement) => {
    parent.childNodes.forEach((node) => {
      if (node.childNodes[0].classList.contains("activated")) {
        node.childNodes[0].classList.remove("activated");
      }
    });
  };

  return (
    <section className="gallery-holder hide-in-mobile">
      <section className="gallery">
        <div className="image">
          <Image src={currentImage} alt="product" width={400} height={400} />
        </div>

        <div className="thumbnails">
          {THUMBS.map((th, index) => (
            <div
              className="img-holder"
              key={index}
              onClick={(e) => {
                handleClick(index);
                removeActivatedClass(e.currentTarget.parentNode);
                e.currentTarget.childNodes[0].classList.toggle("activated");
              }}
            >
              <div className={`outlay ${index === 0 && "activated"}`}>
                {/* <TImage size={48} /> */}
              </div>
              <Image
                src={th}
                alt={`product-${index + 1}`}
                width={100}
                height={100}
              />
            </div>
          ))}
        </div>
      </section>
    </section>
  );
};

export default Gallery;
