
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import HamburgerMenu from "./HamburgerMenu";
import "./homepage.css";
import Login from "./Login";
import Signup from "./Signup";

// Lucide React icons
import { Menu, Search, LogIn, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isSignupOpen, setSignupOpen] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();
  const [userFirstName, setUserFirstName] = useState(localStorage.getItem("userFirstName"));
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true");


  const adSpaceTypes = ["Hoarding", "BillBoard", "Bus Shelter", "Metro", "Auto", "Wall Ads", "Rickshaws", "RoadSide Walls"];

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    const filteredSuggestions = adSpaceTypes.filter((item) =>
      item.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(value ? filteredSuggestions : []);
  };

  const handleSuggestionClick = (value) => {
    setSearchTerm(value);
    setSuggestions([]);
    redirectToPage(value.toLowerCase());
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      redirectToPage(searchTerm.toLowerCase());
    }
  };

  const redirectToPage = (term) => {
    switch (term) {
      case "hoarding":
      case "billboard":
        navigate("/browse-hoarding");
        break;
      case "bus shelter":
        navigate("/browse-bus-shelter");
        break;
      case "metro":
        navigate("/browse-metro");
        break;
      case "auto":
      case "rickshaws":
        navigate("/browse-auto");
        break;
      case "wall ads":
      case "roadside walls":
      case "roadside wall":
        navigate("/browse-roadside-walls");
        break;
      default:
        break;
    }
  };

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
          value={searchTerm}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
        />
        <Search className="search-icon" size={20} />
        {suggestions.length > 0 && (
          <ul className="suggestions-list">
            {suggestions.map((item, index) => (
              <li key={index} onClick={() => handleSuggestionClick(item)}>
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="leftcorner">
        <a href="/contactus">Contact Us</a>

        <div className="login-container">
          {isLoggedIn ? (
            <div className="login-btn dropdown">
              <LogIn className="icon" />
              <a>{userFirstName}</a>
              <div className="dropdown-content">
                <a href="/profile">Profile</a>
                <a
                  href="#"
                  onClick={() => {
                    localStorage.removeItem("userFirstName");
                    localStorage.removeItem("isLoggedIn");
                    setUserFirstName("");
                    setIsLoggedIn(false);
                  }}
                >
                  Logout
                </a>
              </div>
            </div>
          ) : (
            <div className="login-btn" onClick={() => setLoginOpen(true)}>
              <LogIn className="icon" />
              <a href="#">Login</a>
            </div>
          )}


        </div>

        <div className="leftcorner">
          <ShoppingBag className="icon" />
          <a href="/cart/:adspaceId">Your Bag</a>
        </div>
      </div>

      {isLoginOpen && (
        <Login
          onClose={(loginSuccess) => {
            setLoginOpen(false);
            if (loginSuccess) {
              setUserFirstName(localStorage.getItem("userFirstName"));
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
    </header>
  );
};

export default Header;
