
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import HamburgerMenu from "./HamburgerMenu";
import "./homepage.css";
import Login from "./Login";
import Signup from "./Signup";

// Lucide React icons
import { Menu, Search, LogIn, ShoppingBag } from "lucide-react";

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
            <Menu className="icon" />
          </button>
          <a href="/" className="logo">
            <span>AdSpecta</span>
          </a>
        </div>
      </div>

      <div className="search">
        <input
          type="text"
          placeholder="Search Channel, Media"
          id="search-bar"
        />
        <Search className="search-icon" size={20} />
      </div>

      <div className="leftcorner">
        <a href="/contactus">Contact Us</a>

        <div className="login-container">
          <div className="login-btn" onClick={() => setLoginOpen(true)}>
            <LogIn className="icon" />
            <a href="#">Login</a>
          </div>
        </div>

        <div className="leftcorner">
          <ShoppingBag className="icon" />
          <a href="#">Your Bag</a>
        </div>
      </div>

      {isLoginOpen && (
        <Login
          onClose={() => setLoginOpen(false)}
          onSignupClick={() => {
            setLoginOpen(false);
            setSignupOpen(true);
          }}
        />
      )}

      {isSignupOpen && (
        <Signup
          onClose={() => setSignupOpen(false)}
          onLoginClick={() => {
            setSignupOpen(false);
            setLoginOpen(true);
          }}
        />
      )}
    </header>
  );
};

export default Header;
