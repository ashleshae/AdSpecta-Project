
import { useState, useRef, useEffect } from "react";
import "./BrowseMedia.css";
import React from "react";
import Header from "../HomePage/components/ui/Header";
import Navigation from "../HomePage/components/ui/Navigation";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";

const BrowseAuto = () => {
  const [autos, setAutos] = useState([]);
  const [crowdLevel, setCrowdLevel] = useState("");
  const [sortBy, setSortBy] = useState("top");
  const [searchAreaTerm, setSearchAreaTerm] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const areaArray = ["Swargate", "Shivajinagar", "Pune Railway Station", "Camp Area (MG Road)", "Kothrud Depot", "Deccan Gymkhana", "Hinjawadi Phase 1", "Pimpri", "Katraj", "Aundh", "Wakad", "Karve Nagar", "Yerawada", "Chinchwad", "Nanded City", "Fursungi"];


  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    setSelectedCategories((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };

  useEffect(() => {
    const fetchAutoAds = async () => {
      try {
        const q = query(collection(db, "AdSpace_Data"), where("AdSpace_Type", "==", "Auto"));
        const querySnapshot = await getDocs(q);

        const allAds = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        let filtered = allAds;

        if (selectedArea.trim() !== "") {
          const lowerSelected = selectedArea.trim().toLowerCase();
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

        setAutos(filtered);
      } catch (error) {
        console.error("Error fetching auto ads:", error);
      }
    };

    fetchAutoAds();
  }, [selectedArea, selectedCategories, crowdLevel, sortBy]);

  const filteredAreas = areaArray.filter((area) =>
    area.toLowerCase().includes(searchAreaTerm.toLowerCase())
  );

  const handleAreaSelect = (area) => {
    setSelectedArea(area);
    setSearchAreaTerm(area);
    setIsDropdownOpen(false);
  };

  const handleClearAreaSelection = () => {
    setSelectedArea("");
    setSearchAreaTerm("");
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
        <aside className="filters">
          <h2 className="filter-title">Filters</h2>
          <div className="filter-group">
            <h3 className="filter-group-title">AREA</h3>
            <div className="dropdown-container" ref={dropdownRef}>
              <div className="input-wrapper">
                <input
                  type="text"
                  className="select"
                  placeholder="Search Area"
                  value={searchAreaTerm}
                  onChange={(e) => {
                    setSearchAreaTerm(e.target.value);
                    setIsDropdownOpen(true);
                  }}
                  onFocus={() => setIsDropdownOpen(true)}
                />
                {selectedArea && (
                  <button className="clear-icon" onClick={handleClearAreaSelection}>✖</button>
                )}
              </div>
              {isDropdownOpen && (
                <ul className="dropdown-list">
                  {filteredAreas.map((area) => (
                    <li key={area} onClick={() => handleAreaSelect(area)} className="dropdown-item">
                      {area}
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
              <Link to="/browse-auto" onClick={() => window.location.reload()} style={{ color: "black", cursor: "pointer" }}>Auto Rickshaws Ads</Link>
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

          <h1 className="page-title">Book Auto Ads Online At Best Rates</h1>

          <div className="hoarding-grid">
            {autos.length === 0 ? (
              <p style={{ marginTop: "20px" }}>No Auto Ads available for this area.</p>
            ) : (
              autos.map((ad) => (
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
                      <img src="/images/reader.png" alt="crowd" />
                      <span>{ad["Crowd level"] || "N/A"}</span>
                    </div>
                    <div className="stat-2">
                      <img src="/images/saletag.png" alt="rate" />
                      <span>₹{ad.Starting_Rate || "N/A"} / Vehicle</span>
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

export default BrowseAuto;
