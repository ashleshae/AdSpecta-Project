
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import HamburgerMenu from "./HamburgerMenu";
import "./homepage.css";
import Login from "./Login";
import Signup from "./Signup";

const Header = () => {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isSignupOpen, setSignupOpen] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };


  return (
    <header>
      <div className="hamburger-menu">
        <HamburgerMenu toggleSidebar={toggleSidebar} />
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="logo-section">
          <button className="menu-button">
            <i className="fas fa-bars"></i>
          </button>
          <a href="/" className="logo">
            <span>AdSpecta</span>
          </a>
        </div>
      </div>

      <div className="search">
        <input type="text" placeholder="Search Channel, Media" id="search-bar" />
        <img src="images/search.png" alt="Search Icon" />
      </div>

      <div className="leftcorner">
        <a href="#">Contact Us</a>
        
        <div className="login-container">
          <div className="login-btn" onClick={() => setLoginOpen(true)} >
            <img src="images/login.png" alt="Login" className="icon" />
            <a href="#">Login</a>
          </div>
        </div>

        <div className="leftcorner">
          <img src="images/cart.png" alt="Cart" className="icon" />
          <a href="#">Your Bag</a>
        </div>
      </div>
      {isLoginOpen && <Login onClose={() => setLoginOpen(false)} onSignupClick={() => { setLoginOpen(false); setSignupOpen(true); }} />}
      {isSignupOpen && <Signup onClose={() => setSignupOpen(false)} onLoginClick={() => { setSignupOpen(false); setLoginOpen(true); }} />}
    </header>
  );
};

export default Header;
