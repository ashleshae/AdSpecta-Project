import { useState, useRef, useEffect } from "react";
import "./BrowseMedia.css";
import React from "react";
import Header from "../HomePage/components/ui/Header";
import Navigation from "../HomePage/components/ui/Navigation";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";

const BrowseRoadsideWalls = () => {
  const [wallAds, setWallAds] = useState([]);
  const [crowdLevel, setCrowdLevel] = useState("");
  const [sortBy, setSortBy] = useState("top");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const areaArray = ["Baner Road", "Aundh", "Kothrud", "Shivajinagar", "FC Road", "Hadapsar", "Swargate", "Camp", "Viman Nagar", "Karve Nagar", "Koregaon Park", "Pimple Saudagar", "Wakad", "Katraj", "Magarpatta", "Kharadi", "Bavdhan", "Sinhagad Road", "Yerawada"];


  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    setSelectedCategories((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };

  useEffect(() => {
    const fetchWallAds = async () => {
      try {
        const q = query(collection(db, "AdSpace_Data"), where("AdSpace_Type", "==", "Wall Ads"));
        const querySnapshot = await getDocs(q);

        const allWallAds = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        let filtered = allWallAds;

        if (selectedLocation.trim() !== "") {
          const lowerSelected = selectedLocation.trim().toLowerCase();
          filtered = filtered.filter((ad) =>
            ad.Location?.toLowerCase().includes(lowerSelected)
          );
        }

        if (selectedCategories.length > 0) {
          filtered = filtered.filter((ad) => {
            const tags = ad.Tags?.split(",").map(tag => tag.trim().toLowerCase()) || [];
            return selectedCategories.some(cat => tags.includes(cat.toLowerCase()));
          });
        }

        if (crowdLevel !== "") {
          filtered = filtered.filter((ad) =>
            ad["Crowd level"]?.toLowerCase() === crowdLevel.toLowerCase()
          );
        }

        if (sortBy === "price-low") {
          filtered.sort((a, b) => (a.Starting_Rate || 0) - (b.Starting_Rate || 0));
        } else if (sortBy === "price-high") {
          filtered.sort((a, b) => (b.Starting_Rate || 0) - (a.Starting_Rate || 0));
        }

        setWallAds(filtered);
      } catch (error) {
        console.error("Error fetching wall ads:", error);
      }
    };

    fetchWallAds();
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
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

  const categoryData = {
    "Tech & Academic": [
      "IT Professionals",
      "Students",
      "Young Professionals"
    ],
    "Family & Residential": [
      "Families",
      "Residents",
      "Established Residents"
    ],
    "Shoppers & Lifestyle": [
      "Shoppers",
    ],
    "Business & Travel": [
      "Business Travelers",
      "Tourists",
      "Commuters"
    ]
  };


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
                  {labels.map(renderCheckbox)}
                </details>
              ))}
            </div>
          </div>
        </aside>

        <div className="content-area">
          <div className="content-header">
            <div className="breadcrumb">
              <a href="/">Home</a>
              <span>→</span>
              <Link to="/browse-wallads" onClick={() => window.location.reload()} style={{ color: "black", cursor: "pointer" }}>
                RoadSide Wall Ads
              </Link>
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

          <h1 className="page-title">Book Wall Ads Online At Lowest Rates</h1>

          <div className="hoarding-grid">
            {wallAds.length === 0 ? (
              <p style={{ marginTop: "20px" }}>No wall ads available for this location.</p>
            ) : (
              wallAds.map((ad) => (
                <Link
                  key={ad.AdSpace_id}
                  to={`/details/${ad.AdSpace_id}`}
                  className="hoarding-card-link"
                >
                <div key={ad.id} className="hoarding-card">
                  <div className="hoarding-image">
                    <img src={ad.image || "/placeholder.svg"} alt={ad.Area} />
                  </div>
                  <h3 className="hoarding-title">{ad.Location}</h3>
                  <p className="hoarding-language">{ad.Area}</p>
                  <div className="hoarding-stats">
                    <div className="stat-1">
                      <img src="images/reader.png" alt="readers" />
                      <span>{ad["Crowd level"] || "N/A"}</span>
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

export default BrowseRoadsideWalls;
