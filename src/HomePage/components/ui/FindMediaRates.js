
import React, { useState } from "react";
import { Search, Heart, ShoppingBag, BarChart3 } from "lucide-react";
import "./homepage.css"; 
import Header from "./Header";
import Navigation from "./Navigation";
import GenreSection from "./GenreSection";
import { useNavigate } from "react-router-dom";

const FindMediaRates = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

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

  return (
    <div>
      <Header />
      <Navigation />
      <div className="media-main-container">
        <div className="media-colored-box">
          <h1 className="media-heading">Find Media Rates</h1>
          <p className="media-subtext">
            AdSpecta provides you easy and direct access to 100s of media options across genres.
          </p>

          <div>
            <div className="media-features">
              <FeatureBox
                icon={<Search size={28} />}
                title="Search & Compare"
                desc="Ad rates across popular media"
              />
              <FeatureBox
                icon={<ShoppingBag size={28} />}
                title="Bag Your Options"
                desc="And save as campaign"
              />
            </div>

            {/* Updated Search Bar with Suggestions */}
            <div className="media-search-container" style={{ position: "relative" }}>
              <input
                type="text"
                placeholder="Search Channel, Media"
                className="media-search-input"
                value={searchTerm}
                onChange={handleSearchChange}
                onKeyDown={handleKeyDown}
              />
              <button className="media-search-button">
                <Search />
              </button>
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
          </div>
        </div>
        <div className="override-bg">
          <GenreSection />
        </div>
      </div>
      <footer>
        <p>&copy; 2025 AdSpecta. All rights reserved.</p>
      </footer>
    </div>
  );
};

const FeatureBox = ({ icon, title, desc }) => (
  <div className="feature-box">
    <div className="feature-icon">{icon}</div>
    <div>
      <h3 className="feature-title">{title}</h3>
      <p className="feature-desc">{desc}</p>
    </div>
  </div>
);

export default FindMediaRates;
