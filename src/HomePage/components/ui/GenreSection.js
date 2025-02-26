import React from "react";
import { Link } from "react-router-dom";
import "./homepage.css"; 

const GenreSection = () => {
  const genres = [
    { name: "Metro", image: "images/metro.png", path: "/browse-metro" },
    { name: "BillBoard", image: "images/billboard.png", path: "/browse-hoarding" },
    { name: "Rickshaws", image: "images/rickshaw.png", path: "/browse-auto" },
    { name: "Bus", image: "images/bus.png", path: "/browse-media/bus" },
    { name: "Roadside Walls", image: "images/roadsideWall.png", path: "/browse-media/roadside-walls" },
    { name: "Bus Shelter", image: "images/busShelter.png", path: "/browse-bus-shelter" },
  ];

  return (
    <div className="white-section">
      <h2 className="section-title">Browse Media by Genre</h2>
      <div className="genre-grid">
        {genres.map((genre, index) => (
          <Link to={genre.path} key={index} className="genre-card">
            <img src={genre.image} alt={genre.name} />
            <p>{genre.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default GenreSection;
