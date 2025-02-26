
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./homepage.css";

const Navigation = () => {
  const location = useLocation();
  const menuItems = [
    { name: "Metro", path: "/browse-metro" },
    { name: "BillBoard", path: "/browse-hoarding" },
    { name: "Rickshaws", path: "/browse-auto" },
    { name: "Bus", path: "/browse-bus" },
    { name: "Roadside Walls", path: "/browse-roadside-walls" },
    { name: "Bus Shelter", path: "/browse-bus-shelter" },
  ];

  const [activePath, setActivePath] = useState(location.pathname);

  useEffect(() => {
    setActivePath(location.pathname);
  }, [location.pathname]); // Update active path on route change

  return (
    <nav className="navbar">
      {menuItems.map((item, index) => (
        <Link
          key={index}
          to={item.path}
          className={`channel ${activePath === item.path ? "active-link" : ""}`}
          onClick={() => setActivePath(item.path)} // Update active state only on click
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
};

export default Navigation;