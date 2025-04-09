

import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./homepage.css";

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activePath, setActivePath] = useState(location.pathname);

  const menuItems = [
    { name: "Metro", path: "/browse-metro" },
    { name: "BillBoard", path: "/browse-hoarding" },
    { name: "Rickshaws", path: "/browse-auto" },
    // { name: "Bus", path: "/browse-bus" },
    { name: "Roadside Walls", path: "/browse-roadside-walls" },
    { name: "Bus Shelter", path: "/browse-bus-shelter" },
  ];

  useEffect(() => {
    setActivePath(location.pathname);
  }, [location.pathname]);

  const handleClick = (path) => {
    if (location.pathname === path) {
      navigate("/refresh", { replace: true });
      setTimeout(() => navigate(path), 0);
    } else {
      navigate(path);
    }
  };

  return (
    <nav className="navbar">
      {menuItems.map((item, index) => (
        <span
          key={index}
          className={`channel ${activePath === item.path ? "active-link" : ""}`}
          onClick={() => handleClick(item.path)}
        >
          {item.name}
        </span>
      ))}
    </nav>
  );
};

export default Navigation;
