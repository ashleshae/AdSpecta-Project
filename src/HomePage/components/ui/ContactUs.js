import React from "react";
import "./homepage.css";
import Header from "./Header";
import Navigation from "./Navigation";

const ContactForm = () => {
  return (
    <div>
    <Header />
    <Navigation />
    <div style={{ 
      fontFamily: "Arial, sans-serif", 
      margin: 0, 
      padding: 0, 
      backgroundColor: "#f8f9fa", 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center", 
      minHeight: "500px"
    }}>
      <div className="contact-form">
        <h2>Write To Us</h2>
        <input type="text" placeholder="Your Name *" />
        <input type="email" placeholder="Your Email ID *" />
        <input type="tel" placeholder="Your Mobile Number *" />
        <select>
          <option>Requirement</option>
          <option>Advertising</option>
          <option>Media Buying</option>
          <option>Other</option>
        </select>
        <button className="send-btn">Send Message</button>
      </div>
      <div className="contact-info">
        <img src="images/contactus.png" alt="Support" className="support-image" />
        {/* <p>Call Us (For Advertising Only*)</p>
        <strong>080-67415510</strong>
        <p>Advertisers: <a href="mailto:ad@themediaant.com">ad@themediaant.com</a></p>
        <p>Media Owners: <a href="mailto:map@themediaant.com">map@themediaant.com</a></p> */}
      </div>
    </div>
    <footer>
        <p>&copy; 2025 AdSpecta. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ContactForm;
