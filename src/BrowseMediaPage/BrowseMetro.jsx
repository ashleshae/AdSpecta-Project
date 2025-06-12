import { useState, useRef, useEffect } from "react";
import "./BrowseMedia.css";
import React from "react";
import Header from "../HomePage/components/ui/Header.jsx";
import Navigation from "../HomePage/components/ui/Navigation.jsx";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase.js";
import { Link } from "react-router-dom";

const BrowseMetro = () => {
  const [metroAds, setMetroAds] = useState([]);
  const [crowdLevel, setCrowdLevel] = useState("");
  const [sortBy, setSortBy] = useState("top");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const areaArray = ["Vanaz To Ramwa"];

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    setSelectedCategories((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };

  useEffect(() => {
    const fetchMetroAds = async () => {
      try {
        const q = query(
          collection(db, "AdSpace_Data"),
          where("AdSpace_Type", ">=", "MetroAds"),
          where("AdSpace_Type", "<", "MetroAdt")
        );
        const querySnapshot = await getDocs(q);

        const allAds = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        let filtered = allAds;

        if (selectedLocation.trim() !== "") {
          const lowerSelected = selectedLocation.trim().toLowerCase();
          filtered = filtered.filter((ad) =>
            ad.Location?.toLowerCase().includes(lowerSelected)
          );
        }

        if (selectedCategories.length > 0) {
          filtered = filtered.filter((ad) => {
            const tags =
              ad.Tags?.split(",").map((tag) => tag.trim().toLowerCase()) || [];
            return selectedCategories.some((cat) =>
              tags.includes(cat.toLowerCase())
            );
          });
        }

        if (crowdLevel !== "") {
          filtered = filtered.filter(
            (ad) =>
              ad["CrowdLevel"]?.toLowerCase() === crowdLevel.toLowerCase()
          );
        }

        if (sortBy === "price-high") {
          filtered.sort(
            (a, b) =>
              parseFloat(a.Starting_Rate || 0) -
              parseFloat(b.Starting_Rate || 0)
          );
        } else if (sortBy === "price-low") {
          filtered.sort(
            (a, b) =>
              parseFloat(b.Starting_Rate || 0) -
              parseFloat(a.Starting_Rate || 0)
          );
        }

        setMetroAds(filtered);
      } catch (error) {
        console.error("Error fetching metro ads:", error);
      }
    };

    fetchMetroAds();
  }, [selectedLocation, selectedCategories, crowdLevel, sortBy]);

  const filteredLocations = areaArray.filter((location) =>
    location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setSearchTerm(location);
    setIsDropdownOpen(false);
  };

  const handleClearSelection = () => {
    setSelectedLocation("");
    setSearchTerm("");
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div>
      <Header />
      <Navigation />
      <main className="main-content">
        <aside className="filters">
          <h2 className="filter-title">Filters</h2>
          <div className="filter-group">
            <h3 className="filter-group-title">LOCATION</h3>
            <div className="dropdown-container" ref={dropdownRef}>
              <div className="input-wrapper">
                <input
                  type="text"
                  className="select"
                  placeholder="Search Location"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setIsDropdownOpen(true);
                  }}
                  onFocus={() => setIsDropdownOpen(true)}
                />
                {selectedLocation && (
                  <button className="clear-icon" onClick={handleClearSelection}>
                    ✖
                  </button>
                )}
              </div>
              {isDropdownOpen && (
                <ul className="dropdown-list">
                  {filteredLocations.map((location) => (
                    <li
                      key={location}
                      onClick={() => handleLocationSelect(location)}
                      className="dropdown-item"
                    >
                      {location}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </aside>

        <div className="content-area">
          <div className="content-header">
            <div className="breadcrumb">
              <a href="/">Home</a>
              <span>→</span>
              <Link
                to="/browse-metroads"
                onClick={() => window.location.reload()}
                style={{ color: "black", cursor: "pointer" }}
              >
                Metro Ads
              </Link>
            </div>
          </div>

          <div className="header-controls">
            <div className="select-wrapper">
              <select
                className="select"
                value={crowdLevel}
                onChange={(e) => setCrowdLevel(e.target.value)}
              >
                <option value="">Crowd Level</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div className="select-wrapper">
              <select
                className="select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="top">Price</option>
                <option value="price-low"> Low to High</option>
                <option value="price-high"> High to Low</option>
              </select>
            </div>
          </div>

          <h1 className="page-title">Book Metro Ads Online At Best Rates</h1>

          <div className="hoarding-grid">
            {metroAds.length === 0 ? (
              <p style={{ marginTop: "20px" }}>
                No metro ads available for this location.
              </p>
            ) : (
              metroAds.map((ad) => (
                <Link
                  key={ad.id}
                  to={`/details/${ad.AdSpace_id}`}
                  className="hoarding-card-link"
                >
                  <div key={ad.id} className="hoarding-card">
                    <div className="hoarding-image">
                      <img
                        src={ad.ImageURL || "/placeholder.svg"}
                        alt={ad.Area}
                      />
                    </div>
                    <h3 className="hoarding-title">{ad.AdSpace_Type}</h3>
                    <p className="hoarding-language">{ad.Location}</p>
                    <div className="hoarding-stats">
                      <div className="stat-1">
                        <img src="images/reader.png" alt="readers" />
                        <span>{ad["CrowdLevel"] || "N/A"}</span>
                      </div>
                      <div className="stat-2">
                        <img src="images/saletag.png" alt="sale tag" />
                        <span>₹{ad.Starting_Rate || "N/A"} Min Spend</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </main>
      <footer>
        <p>&copy; 2025 AdSpecta. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default BrowseMetro;
