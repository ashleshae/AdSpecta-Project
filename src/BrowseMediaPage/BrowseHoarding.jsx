
import { useState, useRef, useEffect } from "react";
import "./BrowseMedia.css";
import React from "react";
import Header from "../HomePage/components/ui/Header.jsx";
import Navigation from "../HomePage/components/ui/Navigation.jsx";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase.js";
import { Link } from "react-router-dom";

const BrowseHoarding = () => {
  const [hoardings, setHoardings] = useState([]);
  const [crowdLevel, setCrowdLevel] = useState("");
  const [sortBy, setSortBy] = useState("top");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const areaArray = ["Aundh", "Baner Road", "Baner Roadside", "Baner Road Way", "Baner Street", "Baner", "Kharadi", "Wagholi", "Bund Garden", "Balgandharva", "Deccan", "Camp", "Inox road", "Kalyani Nagar", "Koreagaon Park", "Magarpatta", "Deccancorner", "Buddhwar Peth", "Pheonix Mall", "Hinjewadi", "Balewadi", "Yerwada", "Hadapsar", "Airport Road", "Viman Nagar", "Hinjawadi", "Hinjawadi Road", "Hotelnilkamal", "Junabazar", "SB Road", "Swargate", "Karve Road", "Kondhwa", "Koregaonpark", "Magarpattabridge", "Nagar Road", "Nalstop Chowk", "Nibm Road", "Undri", "Paud Road"];

  const categoryData = {
    "Education & Youth": ["College", "Education", "Youth", "Job Opportunities", "Kids"],
    "Health & Wellness": ["Health", "Wellness", "Fitness", "Beauty", "Cosmetics"],
    "Technology & Digital": ["Technology", "Digital", "Software", "Gaming", "Electronics"],
    "Marketing & Advertising": ["Advertising", "Event", "Discount", "Shopping"],
    "Retail & Fashion": ["Retail", "Fashion", "Luxury", "Home Decor"],
    "Travel & Hospitality": ["Travel", "Tourism", "Food", "Outdoor"],
    "Entertainment & Culture": ["Entertainment", "Music", "Cinema Halls"],
    "Business & Finance": ["Business", "Finance", "Investment"],
    "Real Estate & Infrastructure": ["Real Estate", "Construction"],
    "Community & Non-Profits": ["Community", "Charity", "Non-Profit"],
    "Automotive & Vehicles": ["Automotive"],
    "Environment & Sustainability": ["Environmental", "Sustainability"],
    "Places & Locations": ["Airport", "Bus Station", "Market Area", "Stadium"],
    "Pet & Animals": ["Pet Care", "Animals"]
  };

  const renderCheckbox = (label) => (
    <label key={label}>
      <input
        type="checkbox"
        value={label}
        checked={selectedCategories.includes(label)}
        onChange={handleCategoryChange}
      />
      {label}
    </label>
  );

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    setSelectedCategories((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };

  const handleClearSelection = () => {
    setSelectedLocation("");
    setSearchTerm("");
    setIsDropdownOpen(false);
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setSearchTerm(location);
    setIsDropdownOpen(false);
  };

  const handleLabelClick = (label) => {
    setSelectedCategories((prev) =>
      prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]
    );
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

  useEffect(() => {
    const fetchHoardings = async () => {
      try {
        const q = query(collection(db, "AdSpace_Data"), where("AdSpace_Type", "==", "Hoarding"));
        const querySnapshot = await getDocs(q);
        const allHoardings = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));

        let filtered = allHoardings;

        if (selectedLocation.trim()) {
          filtered = filtered.filter((hoarding) =>
            hoarding.Location?.toLowerCase().includes(selectedLocation.toLowerCase())
          );
        }

        if (selectedCategories.length > 0) {
          filtered = filtered.filter((hoarding) => {
            const tags = hoarding.Tags?.split(",").map(t => t.trim().toLowerCase()) || [];
            return selectedCategories.some(cat => tags.includes(cat.toLowerCase()));
          });
        }

        if (crowdLevel !== "") {
          filtered = filtered.filter((hoarding) =>
            hoarding.CrowdLevel?.toLowerCase() === crowdLevel.toLowerCase()
          );
        }

        if (sortBy === "price-low") {
          filtered.sort((a, b) => (a.Starting_Rate || 0) - (b.Starting_Rate || 0));
        } else if (sortBy === "price-high") {
          filtered.sort((a, b) => (b.Starting_Rate || 0) - (a.Starting_Rate || 0));
        }

        setHoardings(filtered);
      } catch (err) {
        console.error("Error fetching hoardings:", err);
      }
    };

    fetchHoardings();
  }, [selectedLocation, selectedCategories, crowdLevel, sortBy]);

  const filteredLocations = areaArray.filter((location) =>
    location.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                  <button className="clear-icon" onClick={handleClearSelection}>✖</button>
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
  <div className="filter-group">
  <h3 className="filter-group-title">CATEGORY</h3>
  <div className="checkbox-container">
    {Object.entries(categoryData).map(([group, labels]) => (
      <details key={group}>
        <summary>{group}</summary>
        <div className="label-list">
          {labels.map((label) => (
            <button
              key={label}
              className={`label-button ${selectedCategories.includes(label) ? 'active' : ''}`}
              onClick={() => handleLabelClick(label)}
            >
              {label}
            </button>

          ))}
        </div>
      </details>
    ))}
  </div>
</div>

        </aside>

        <div className="content-area">
          <div className="content-header">
            <div className="breadcrumb">
              <a href="/">Home</a> <span>→</span>
              <Link to="/browse-hoarding" style={{ color: "black" }}>BillBoard</Link>
            </div>
          </div>

          <div className="header-controls">
            <div className="select-wrapper">
              <select className="select" value={crowdLevel} onChange={(e) => setCrowdLevel(e.target.value)}>
                <option value="">Crowd Level</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div className="select-wrapper">
              <select className="select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="top">Price</option>
                <option value="price-low">Low to High</option>
                <option value="price-high">High to Low</option>
              </select>
            </div>
          </div>

          <h1 className="page-title">Book BillBoard Ads Online At Lowest Rates</h1>

          <div className="hoarding-grid">
            {hoardings.length === 0 ? (
              <p style={{ marginTop: "20px" }}>No hoardings available for this location.</p>
            ) : (
              hoardings.map((hoarding) => (
                <Link
                  key={hoarding.id}
                  to={`/details/${hoarding.AdSpace_id}`}
                  className="hoarding-card-link"
                >
                  <div className="hoarding-card">
                    <div className="hoarding-image">
                      <img src={hoarding.ImageURL || "/placeholder.svg"} alt={hoarding.Area} />
                    </div>
                    <h3 className="hoarding-title">{hoarding.Area}</h3>
                    <p className="hoarding-language">{hoarding.Location}</p>
                    <div className="hoarding-stats">
                      <div className="stat-1">
                        <img src="images/reader.png" alt="readers" />
                        <span>{hoarding.CrowdLevel || "N/A"}</span>
                      </div>
                      <div className="stat-2">
                        <img src="images/saletag.png" alt="sale tag" />
                        <span>₹{hoarding.Starting_Rate || "N/A"} Min Spend</span>
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

export default BrowseHoarding;
