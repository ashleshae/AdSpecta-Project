// import React, { useState } from "react";
// import Sidebar from "./Sidebar";
// import HamburgerMenu from "./HamburgerMenu";
// import "./homepage.css";


// const Header = () => {
//   const [isSidebarOpen, setSidebarOpen] = useState(false);

//   const toggleSidebar = () => {
//     setSidebarOpen(!isSidebarOpen);
//   };

//   return (
//     <header>
//       <div className="hamburger-menu">
//         <HamburgerMenu toggleSidebar={toggleSidebar} />
//         <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
//         <div className="logo-section">
//             <button className="menu-button">
//               <i className="fas fa-bars"></i>
//             </button>
//             <a href="/" className="logo">
//               <span>AdSpecta</span>
//             </a>
//           </div>
//       </div>
//       <div className="search">
//         <input type="text" placeholder="Search Channel, Media" id="search-bar" />
//         <img src="images/search.png" alt="Search Icon" />
//       </div>
//       <div className="leftcorner">
//         <a href="#">Contact Us</a>
//         <div className="leftcorner">
//           <img src="images/login.png" alt="Login" className="icon" />
//           <a href="#">Login</a>
//         </div>
//         <div className="leftcorner">
//           <img src="images/cart.png" alt="Cart" className="icon" />
//           <a href="#">Your Bag</a>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;

import React, { useState } from "react";
import Sidebar from "./Sidebar";
import HamburgerMenu from "./HamburgerMenu";
import "./homepage.css";

const Header = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isLoginDropdownOpen, setLoginDropdownOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const toggleLoginDropdown = () => {
    setLoginDropdownOpen(!isLoginDropdownOpen);
  };

  return (
    <header>
      <div className="hamburger-menu">
        <HamburgerMenu toggleSidebar={toggleSidebar} />
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="logo-section">
          <button className="menu-button">
            <i className="fas fa-bars"></i>
          </button>
          <a href="/" className="logo">
            <span>AdSpecta</span>
          </a>
        </div>
      </div>

      <div className="search">
        <input type="text" placeholder="Search Channel, Media" id="search-bar" />
        <img src="images/search.png" alt="Search Icon" />
      </div>

      <div className="leftcorner">
        <a href="#">Contact Us</a>
        
        <div className="login-container">
          <div className="login-btn" onClick={toggleLoginDropdown}>
            <img src="images/login.png" alt="Login" className="icon" />
            <a href="#">Login</a>
          </div>

          {isLoginDropdownOpen && (
            <div className="login-dropdown">
              <button className="dropdown-btn">Login as Buyer</button>
              <button className="dropdown-btn">Login as Owner</button>
            </div>
          )}
        </div>

        <div className="leftcorner">
          <img src="images/cart.png" alt="Cart" className="icon" />
          <a href="#">Your Bag</a>
        </div>
      </div>
    </header>
  );
};

export default Header;
