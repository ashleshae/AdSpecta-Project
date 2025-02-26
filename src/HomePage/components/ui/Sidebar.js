//Sidebar.js
import React, { useState } from "react";
import "./homepage.css";
import Login from "./Login";
import Signup from "./Signup";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isSignupOpen, setSignupOpen] = useState(false);

  return (
    <div className="sidebar" style={{ left: isOpen ? "0px" : "-300px" }}>
      <div className="sidebar-header">
        <div className="profile">
          <div className="profile-icon">
            <img src="images/logo.png" alt="Logo" width="25" height="25" />
          </div>
          <span className="profile-name">Hello & Welcome</span>
        </div>
        <button className="close-button" onClick={toggleSidebar}>
         ✖
        </button>
      </div>

      <ul className="sidebar-menu">
        <li><a href="/" onClick={toggleSidebar}><span>Home</span></a></li>
        <li><a href="#">Find Media Rates</a></li>
        <li><a href="#">Poster Designing AI Tool</a></li>
        <li><a href="#">My Dashboard</a></li>
        <li><a href="#">My Profile</a></li>
        <li><a href="/aboutus" onClick={toggleSidebar}>About Us</a></li>
        <li><a href="/contactus">Contact Us</a></li>
      </ul>

      <div className="sidebar-footer">
          <a href="#" className="logout-btn" onClick={() => setLoginOpen(true)} >
          Login
          </a>
      </div>

      {/* Login and Signup Modals */}
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
    </div>
  );
};

export default Sidebar;
