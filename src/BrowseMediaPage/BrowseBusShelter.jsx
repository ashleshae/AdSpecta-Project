import { useState, useRef, useEffect } from "react";
import "./BrowseMedia.css";
import React from "react";
import Header from "../HomePage/components/ui/Header.jsx";
import Navigation from "../HomePage/components/ui/Navigation.jsx";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase.js";
import { Link } from "react-router-dom";

const BrowseBusShelter = () => {
  const [busShelters, setBusShelters] = useState([]);
  const [crowdLevel, setCrowdLevel] = useState("");
  const [sortBy, setSortBy] = useState("top");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const areaArray = [
    "Viman Nagar",
    "Koregaon Park",
    "Baner Road",
    "Camp Road",
    "Budhwar Peth",
    "Kharadi - Hadapsar",
    "Viman Naagr",
    "Hadapsar",
    "Baner-Balewadi Rd.",
    "Viman Nagar Road",
    "Nagar Road",
    "R.M.D. College",
    "Kalyani Nagar",
    "Pune-Station Road.",
    "Shivaji Nagar",
    "Khondwa",
    "Karve Nagar",
  ];

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    setSelectedCategories((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };

  useEffect(() => {
    const fetchBusShelters = async () => {
      try {
        const q = query(
          collection(db, "AdSpace_Data"),
          where("AdSpace_Type", "==", "Bus Shelter")
        );
        const querySnapshot = await getDocs(q);

        const allBusShelters = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        let filtered = allBusShelters;

        if (selectedLocation.trim() !== "") {
          const lowerSelected = selectedLocation.trim().toLowerCase();
          filtered = filtered.filter((item) =>
            item.Location?.toLowerCase().includes(lowerSelected)
          );
        }

        if (selectedCategories.length > 0) {
          filtered = filtered.filter((item) => {
            const tags =
              item.Tags?.split(",").map((tag) => tag.trim().toLowerCase()) ||
              [];
            return selectedCategories.some((cat) =>
              tags.includes(cat.toLowerCase())
            );
          });
        }

        if (crowdLevel !== "") {
          filtered = filtered.filter(
            (item) =>
              item["CrowdLevel"]?.toLowerCase() === crowdLevel.toLowerCase()
          );
        }

        if (sortBy === "price-low") {
          filtered.sort(
            (a, b) => (a.Starting_Rate || 0) - (b.Starting_Rate || 0)
          );
        } else if (sortBy === "price-high") {
          filtered.sort(
            (a, b) => (b.Starting_Rate || 0) - (a.Starting_Rate || 0)
          );
        }

        setBusShelters(filtered);
      } catch (error) {
        console.error("Error fetching bus shelters:", error);
      }
    };

    fetchBusShelters();
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

  
  const handleLabelClick = (label) => {
    setSelectedCategories((prev) =>
      prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]
    );
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

  const categoryData = {
    "Education & Youth": [
      "College",
      "Education",
      "Youth",
      "Job Opportunities",
      "Kids",
    ],
    "Health & Wellness": [
      "Health",
      "Wellness",
      "Fitness",
      "Beauty and Wellness",
      "Health and Wellness",
      "Beauty",
      "Cosmetics",
      "Personal Care",
      "Lifestyle",
    ],
    "Technology & Digital": [
      "Technology",
      "Digital",
      "Software",
      "E-commerce",
      "Gaming",
      "Electronics",
      "Media",
      "Consumer Goods",
      "Social Media",
    ],
    "Marketing & Advertising": [
      "Advertising",
      "Event",
      "Discount",
      "Seasonal Deals",
      "Festive",
      "Holiday",
      "Shopping",
    ],
    "Retail & Fashion": [
      "Retail",
      "Fashion",
      "Luxury",
      "Design",
      "Furniture",
      "Home Decor",
    ],
    "Travel & Hospitality": [
      "Travel",
      "Tourism",
      "Hospitality",
      "Food",
      "Nature",
      "Outdoor",
    ],
    "Entertainment & Culture": [
      "Entertainment",
      "Music",
      "Art",
      "Culture",
      "Cultural",
      "Cinema Halls",
    ],
    "Business & Finance": [
      "Business",
      "Finance",
      "Investment",
      "Legal Services",
      "Law",
    ],
    "Real Estate & Infrastructure": ["Real Estate", "Construction"],
    "Community & Non-Profits": [
      "Community",
      "Local Business",
      "Charity",
      "Non-Profit",
      "Social Impact",
    ],
    "Automotive & Vehicles": ["Automotive", "Automobile"],
    "Environment & Sustainability": [
      "Environmental",
      "Sustainability",
      "Gardens",
    ],
    "Places & Locations": [
      "Tourist Area",
      "Airport",
      "Bus Station/Stop",
      "Metro Station",
      "Railway Station",
      "Stadium",
      "Market Area",
      "Road Side",
      "Food Malls",
      "Mall",
      "Hospital",
      "Crowded",
    ],
    "Pet & Animals": ["Pet Care", "Animals"],
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
              <a href="/">Home</a>
              <span>→</span>
              <Link
                to="/browse-bus-shelter"
                onClick={() => window.location.reload()}
                style={{ color: "black", cursor: "pointer" }}
              >
                Bus Shelter Ads
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

          <h1 className="page-title">
            Book Bus Shelter Ads Online At Lowest Rates
          </h1>

          <div className="hoarding-grid">
            {busShelters.length === 0 ? (
              <p style={{ marginTop: "20px" }}>
                No bus shelters available for this location.
              </p>
            ) : (
              busShelters.map((shelter) => (
                <Link
                  key={shelter.id}
                  to={`/details/${shelter.AdSpace_id}`}
                  className="hoarding-card-link"
                >
                  <div key={shelter.id} className="hoarding-card">
                    <div className="hoarding-image">
                      <img
                        src={shelter.ImageURL || "/placeholder.svg"}
                        alt={shelter.Area}
                      />
                    </div>
                    <h3 className="hoarding-title">{shelter.Area}</h3>
                    <p className="hoarding-language">{shelter.Location}</p>
                    <div className="hoarding-stats">
                      <div className="stat-1">
                        <img src="images/reader.png" alt="readers" />
                        <span>{shelter["CrowdLevel"] || "N/A"}</span>
                      </div>
                      <div className="stat-2">
                        <img src="images/saletag.png" alt="sale tag" />
                        <span>₹{shelter.Starting_Rate || "N/A"} Min Spend</span>
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

export default BrowseBusShelter;
