import { useState } from "react"
import "./BrowseMedia.css"
import React from "react"
import Header from "../HomePage/components/ui/Header";
import Navigation from "../HomePage/components/ui/Navigation";


const BrowseMedia = () => {
  const [targetAudience, setTargetAudience] = useState("")
  const [sortBy, setSortBy] = useState("top")

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
  ]

  return (
    <div>
      <Header />
      <Navigation/>

      <main className="main-content">
        <aside className="filters">
          <h2 className="filter-title">Filters</h2>

          <div className="filter-group">
            <h3 className="filter-group-title">LOCATION</h3>
            <input type="text" placeholder="Type to search" className="select" />
          </div>

          {/* <div className="filter-group">
            <h3 className="filter-group-title">AD OPTIONS</h3>
            <div className="checkbox-group">
              <label className="checkbox-label">
                <input type="checkbox" /> 12 Months Package
              </label>
              <label className="checkbox-label">
                <input type="checkbox" /> 3 Months Package
              </label>
              <label className="checkbox-label">
                <input type="checkbox" /> Advertorial
              </label>
              <label className="checkbox-label">
                <input type="checkbox" /> Agency Fee
              </label>
            </div>
          </div> */}

          <div className="filter-group">
            <h3 className="filter-group-title">CATEGORY</h3>
            <div className="checkbox-group">
              <label className="checkbox-label">
                <input type="checkbox" /> Agriculture And Farming
              </label>
              <label className="checkbox-label">
                <input type="checkbox" /> Automobile
              </label>
              <label className="checkbox-label">
                <input type="checkbox" /> Business
              </label>
              <label className="checkbox-label">
                <input type="checkbox" /> Education
              </label>
            </div>
          </div>
        </aside>

        <div className="content-area">
          <div className="content-header">
            <div className="breadcrumb">
              {/* <a href="/">Home</a>
              <span>›</span> */}
              <span>BillBoard</span>
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
                    <img src="images/reader.png"></img>
                    <span>{hoarding.readers}</span>
                  </div>
                  <div className="stat-2">
                    <img src="images/saletag.png"></img>
                    <span>{hoarding.minSpend} Min Spend</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

export default BrowseMedia


