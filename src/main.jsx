import React from "react";
import ReactDOM from "react-dom/client";
import "./HomePage/homeflow.css";
import App from "./HomePage/homeflow.jsx";
import ScrollToTop from "./HomePage/components/ui/ScrollToTop";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BrowseHoarding from "./BrowseMediaPage/BrowseHoarding";
import BrowseAuto from "./BrowseMediaPage/BrowseAuto.jsx";
import BrowseMetro from "./BrowseMediaPage/BrowseMetro";
import AboutUs from "./HomePage/components/ui/AboutUs";
import ContactUs from "./HomePage/components/ui/ContactUs";
import BrowseBusShelters from "./BrowseMediaPage/BrowseBusShelter";
import BrowseBus from "./BrowseMediaPage/BrowseBus";
import BrowseRoadSideWalls from "./BrowseMediaPage/BrowseRoadSideWalls.jsx";
import FindMediaRates from "./HomePage/components/ui/FindMediaRates";
import Details from "./BrowseMediaPage/Details";
import Login from "./HomePage/components/ui/Login";
import Profile from "./HomePage/components/ui/Profile";
import PostAd from "./HomePage/components/ui/PostAd";
import SeeMyPost from "./HomePage/components/ui/SeeMyPost";
import EditAd from "./HomePage/components/ui/EditAd";
import Dashboard from "./HomePage/components/ui/Dashboard.jsx";
import AItool from "./HomePage/components/ui/AItool.jsx";
import { CartProvider } from "./Cart/CartContext";
import Cart from "./Cart/Cart.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <ScrollToTop />
        <App />
      </>
    ),
  },
  {
    path: "/aboutus",
    element: (
      <>
        <ScrollToTop />
        <AboutUs />
      </>
    ),
  },
  {
    path: "/contactus",
    element: (
      <>
        <ScrollToTop />
        <ContactUs />
      </>
    ),
  },
  {
    path: "/browse-hoarding",
    element: (
      <>
        <ScrollToTop />
        <BrowseHoarding />
      </>
    ),
  },
  {
    path: "/browse-auto",
    element: (
      <>
        <ScrollToTop />
        <BrowseAuto />
      </>
    ),
  },
  {
    path: "/browse-metro",
    element: (
      <>
        <ScrollToTop />
        <BrowseMetro />
      </>
    ),
  },
  {
    path: "/browse-bus-shelter",
    element: (
      <>
        <ScrollToTop />
        <BrowseBusShelters />
      </>
    ),
  },
  {
    path: "/browse-bus",
    element: (
      <>
        <ScrollToTop />
        <BrowseBus />
      </>
    ),
  },
  {
    path: "/browse-roadside-walls",
    element: (
      <>
        <ScrollToTop />
        <BrowseRoadSideWalls />
      </>
    ),
  },
  {
    path: "/media-rates",
    element: (
      <>
        <ScrollToTop />
        <FindMediaRates />
      </>
    ),
  },
  {
    path: "/details/:adspaceId",
    element: (
      <>
        <ScrollToTop />
        <Details />
      </>
    ),
  },
  {
    path: "/login",
    element: (
      <>
        <ScrollToTop />
        <Login />
      </>
    ),
  },
  {
    path: "/profile",
    element: (
      <>
        <ScrollToTop />
        <Profile />
      </>
    ),
  },
  {
    path: "/seller/post-ad",
    element: (
      <>
        <ScrollToTop />
        <PostAd />
      </>
    ),
  },
  {
    path: "/seller/my-post",
    element: (
      <>
        <ScrollToTop />
        <SeeMyPost />
      </>
    ),
  },
  {
    path: "/seller/edit-ad/:id",
    element: (
      <>
        <ScrollToTop />
        <EditAd />
      </>
    ),
  },
  {
    path: "/aitool",
    element: (
      <>
        <ScrollToTop />
        <AItool />
      </>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <>
        <ScrollToTop />
        <Dashboard />
      </>
    ),
  },
  {
    path: "/cart/:adspaceId",
    element: (
      <>
        <ScrollToTop />
        <Cart />
      </>
    ),
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CartProvider>
    <RouterProvider router={router} />
    </CartProvider>
  </React.StrictMode>
);

reportWebVitals();
