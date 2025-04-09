import React from 'react';
import ReactDOM from 'react-dom/client';
import './HomePage/homeflow.css';
import App from './HomePage/homeflow';
import ScrollToTop from "./HomePage/components/ui/ScrollToTop";
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import BrowseHoarding from './BrowseMediaPage/BrowseHoarding';
import BrowseAuto from './BrowseMediaPage/BrowseAuto';
import BrowseMetro from './BrowseMediaPage/BrowseMetro';
import AboutUs from './HomePage/components/ui/AboutUs';
import ContactUs from './HomePage/components/ui/ContactUs';
import BrowseBusShelters from './BrowseMediaPage/BrowseBusShelter';
import BrowseBus from './BrowseMediaPage/BrowseBus';
import BrowseRoadSideWalls from './BrowseMediaPage/BrowseRoadSideWalls';
import FindMediaRates from "./HomePage/components/ui/FindMediaRates";
import Details from './BrowseMediaPage/Details';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/aboutus',
    element: (
      <>
        <ScrollToTop />
        <AboutUs />
      </>
    ),
  },
  {
    path: '/contactus',
    element:(
      <>
        <ScrollToTop />
        <ContactUs/>
      </>
    ),
  },
  {
    path: '/browse-hoarding',
    element: (
      <>
        <ScrollToTop />
        <BrowseHoarding />
      </>
    ),
  },
  {
    path: '/browse-auto',
    element: (
      <>
        <ScrollToTop />
        <BrowseAuto />
      </>
    ),
  },
  {
    path: '/browse-metro',
    element: (
      <>
        <ScrollToTop />
        <BrowseMetro />
      </>
    ),
  },
  {
    path: '/browse-bus-shelter',
    element: (
      <>
        <ScrollToTop />
        <BrowseBusShelters />
      </>
    ),
  },
  {
    path: '/browse-bus',
    element: (
      <>
        <ScrollToTop />
        <BrowseBus />
      </>
    ),
  },
  {
    path: '/browse-roadside-walls',
    element: (
      <>
        <ScrollToTop />
        <BrowseRoadSideWalls />
      </>
    ),
  },
  {
    path: '/media-rates',
    element: (
      <>
        <ScrollToTop />
        <FindMediaRates />
      </>
    ),
  },
  {
    path: '/details/:adspaceId',
    element: (
      <>
        <ScrollToTop />
        <Details />
      </>
    ),
  },
 
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();

