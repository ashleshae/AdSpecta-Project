
import { useState, useRef, useEffect } from "react";
import "./BrowseMedia.css";
import React from "react";
import Header from "../HomePage/components/ui/Header";
import Navigation from "../HomePage/components/ui/Navigation";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
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
  
  const areaArray = [
    "Airport Road", "Alka Chowk", "Aundh", "Baner Road", "Baner Roadside", "Baner Road Way", "Baner Street",
    "Bhookum", "Bhugaon", "Bhugaon Road", "Bigbazzar Chowk", "Bishop School", "Bundgarden", "Campeast Street",
    "Campmg Road", "Cell Petrol Pump", "Chakan", "Dattawadi", "Daund Wakhari", "Deccancorner", "Deccant Junction",
    "Dhanukarcolony", "Expressway", "Fakrihills", "Fatimanagar", "Garware College", "Dhanukar Colony",
    "Ghotawade Road", "Gulmoharlawns", "Hande Wadi Road", "Handewadi", "Hinjawadi", "Hinjawadi Road", "Hotelnilkamal",
    "Junabazar", "Jyotihotel Chowk", "Kalyani Nagar", "Kalyaniforge", "Kalyanjewellers", "Kamshetgaon",
    "Kartrajkondhwa", "Karve Road", "Khadakwasla", "Kesnand Road", "Khadakwaslaentry", "Khandojibaba Chowk",
    "Khandojibaba Chowkup", "Khedshivapur", "Kinarahotel", "Koregaonpark", "Kothrud Road", "Kumthekar Road",
    "Kunjirwadi", "Kunjirwadi Chowk", "Kunthe Chowk", "Laxminarayan Chowk", "Laxmi Road", "Lohgaon Road",
    "Lonitollnaka", "Lullanagar", "Magarpattabridge", "Manjari Phata", "Marunje", "Marunje Road", "M College",
    "Mhatrebridge", "Moze College", "Mundhwa", "Nagar Road", "Nalstop Chowk", "Nandedphata", "Nibm Road", "Outgate",
    "Pancardclub", "Paud Road"
  ];

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    setSelectedCategories((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };

  useEffect(() => {
    const fetchHoardings = async () => {
      try {
        const q = query(collection(db, "AdSpace_Data"), where("AdSpace_Type", "==", "Hoarding"));
        const querySnapshot = await getDocs(q);

        const allHoardings = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        let filtered = allHoardings;

        if (selectedLocation.trim() !== "") {
          const lowerSelected = selectedLocation.trim().toLowerCase();
          filtered = filtered.filter((hoarding) =>
            hoarding.Location?.toLowerCase().includes(lowerSelected)
          );
        }

        if (selectedCategories.length > 0) {
          filtered = filtered.filter((hoarding) => {
            const tags = hoarding.Tags?.split(",").map(tag => tag.trim().toLowerCase()) || [];
            return selectedCategories.some(cat => tags.includes(cat.toLowerCase()));
          });
        }

        if (crowdLevel !== "") {
          filtered = filtered.filter((hoarding) =>
            hoarding["Crowd level"]?.toLowerCase() === crowdLevel.toLowerCase()
          );
        }

        if (sortBy === "price-low") {
          filtered.sort((a, b) => (a.Starting_Rate || 0) - (b.Starting_Rate || 0));
        } else if (sortBy === "price-high") {
          filtered.sort((a, b) => (b.Starting_Rate || 0) - (a.Starting_Rate || 0));
        }

        setHoardings(filtered);
      } catch (error) {
        console.error("Error fetching hoardings:", error);
      }
    };

    fetchHoardings();
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
        "Education & Youth": ["College", "Education", "Youth", "Job Opportunities", "Kids"],
        "Health & Wellness": [
          "Health", "Wellness", "Fitness", "Beauty and Wellness", "Health and Wellness", "Beauty",
          "Cosmetics", "Personal Care", "Lifestyle"
        ],
        "Technology & Digital": [
          "Technology", "Digital", "Software", "E-commerce", "Gaming", "Electronics",
          "Media", "Consumer Goods", "Social Media"
        ],
        "Marketing & Advertising": [
          "Advertising", "Event", "Discount", "Seasonal Deals", "Festive", "Holiday", "Shopping"
        ],
        "Retail & Fashion": [
          "Retail", "Fashion", "Luxury", "Design", "Furniture", "Home Decor"
        ],
        "Travel & Hospitality": [
          "Travel", "Tourism", "Hospitality", "Food", "Nature", "Outdoor"
        ],
        "Entertainment & Culture": [
          "Entertainment", "Music", "Art", "Culture", "Cultural", "Cinema Halls"
        ],
        "Business & Finance": [
          "Business", "Finance", "Investment", "Legal Services", "Law"
        ],
        "Real Estate & Infrastructure": [
          "Real Estate", "Construction"
        ],
        "Community & Non-Profits": [
          "Community", "Local Business", "Charity", "Non-Profit", "Social Impact"
        ],
        "Automotive & Vehicles": [
          "Automotive", "Automobile"
        ],
        "Environment & Sustainability": [
          "Environmental", "Sustainability", "Gardens"
        ],
        "Places & Locations": [
          "Tourist Area", "Airport", "Bus Station/Stop", "Metro Station", "Railway Station",
          "Stadium", "Market Area", "Road Side", "Food Malls", "Mall", "Hospital", "Crowded"
        ],
        "Pet & Animals": [
          "Pet Care", "Animals"
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
                <Link to="/browse-hoarding" onClick={() => window.location.reload()} style={{ cursor: "pointer" }}>
                  BillBoard
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
                  <option value="price-low"> Low to High</option>
                  <option value="price-high"> High to Low</option>
                </select>
              </div>
            </div>
  
            <h1 className="page-title">Book BillBoard Ads Online At Lowest Rates</h1>
  
            <div className="hoarding-grid">
              {hoardings.length === 0 ? (
                <p style={{ marginTop: "20px" }}>No hoardings available for this location.</p>
              ) : (
                hoardings.map((hoarding) => (
                  <div key={hoarding.id} className="hoarding-card">
                    <div className="hoarding-image">
                      <img src={hoarding.image || "/placeholder.svg"} alt={hoarding.Area} />
                    </div>
                    <h3 className="hoarding-title">{hoarding.Area}</h3>
                    <p className="hoarding-language">{hoarding.Location}</p>
                    <div className="hoarding-stats">
                      <div className="stat-1">
                        <img src="images/reader.png" alt="readers" />
                        <span>{hoarding["Crowd level"] || "N/A"}</span>
                      </div>
                      <div className="stat-2">
                        <img src="images/saletag.png" alt="sale tag" />
                        <span>₹{hoarding.Starting_Rate || "N/A"} Min Spend</span>
                      </div>
                    </div>
                  </div>
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
