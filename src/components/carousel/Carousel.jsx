import React from "react";
import styles from "./Carousel.module.css"; // Make sure your styles are correctly imported
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const Carousel = ({ images = [] }) => {
  return (
    <div id="carouselExampleIndicators" className="carousel slide">
      {/* Dynamic Carousel Indicators */}
      <div className="carousel-indicators">
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to={index}
            className={index === 0 ? "active" : ""}
            aria-current={index === 0 ? "true" : "false"}
            aria-label={`Slide ${index + 1}`}
          ></button>
        ))}
      </div>

      {/* Dynamic Carousel Images */}
      <div className="carousel-inner">
        {images.length > 0 ? (
          images.map((image, index) => (
            <div
              key={index}
              className={`carousel-item ${index === 0 ? "active" : ""}`}
            >
              <img
                src={image}
                className="d-block w-100"
                alt={`Slide ${index + 1}`}
              />
            </div>
          ))
        ) : (
          <div className="carousel-item active">
            <img
              src="default_image_url" // Replace with a placeholder image URL
              className="d-block w-100"
              alt="Default Slide"
            />
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Carousel;
