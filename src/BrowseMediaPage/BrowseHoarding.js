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

const BrowseMedia = () => {
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
            title: "Hoarding,Airport Road-Pune",
            language: "Hoarding",
            readers: "750000",
            minSpend: "₹1,01,520",
            image:
              "https://docs.google.com/spreadsheets/d/1kLNg0631V5LqVLx7NgUb2UXbI2SyHuy1y5vblBgEbWo/edit?gid=551119373#gid=551119373&range=K2",
          },
          {
            id: 2,
            title: "Hoarding,Alka Chowk-Pune",
            language: "Hoarding",
            readers: "366465",
            minSpend: "₹66,420",
            image:
              "https://docs.google.com/spreadsheets/d/1kLNg0631V5LqVLx7NgUb2UXbI2SyHuy1y5vblBgEbWo/edit?gid=551119373#gid=551119373&range=K2",
          },
          {
            id: 3,
            title: "Hoarding,Aundh-Pune",
            language: "Hoarding",
            readers: "594773",
            minSpend: "₹74,160",
            image:
              "https://docs.google.com/spreadsheets/d/1kLNg0631V5LqVLx7NgUb2UXbI2SyHuy1y5vblBgEbWo/edit?gid=551119373#gid=551119373&range=K2",
          },
          {
            id: 4,
            title: "Hoarding,Baner Road-Pune",
            language: "Hoarding",
            readers: "400000",
            minSpend: "₹85,000",
            image:
              "https://docs.google.com/spreadsheets/d/1kLNg0631V5LqVLx7NgUb2UXbI2SyHuy1y5vblBgEbWo/edit?gid=551119373#gid=551119373&range=K2",
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
              <span>BillBoard</span>
            </div>
          </div>
          
          <h1 className="page-title">Book BillBoard Ads Online At Lowest Rates</h1>

          <div className="hoarding-grid">
            {hoardings.map((hoarding) => (
              <div key={hoarding.id} className="hoarding-card">
                <div className="hoarding-image">
                  <img src={hoarding.image || "/placeholder.svg"} alt={hoarding.title} />
                </div>
                <h3 className="hoarding-title">{hoarding.title}</h3>
                <p className="hoarding-language">{hoarding.language}</p>
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
    </div>
  );
};

export default BrowseMedia;