import React from "react";
import "./homepage.css";
import { useNavigate } from "react-router-dom";

const InfoSection = () => {
  const navigate = useNavigate();

  return (
    <section className="info-section">
      <div className="info-container">
        <div className="info-text">
          <h2>Looking for more information?</h2>
        </div>
        <div className="info-contact">
          <button className="contact-btn" onClick={() => navigate("/contactus")}>CONTACT US</button>
        </div>
        <div className="info-image">
          <img src="images/contact.png" alt="Lady illustration" />
        </div>
      </div>
    </section>
  );
};

export default InfoSection;