import React from "react";
import "./homepage.css"; // Import CSS file for styling

const Navigation = () => {
  return (
    <nav className="navbar">
      <a href="#" className="channel">Metro</a>
      <a href="#" className="channel">BillBoard</a>
      <a href="#" className="channel">Rickshaws</a>
      <a href="#" className="channel">Bus</a>
      <a href="#" className="channel">Roadside Walls</a>
      <a href="#" className="channel">Bus Shelter</a>
    </nav>
  );
};

export default Navigation;