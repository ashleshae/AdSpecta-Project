import React from 'react';
import ReactDOM from 'react-dom/client';
import './HomePage/homeflow.css';
import App from './HomePage/homeflow';
import ScrollToTop from "./HomePage/components/ui/ScrollToTop";
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import BrowseHoarding from './BrowseMediaPage/BrowseHoarding';
import AboutUs from './HomePage/components/ui/AboutUs';
import ContactUs from './HomePage/components/ui/ContactUs';

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
 
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();

