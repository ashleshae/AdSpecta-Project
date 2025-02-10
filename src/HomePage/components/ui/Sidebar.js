// Sidebar.js
import React from "react";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div
      className="sidebar"
      style={{ left: isOpen ? "0px" : "-300px" }}
    >
      <div className="sidebar-header">
        <div className="profile">
          <div className="profile-icon">
            <img src="images/logo.png" alt="Logo" width="25" height="25" />
          </div>
          <span className="profile-name">Hello & Welcome</span>
        </div>
        <button className="close-btn" onClick={toggleSidebar}>
          ✖
        </button>
      </div>
      <ul className="sidebar-menu">
        <li>
          <a href="#" onClick={toggleSidebar}>
            Home
          </a>
        </li>
        <li>
          <a href="#">Find Media Rates</a>
        </li>
        <li>
          <a href="#">Poster Designing AI Tool</a>
        </li>
        <li>
          <a href="#">My Dashboard</a>
        </li>
        <li>
          <a href="#">My Profile</a>
        </li>
        <li>
          <a href="#">About Us</a>
        </li>
        <li>
          <a href="#">Contact Us</a>
        </li>
      </ul>
      <div className="sidebar-footer">
        <a href="#" className="logout-btn">
          Login
        </a>
      </div>
    </div>
  );
};

export default Sidebar;