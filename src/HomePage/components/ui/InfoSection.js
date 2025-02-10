import React from "react";
import "./homepage.css";

const InfoSection = () => {
  return (
    <section className="info-section">
      <div className="info-container">
        <div className="info-text">
          <h2>Looking for more information?</h2>
        </div>
        <div className="info-contact">
          <button className="contact-btn">CONTACT US</button>
        </div>
        <div className="info-image">
          <img src="images/contact.png" alt="Lady illustration" />
        </div>
      </div>
    </section>
  );
};

export default InfoSection;