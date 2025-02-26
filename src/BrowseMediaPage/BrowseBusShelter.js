import { useState, useRef, useEffect } from "react";
import "./BrowseMedia.css";
import React from "react";
import Header from "../HomePage/components/ui/Header";
import Navigation from "../HomePage/components/ui/Navigation";

const busStops = [
  "Swargate", "Shivajinagar", "Pune Station", "Kothrud Depot", "Hadapsar Gadital", "Deccan Gymkhana",
  "Viman Nagar", "Magarpatta City", "Baner Phata", "Aundh Gaon", "Pimple Saudagar", "Nigdi",
  "Hinjewadi Phase 1", "Hinjewadi Phase 2", "Hinjewadi Phase 3", "Katraj", "Warje Malwadi",
  "Kondhwa", "Bhosari", "Chinchwad", "FC Road", "JM Road", "Wanowrie", "NIBM Road"
];

const hoardings = [
  {
    id: 1,
    title: "Bus Shelter Branding in Swargate",
    media: "Bus Shelter Hoardings",
    viewers: "200000",
    minSpend: "₹30,000",
    image: "/images/swargate_shelter.jpg",
  },
  {
    id: 2,
    title: "Bus Shelter Branding in Shivajinagar",
    media: "Bus Shelter Hoardings",
    viewers: "250000",
    minSpend: "₹35,000",
    image: "/images/shivajinagar_shelter.jpg",
  },
  {
    id: 3,
    title: "Bus Shelter Branding in Pune Station",
    media: "Bus Shelter Hoardings",
    viewers: "300000",
    minSpend: "₹40,000",
    image: "/images/pune_station_shelter.jpg",
  },
];

const BrowseBusShelters = () => {
  const [targetAudience, setTargetAudience] = useState("")
  const [sortBy, setSortBy] = useState("top")
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const filteredBusStops = busStops.filter(stop =>
    stop.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLocationSelect = (stop) => {
    setSelectedLocation(stop);
    setSearchTerm(stop);
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

  return (
    <div>
      <Header />
      <Navigation />

      <main className="main-content">
        {/* Filters and Bus Shelter Branding Content */}
        <aside className="filters">
          <h2 className="filter-title">Filters</h2>

          <div className="filter-group">
            <h3 className="filter-group-title">BUS STOP</h3>
            <div className="dropdown-container" ref={dropdownRef}>
              <div className="input-wrapper">
                <input 
                  type="text" 
                  className="select" 
                  placeholder="Search Bus Stop" 
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
                  {filteredBusStops.map((stop) => (
                    <li key={stop} onClick={() => handleLocationSelect(stop)}>
                      {stop}
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
              <span>Bus Shelter Branding</span>
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

          <h1 className="page-title">Book Bus Shelter Ads Online At Best Rates</h1>
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

export default BrowseBusShelters;
