import { useState, useRef, useEffect } from "react";
import "./BrowseMedia.css";
import React from "react";
import Header from "../HomePage/components/ui/Header";
import Navigation from "../HomePage/components/ui/Navigation";

const locations = [
  "Shivajinagar", "Hinjewadi", "Kothrud", "Baner", "Wakad", "Karvenagar", "Koregaon Park", "Viman Nagar", "Kharadi", "Magarpatta",
  "Hadapsar", "Swargate", "Camp", "Yerwada", "Bavdhan", "Undri", "Wagholi", "Saswad", "Pirangut", "Mohamadwadi"
];

const BrowseRoadsideWalls = () => {
  const [targetAudience, setTargetAudience] = useState("")
  const [sortBy, setSortBy] = useState("top")
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
    { id: 1, title: "Hoarding,FC Road-Pune", media: "Wall Branding", readers: "500000", minSpend: "₹45,000", image: "/images/wall1.jpg" },
    { id: 2, title: "Hoarding,Katraj-Pune", media: "Wall Branding", readers: "350000", minSpend: "₹38,000", image: "/images/wall2.jpg" },
    { id: 3, title: "Hoarding,Swargate-Pune", media: "Wall Branding", readers: "700000", minSpend: "₹55,000", image: "/images/wall3.jpg" },
    { id: 4, title: "Hoarding,Nal Stop-Pune", media: "Wall Branding", readers: "480000", minSpend: "₹42,000", image: "/images/wall4.jpg" },
    { id: 5, title: "Hoarding,MG Road-Pune", media: "Wall Branding", readers: "620000", minSpend: "₹48,000", image: "/images/wall5.jpg" },
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

          <div className="filter-group">
            <h3 className="filter-group-title">CATEGORY</h3>
            <div className="checkbox-group">
              <label className="checkbox-label"><input type="checkbox" /> College</label>
              <label className="checkbox-label"><input type="checkbox" /> Hospital</label>
              <label className="checkbox-label"><input type="checkbox" /> Mall</label>
              <label className="checkbox-label"><input type="checkbox" /> Road Side</label>
              <label className="checkbox-label"><input type="checkbox" /> Food Malls</label>
              <label className="checkbox-label"><input type="checkbox" /> Tourist area</label>
              <label className="checkbox-label"><input type="checkbox" /> Cinema Halls</label>
              <label className="checkbox-label"><input type="checkbox" /> Airport</label>
              <label className="checkbox-label"><input type="checkbox" /> Stadium</label>
              <label className="checkbox-label"><input type="checkbox" /> Gardens</label>
              <label className="checkbox-label"><input type="checkbox" /> Crowded</label>
              <label className="checkbox-label"><input type="checkbox" /> Market Area</label>
              <label className="checkbox-label"><input type="checkbox" /> Railway Station</label>
              <label className="checkbox-label"><input type="checkbox" /> Bus Station/Stop</label>
              <label className="checkbox-label"><input type="checkbox" /> Metro Station</label>
            </div>
          </div>
        </aside>

        <div className="content-area">
          <div className="content-header">
            <div className="breadcrumb">
              <a href="/">Home</a>
              <span>›</span>
              <span>Roadside Wall Ads</span>
            </div>
          </div>

          <div className="header-controls">
            <div className="select-wrapper">
              <select className="select" value={targetAudience} onChange={(e) => setTargetAudience(e.target.value)}>
                <option value="">TARGET AUDIENCE</option>
                <option value="youth">Youth</option>
                <option value="adults">Adults</option>
                <option value="seniors">Seniors</option>
              </select> 
            </div>

            <div className="select-wrapper">
              <select className="select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="top">Top Searched</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
            </div>
          
          <h1 className="page-title">Book Roadside Wall Ads Online At Lowest Rates</h1>

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
                    <img src="images/reader.png" alt="readers"/>
                    <span>{hoarding.readers}</span>
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

export default BrowseRoadsideWalls;
