import React from "react";
import "./homepage.css";
import Header from "./Header";
import Navigation from "./Navigation";
import InfoSection from "./InfoSection";
import MoveToTopButton from "./MoveToTopButton";

const AboutUs = () => {
  return (
    <div>
      <Header />
      <Navigation />
    <div className="about-us-container">
      <h1>About Us</h1>
      <section className="about-section">
        <h2>Who We Are</h2>
        <p>
          AdSpecta is a revolutionary offline marketing platform designed to simplify and optimize ad placements across various media channels. We bridge the gap between advertisers and media owners, providing a seamless and data-driven approach to outdoor advertising.
        </p>
      </section>

      <section className="about-section">
        <h2>Our Mission</h2>
        <p>
          Our mission is to <strong>democratize offline advertising</strong> by making it <strong>accessible, transparent, and efficient</strong> for businesses of all sizes. We empower advertisers to launch targeted ad campaigns with ease while enabling media owners to maximize their inventory.
        </p>
      </section>

      <section className="about-section">
        <h2>What We Offer</h2>
        <ul>
          <li><strong>Comprehensive Media Buying Platform</strong> – A centralized marketplace for all offline advertising needs.</li>
          <li><strong>Data-Driven Insights</strong> – Advanced analytics to help advertisers make informed decisions.</li>
          <li><strong>Seamless Booking & Management</strong> – Hassle-free ad placement with a user-friendly interface.</li>
          <li><strong>Cost-Effective Solutions</strong> – Eliminating agency commissions to provide direct value to businesses.</li>
        </ul>
      </section>

      <section className="about-section">
        <h2>Why AdSpecta?</h2>
        <ul>
          <li><strong>One-Stop Solution:</strong> From billboards to transit ads, find the best advertising spaces in one place.</li>
          <li><strong>Transparency & Trust:</strong> Clear pricing and real-time availability ensure credibility.</li>
          <li><strong>Flexibility & Control:</strong> Whether you’re a startup or a corporate brand, manage campaigns effortlessly.</li>
          <li><strong>Innovation & Technology:</strong> Leveraging AI and ML to optimize ad placements for maximum impact.</li>
        </ul>
      </section>

      <section className="about-section">
        <h2>Our Vision</h2>
        <p>
          We envision a world where offline advertising is as easy and measurable as digital ads. By integrating technology with traditional media, we aim to <strong>redefine how brands connect with their audiences in the physical world.</strong>
        </p>
      </section>

      <section className="contact-section">
        <h2>Get in Touch</h2>
        <p>Interested in growing your brand with AdSpecta? Contact us today to explore the best offline marketing solutions tailored for your business.</p>
        <p>📩 <strong>Email:</strong> support@adspecta.com</p>
        <p>📞 <strong>Phone:</strong> +91-XXXXXXXXXX</p>
        {/* <p>🌍 <strong>Website:</strong> <a href="https://www.adspecta.com" target="_blank" rel="noopener noreferrer">www.adspecta.com</a></p> */}
      </section>
    </div>
    <InfoSection/>
      <MoveToTopButton/>
      <footer>
        <p>&copy; 2025 AdSpecta. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AboutUs;
