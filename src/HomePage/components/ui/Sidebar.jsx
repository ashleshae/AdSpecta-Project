

import React, { useState, useEffect } from "react";
import "./homepage.css";
import Login from "./Login";
import Signup from "./Signup";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isSignupOpen, setSignupOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
    if (loggedIn) {
      const name = localStorage.getItem("userFirstName") || "";
      setFirstName(name.split(" ")[0]);
    }
  }, [isLoginOpen]);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    toggleSidebar();
    window.location.href = "/";
  };

  const openLogin = () => {
    toggleSidebar();
    setLoginOpen(true);
  };

  const renderProfileIcon = () => {
    const firstLetter = firstName?.charAt(0)?.toUpperCase() || "";
    return (
      <div
        className="profile-icon"
        style={{
          width: "35px",
          height: "35px",
          borderRadius: "50%",
          backgroundColor: isLoggedIn ? "#4A90E2" : "transparent",
          color: isLoggedIn ? "#fff" : "#4A90E2",
          border: "2px solid #4A90E2",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "400",
          fontSize: "20px"
        }}
      >
        {isLoggedIn ? firstLetter : ""}
      </div>
    );
  };

  return (
    <div className="sidebar" style={{ left: isOpen ? "0px" : "-300px" }}>
      <div className="sidebar-header">
        <div className="profile">
          {renderProfileIcon()}
          <span className="profile-name" style={{ marginLeft: "10px" }}>
            {isLoggedIn ? `Hello, ${firstName}` : "Hello & Welcome"}
          </span>
        </div>
        <button className="close-button" onClick={toggleSidebar}>
          ✖
        </button>
      </div>

      <ul className="sidebar-menu">
        <li><a href="/" onClick={toggleSidebar}><span>Home</span></a></li>
        <li><a href="/media-rates" onClick={toggleSidebar}>Find Media Rates</a></li>
        <li><a href="#" onClick={toggleSidebar}>Poster Designing AI Tool</a></li>
        <li>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (isLoggedIn) {
                window.location.href = "/profile";
              } else {
                openLogin();
              }
            }}
          >
            My Profile
          </a>
        </li>
        <li><a href="/aboutus" onClick={toggleSidebar}>About Us</a></li>
        <li><a href="/contactus" onClick={toggleSidebar}>Contact Us</a></li>
      </ul>

      <div className="sidebar-footer">
        {isLoggedIn ? (
          <a href="#" className="logout-btn" onClick={handleLogout}>
            Logout
          </a>
        ) : (
          <a href="#" className="logout-btn" onClick={openLogin}>
            Login
          </a>
        )}
      </div>

      {/* Modals */}
      {isLoginOpen && (
        <Login
          onClose={(loggedIn) => {
            setLoginOpen(false);
            if (loggedIn) {
              const name = localStorage.getItem("userFirstName") || "";
              setFirstName(name.split(" ")[0]);
              setIsLoggedIn(true);
            }
          }}
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
