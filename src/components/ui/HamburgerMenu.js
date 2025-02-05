// HamburgerMenu.js
import React from "react";

const HamburgerMenu = ({ toggleSidebar }) => {
  return (
    <div className="hamburger-menu" onClick={toggleSidebar}>
      <div>
        <img src="images/menuIcon.png" alt="Menu" width="25" height="25" />
      </div>
      <h1>AdSpecta</h1>
    </div>
  );
};

export default HamburgerMenu;