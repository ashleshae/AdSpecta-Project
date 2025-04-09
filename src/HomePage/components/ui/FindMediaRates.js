
import React from "react";
import { Search, Heart, ShoppingBag, BarChart3 } from "lucide-react";
import "./homepage.css"; 
import Header from "./Header";
import Navigation from "./Navigation";
import GenreSection from "./GenreSection"

const FindMediaRates = () => {
  return (
    <div>
      <Header />
      <Navigation />
      <div className="media-main-container">
        <div className="media-colored-box">
          {/* Main Heading */}
          <h1 className="media-heading">Find Media Rates</h1>

          {/* Subtext */}
          <p className="media-subtext">
            AdSpecta provides you easy and direct access to 100s of media options across genres.
          </p>

          {/* Colored Box Section */}
          <div >
            {/* Feature Boxes */}
            <div className="media-features">
              <FeatureBox
                icon={<Search size={28} />}
                title="Search & Compare"
                desc="Ad rates across popular media"
              />
              {/* <FeatureBox
                icon={<Heart size={28} />}
                title="Save Favourite Options"
                desc="For quick access"
              /> */}
              <FeatureBox
                icon={<ShoppingBag size={28} />}
                title="Bag Your Options"
                desc="And save as campaign"
              />
              {/* <FeatureBox
                icon={<BarChart3 size={28} />}
                title="Download Rates"
                desc="In your preferred formats"
              /> */}
            </div>

            {/* Search Bar */}
            <div className="media-search-container">
              <input
                type="text"
                placeholder="Search Channel, Media"
                className="media-search-input"
              />
              <button className="media-search-button">
                <Search />
              </button>
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

