import React, { useState, useEffect } from "react";
import "./homepage.css"; // Import styles
import { Link } from "react-router-dom";

const Carousel = () => {
  const texts = [
    "Find and buy the best advertising options online",
    "Plan your advertising",
    "Buy best media Ad"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide effect every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 2000); // Change text every 2 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  // Function to update the active text and active dot
  const showText = (index) => {
    setCurrentIndex(index);
  };

  // Handle next and previous clicks
  const nextText = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
  };

  const prevText = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + texts.length) % texts.length);
  };

  return (
    <section className="main">
      <h2>Empowering All To Advertise</h2>

      {/* Text Carousel */}
      <div className="text-carousel">
        {texts.map((text, index) => (
          <p key={index} className={`carousel-text ${index === currentIndex ? "active" : ""}`}>
            {text}
          </p>
        ))}
      </div>

      {/* Navigation Buttons and Dots */}
      <div className="carousel-wrapper">
        <img src="images/back.png" alt="Back" onClick={prevText} className="nav-button" />
        <div className="dots-container">
          {texts.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentIndex ? "active" : ""}`}
              onClick={() => showText(index)}
            ></span>
          ))}
        </div>
        <img src="images/next.png" alt="Next" onClick={nextText} className="nav-button" />
      </div>

      {/* Cards Section */}
      <div className="cards">
        <Link to="/media-rates">
          <div className="card">
            <h3>Find</h3>
            <p>Media Rates</p>
          </div>
        </Link>
        <div className="card">
          <h3>Design</h3>
          <p>AI Poster</p>
        </div>
      </div>
    </section>
  );
};

export default Carousel;