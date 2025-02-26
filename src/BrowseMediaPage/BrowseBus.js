import { useState, useRef, useEffect } from "react";
import "./BrowseMedia.css";
import React from "react";
import Header from "../HomePage/components/ui/Header";
import Navigation from "../HomePage/components/ui/Navigation";

const locations = [
  "Shivajinagar", "Hinjewadi", "Kothrud", "Baner", "Wakad", "Karvenagar", "Koregaon Park", "Viman Nagar", "Kharadi", "Magarpatta",
  "Hadapsar", "Swargate", "Camp", "Yerwada", "Bavdhan", "Undri", "Wagholi", "Saswad", "Pirangut", "Mohamadwadi", "Lohegaon",
  "Talegaon", "Kirkatwadi", "Bhosale Nagar", "Mamurdi", "Charoli", "Nandoshi", "Manjari", "Uruli Kanchan"
];

const BrowseBusBranding = () => {
  const [sortBy, setSortBy] = useState("top");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const filteredLocations = locations.filter(location => 
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

  const hoardings = [
    {
      id: 1,
      title: "AC Bus, Shivajinagar",
      media: "AC Bus",
      viewers: "300000",
      minSpend: "₹50,000",
      image: "/images/bus_ac_shivajinagar.jpg",
    },
    {
      id: 2,
      title: "Non-AC Bus, Kothrud",
      media: "Non-AC Bus",
      viewers: "250000",
      minSpend: "₹40,000",
      image: "/images/bus_nonac_kothrud.jpg",
    },
    {
      id: 3,
      title: "AC Bus, Baner",
      media: "AC Bus",
      viewers: "280000",
      minSpend: "₹45,000",
      image: "/images/bus_ac_baner.jpg",
    },
  ];

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
                    <li key={location} onClick={() => handleLocationSelect(location)}>
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
              <span>›</span>
              <span>Bus Branding</span>
            </div>
          </div>

          <div className="header-controls">
            <div className="select-wrapper">
              <select className="select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="top">Top Searched</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
            </div>
            <h1 className="page-title">Book Bus Ads Online At Best Rates</h1>
          <div className="hoarding-grid">
            {hoardings.map((hoarding) => (
              <div key={hoarding.id} className="hoarding-card">
                <div className="hoarding-image">
                  <img src={hoarding.image || "/placeholder.svg"} alt={hoarding.title} />
                </div>
                <h3 className="hoarding-title">{hoarding.title}</h3>
                <p className="hoarding-language">{hoarding.media}</p>
                <div className="hoarding-stats">
                  <div className="stat-1">
                    <img src="images/reader.png" alt="viewers"/>
                    <span>{hoarding.viewers}</span>
                  </div>
                  <div className="stat-2">
                    <img src="images/saletag.png" alt="sale tag"/>
                    <span>{hoarding.minSpend} Min Spend</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <footer>
        <p>&copy; 2025 AdSpecta. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default BrowseBusBranding;
