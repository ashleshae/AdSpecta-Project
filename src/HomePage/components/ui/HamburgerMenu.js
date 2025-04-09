
import React from "react";
import { Menu } from "lucide-react";

const HamburgerMenu = ({ toggleSidebar }) => {
  return (
    <div className="hamburger-menu" onClick={toggleSidebar}>
      <Menu size={25} className="icon" />
    </div>
  );
};

export default HamburgerMenu;
