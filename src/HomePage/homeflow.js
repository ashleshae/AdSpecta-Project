// Homeflow.js
import React from "react";
import "./homeflow.css";
import { useState } from 'react';
import Navigation from "./components/ui/Navigation";
import "./components/ui/homepage.css"; 
import Carousel from "./components/ui/Carousel";
import Genre from "./components/ui/GenreSection";
import FAQ from "./components/ui/FAQ";
import InfoSection from "./components/ui/InfoSection";
import MoveToTopButton from "./components/ui/MoveToTopButton";
import Header from "./components/ui/Header";


const App = () => {
  return (
    <div>
      <Header />
      <Navigation/>
      <Carousel />
      <Genre/>
      <FAQ/>
      <InfoSection/>
      <MoveToTopButton/>
      <footer>
        <p>&copy; 2025 AdSpecta. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;