import { useState, useRef, useEffect } from "react";
import "./BrowseMedia.css";
import React from "react";
import Header from "../HomePage/components/ui/Header";
import Navigation from "../HomePage/components/ui/Navigation";

const metroStations = [
  "PCMC", "Sant Tukaram Nagar", "Nashik Phata", "Kasarwadi", "Phugewadi", "Dapodi", "Bopodi", "Khadki",
  "Range Hills", "Shivajinagar", "Civil Court", "Budhwar Peth", "Mandai", "Swargate",
  "Vanaz", "Anand Nagar", "Ideal Colony", "Nal Stop", "Garware College", "Deccan Gymkhana",
  "Chhatrapati Sambhaji Udyan", "PMC", "Mangalwar Peth", "Pune Railway Station", "Ruby Hall Clinic",
  "Bund Garden", "Yerwada", "Kalyani Nagar", "Ramwadi"
];

const BrowseMetro = () => {
  const [sortBy, setSortBy] = useState("top")
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const filteredStations = metroStations.filter(station => 
    station.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLocationSelect = (station) => {
    setSelectedLocation(station);
    setSearchTerm(station);
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

  const metroAds = [
    {
      id: 1,
      title: "Interior Metro Branding in Pune",
      media: "Metro Interior Ads",
      viewers: "300000",
      minSpend: "₹50,000",
      image: "/images/interior_metro.jpg",
    },
    {
      id: 2,
      title: "Exterior Metro Branding in Pune",
      media: "Metro Exterior Ads",
      viewers: "400000",
      minSpend: "₹75,000",
      image: "/images/exterior_metro.jpg",
    },
    {
      id: 3,
      title: "Jingle in Pune Metro",
      media: "Audio Ad in Metro",
      viewers: "500000",
      minSpend: "₹90,000",
      image: "/images/jingle_metro.jpg",
    },
    {
      id: 4,
      title: "PCMC Metro Station Platform Ads",
      media: "Platform Advertising",
      viewers: "350000",
      minSpend: "₹40,000",
      image: "/images/pcmc_platform.jpg",
    },
    {
      id: 5,
      title: "Shivajinagar Metro Station Platform Ads",
      media: "Platform Advertising",
      viewers: "320000",
      minSpend: "₹42,000",
      image: "/images/shivajinagar_platform.jpg",
    },
    {
      id: 6,
      title: "Pune Railway Station Metro Platform Ads",
      media: "Platform Advertising",
      viewers: "450000",
      minSpend: "₹55,000",
      image: "/images/pune_station_platform.jpg",
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
            <h3 className="filter-group-title">METRO STATION</h3>
            <div className="dropdown-container" ref={dropdownRef}>
              <div className="input-wrapper">
                <input 
                  type="text" 
                  className="select" 
                  placeholder="Search Metro Station" 
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
                  {filteredStations.map((station) => (
                    <li key={station} onClick={() => handleLocationSelect(station)}>
                      {station}
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
              <span>Metro Branding</span>
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

          <h1 className="page-title">Book Metro Ads Online At Best Rates</h1>

          <div className="hoarding-grid">
            {metroAds.map((ad) => (
              <div key={ad.id} className="hoarding-card">
                <div className="hoarding-image">
                  <img src={ad.image || "/placeholder.svg"} alt={ad.title} />
                </div>
                <h3 className="hoarding-title">{ad.title}</h3>
                <p className="hoarding-language">{ad.media}</p>
                <div className="hoarding-stats">
                  <div className="stat-1">
                    <img src="images/reader.png" alt="viewers"/>
                    <span>{ad.viewers}</span>
                  </div>
                  <div className="stat-2">
                    <img src="images/saletag.png" alt="sale tag"/>
                    <span>{ad.minSpend} Min Spend</span>
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

export default BrowseMetro;
