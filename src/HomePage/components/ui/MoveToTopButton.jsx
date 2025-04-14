import React, { useState, useEffect } from "react";
import "./homepage.css";

const MoveToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Handle scroll event to show/hide button
  const handleScroll = () => {
    if (window.scrollY > 200) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    isVisible && (
      <div className="top-container">
        <div className="move-to-top" onClick={scrollToTop}>
          Move To Top ▲
        </div>
      </div>
    )
  );
};

export default MoveToTopButton;