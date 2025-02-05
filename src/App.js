// App.js
import React from "react";
import { FaSearch } from "react-icons/fa";
import "./App.css";
import { useState } from 'react';
import Navigation from "./components/ui/Navigation";
import "./components/ui/homepage.css"; 
import Carousel from "./components/ui/Carousel";
import Genre from "./components/ui/GenreSection";
import FAQ from "./components/ui/FAQ";
import InfoSection from "./components/ui/InfoSection";
import MoveToTopButton from "./components/ui/MoveToTopButton";
import Sidebar from "./components/ui/Sidebar";
import HamburgerMenu from "./components/ui/HamburgerMenu";


const Header = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <header >
      <div className="hamburger-menu">
        <HamburgerMenu toggleSidebar={toggleSidebar} />
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      </div>
      <div className="search">
        <input
          type="text"
          placeholder="Search Channel, Media"
        />
        <img src="images/search.png" alt="Search Icon" />
      </div>
      <div className="leftcorner">
        <a href="#">Contact Us</a>
        <div className="leftcorner">
          <img src="images/login.png" alt="Login" className="icon" />
          <a href="#">Login</a>
        </div>
        <div className="leftcorner">
          <img src="images/cart.png" alt="Cart" className="icon" />
          <a href="#" >Your Bag</a>
        </div>
      </div>
    </header>
  );
};


const App = () => {
  return (
    <div>
      <Header />
      <Navigation/>
      <Carousel />
      <Genre/>
      <FAQ/>
      <InfoSection/>
      <MoveToTopButton/>
      <footer>
        <p>&copy; 2025 AdSpecta. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;