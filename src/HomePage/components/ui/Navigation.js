// import React from "react";
// import { Link } from "react-router-dom";
// import "./homepage.css"; // Import CSS file for styling

// const Navigation = () => {
//   return (
//     <nav className="navbar">
//       <Link to="/browse-media" className="channel">Metro</Link>
//       <Link to="/browse-media" className="channel">BillBoard</Link>
//       <Link to="/browse-media" className="channel">Rickshaws</Link>
//       <Link to="/browse-media" className="channel">Bus</Link>
//       <Link to="/browse-media" className="channel">Roadside Walls</Link>
//       <Link to="/browse-media" className="channel">Bus Shelter</Link>
//     </nav>  
//   );
// };

// export default Navigation;

import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./homepage.css";

const Navigation = () => {
  const location = useLocation();
  const menuItems = [
    { name: "Metro", path: "/browse-media/metro" },
    { name: "BillBoard", path: "/browse-media" },
    { name: "Rickshaws", path: "/browse-media/rickshaws" },
    { name: "Bus", path: "/browse-media/bus" },
    { name: "Roadside Walls", path: "/browse-media/roadside-walls" },
    { name: "Bus Shelter", path: "/browse-media/bus-shelter" },
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