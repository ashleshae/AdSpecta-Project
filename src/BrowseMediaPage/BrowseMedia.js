import { useState } from "react"
import "./BrowseMedia.css"
import React from "react"

const BrowseMedia = () => {
  const [targetAudience, setTargetAudience] = useState("")
  const [sortBy, setSortBy] = useState("top")

  const newspapers = [
    {
      id: 1,
      title: "Times Of India, Mumbai, English",
      language: "English",
      readers: "750000",
      minSpend: "₹1,01,520",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-03%20161751-3euvESQVfuJfZ8qeOkM2RcusJ7E69Z.png",
    },
    {
      id: 2,
      title: "Times Of India, Bangalore, English",
      language: "English",
      readers: "366465",
      minSpend: "₹66,420",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-03%20161751-3euvESQVfuJfZ8qeOkM2RcusJ7E69Z.png",
    },
    {
      id: 3,
      title: "Times Of India, Delhi, English",
      language: "English",
      readers: "594773",
      minSpend: "₹74,160",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-03%20161751-3euvESQVfuJfZ8qeOkM2RcusJ7E69Z.png",
    },
    {
      id: 4,
      title: "Hindustan Times, Delhi, English",
      language: "English",
      readers: "400000",
      minSpend: "₹85,000",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-03%20161751-3euvESQVfuJfZ8qeOkM2RcusJ7E69Z.png",
    },
  ]

  return (
    <div>
      <header className="header">
        <div className="header-content">
          <div className="logo-section">
            <button className="menu-button">
              <i className="fas fa-bars"></i>
            </button>
            <a href="/" className="logo">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-03%20161751-3euvESQVfuJfZ8qeOkM2RcusJ7E69Z.png"
                alt="The Media Ant"
              />
              <span>THE MEDIA ANT</span>
            </a>
          </div>

          <div className="search-bar">
            <input type="text" placeholder="Search Channel, Media" />
            <span className="search-icon">🔍</span>
          </div>

          <div className="header-buttons">
            <button className="header-button">Contact Us</button>
            <button className="header-button">Login</button>
            <button className="header-button">Your Bag</button>
          </div>
        </div>
      </header>

      <nav className="nav-bar">
        <div className="nav-content">
          <a href="#" className="nav-link">
            Cinema
          </a>
          <a href="#" className="nav-link">
            Magazine
          </a>
          <a href="#" className="nav-link">
            Influencer
          </a>
          <a href="#" className="nav-link active">
            Newspaper
          </a>
          <a href="#" className="nav-link">
            Digital
          </a>
          <a href="#" className="nav-link">
            BTL
          </a>
          <a href="#" className="nav-link">
            Outdoor
          </a>
          <a href="#" className="nav-link">
            Radio
          </a>
          <a href="#" className="nav-link">
            Television
          </a>
        </div>
      </nav>

      <main className="main-content">
        <aside className="filters">
          <h2 className="filter-title">Filters</h2>

          <div className="filter-group">
            <h3 className="filter-group-title">LOCATION</h3>
            <input type="text" placeholder="Type to search" className="select" />
          </div>

          <div className="filter-group">
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
          </div>

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
              <a href="/">Home</a>
              <span>›</span>
              <span>Newspaper</span>
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

          <h1 className="page-title">Book Newspaper Ads Online At Lowest Rates</h1>

          <div className="newspaper-grid">
            {newspapers.map((newspaper) => (
              <div key={newspaper.id} className="newspaper-card">
                <div className="newspaper-image">
                  <img src={newspaper.image || "/placeholder.svg"} alt={newspaper.title} />
                </div>
                <h3 className="newspaper-title">{newspaper.title}</h3>
                <p className="newspaper-language">{newspaper.language}</p>
                <div className="newspaper-stats">
                  <div className="stat">
                    <span>👥</span>
                    <span>{newspaper.readers}</span>
                  </div>
                  <div className="stat">
                    <span>💬</span>
                    <span>{newspaper.minSpend} Min Spend</span>
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


