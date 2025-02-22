import React from 'react';
import ReactDOM from 'react-dom/client';
import './HomePage/homeflow.css';
import App from './HomePage/homeflow';
import ScrollToTop from "./HomePage/components/ui/ScrollToTop";
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import BrowseHoarding from './BrowseMediaPage/BrowseHoarding';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
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

