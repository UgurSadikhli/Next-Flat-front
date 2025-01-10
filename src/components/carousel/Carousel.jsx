import React, { useState } from "react";
import styles from "./Carousel.module.css";  // Import CSS module

const CustomCarousel = ({ images = [] }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Handle next button click
  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % images.length); // Wraps around to first image
  };

  // Handle previous button click
  const handlePrev = () => {
    setActiveIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    ); // Wraps around to the last image
  };

  return (
    <div className={styles.carousel}>
      {/* Carousel inner */}
      <div
        className={styles.carouselInner}
        style={{
          transform: `translateX(-${activeIndex * 100}%)`,  // Move the container left according to the active image index
        }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className={styles.carouselItem}
          >
            <div className={styles.carouselItemImgContainer}>
              <img
                src={image}
                alt={`Slide ${index + 1}`}
                className={styles.carouselItemImg}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Indicators */}
      <div className={styles.carouselIndicators}>
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`${styles.carouselIndicatorButton} ${
              activeIndex === index ? styles.carouselIndicatorButtonActive : ""
            }`}
          ></button>
        ))}
      </div>

      {/* Navigation buttons */}
      <button
        className={styles.carouselControlPrev}
        onClick={handlePrev}
      >
       <i class="bi bi-caret-left"></i>
      </button>
      <button
        className={styles.carouselControlNext}
        onClick={handleNext}
      >
       <i class="bi bi-caret-right"></i>
      </button>
    </div>
  );
};

export default CustomCarousel;
