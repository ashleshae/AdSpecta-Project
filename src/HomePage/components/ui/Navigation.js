import React from "react";
import { Link } from "react-router-dom";
import "./homepage.css"; // Import CSS file for styling

const Navigation = () => {
  return (
    <nav className="navbar">
      <Link to="/browse-media" className="channel">Metro</Link>
      <Link to="/browse-media" className="channel">BillBoard</Link>
      <Link to="/browse-media" className="channel">Rickshaws</Link>
      <Link to="/browse-media" className="channel">Bus</Link>
      <Link to="/browse-media" className="channel">Roadside Walls</Link>
      <Link to="/browse-media" className="channel">Bus Shelter</Link>
    </nav>  
  );
};

export default Navigation;