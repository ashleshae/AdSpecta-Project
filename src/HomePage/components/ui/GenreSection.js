import React from "react";
import { Link } from "react-router-dom";
import "./homepage.css"; // Import styles

const GenreSection = () => {
  const genres = [
    { name: "Metro", image: "images/metro.png" },
    { name: "BillBoard", image: "images/billboard.png" },
    { name: "Rickshaws", image: "images/rickshaw.png" },
    { name: "Bus", image: "images/bus.png" },
    { name: "Roadside Walls", image: "images/roadsideWall.png" },
    { name: "Bus Shelter", image: "images/busShelter.png" },
  ];

  return (
    <div className="white-section">
      <h2 className="section-title">Browse Media by Genre</h2>
      <div className="genre-grid">
      <Link to="/browse-media"></Link>
        {genres.map((genre, index) => (
          <div className="genre-card" key={index}>
            <img src={genre.image} alt={genre.name} />
            <p>{genre.name}</p>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default GenreSection;