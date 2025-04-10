
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import Header from "../HomePage/components/ui/Header";
import Navigation from "../HomePage/components/ui/Navigation";
import { Link } from "react-router-dom";
import "./BrowseMedia.css";

const Details = () => {
  const { adspaceId } = useParams(); // Get ID from route
  const [adData, setAdData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdData = async () => {
      try {
        const q = query(
          collection(db, "AdSpace_Data"),
          where("AdSpace_id", "==", adspaceId)
          // Optionally, add where("AdSpace_Type", "==", "Hoarding")
        );

        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const docData = querySnapshot.docs[0].data();
          setAdData(docData);
        } else {
          console.error("No data found for ID:", adspaceId);
        }
      } catch (error) {
        console.error("Error fetching ad data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdData();
  }, [adspaceId]);

  if (loading) {
    return (
      <div className="loading-container">
        <h2>Loading Ad Details...</h2>
        <div className="spinner" />
      </div>
    );
  }

  if (!adData) {
    return <h2>No data found for this Hoarding ID.</h2>;
  }

  return (
    <div>
      <Header />
      <Navigation />

      <div className="details-container">
      <div className="content-header">
        <div className="breadcrumb">
            <a href="/">Home</a>
            <span>→</span>

            {adData && (
            <>
                <Link
                to={
                    adData.AdSpace_Type === "Hoarding"
                    ? "/browse-hoarding"
                    : adData.AdSpace_Type === "Bus Shelter"
                    ? "/browse-bus-shelter"
                    : adData.AdSpace_Type === "Wall Ads"
                    ? "/browse-roadside-walls"
                    : adData.AdSpace_Type.startsWith("MetroAds")
                    ? "/browse-metro"
                    : adData.AdSpace_Type === "Auto"
                    ? "/browse-auto"
                    : "/"
                }
                style={{ color: "#007bff", cursor: "pointer" }}
                >
                {
                    adData.AdSpace_Type === "Hoarding"
                    ? "Billboard"
                    : adData.AdSpace_Type === "Bus Shelter"
                    ? "Bus Shelter Ads"
                    : adData.AdSpace_Type === "Wall Ads"
                    ? "RoadSide Wall Ads"
                    : adData.AdSpace_Type.startsWith("MetroAds")
                    ? "Metro Ads"
                    : adData.AdSpace_Type === "Auto"
                    ? "Auto Rickshaws Ads"
                    : "Ad Space"
                }
                </Link>
                <span>→</span>
                <span>
                {adData.AdSpace_Type} - {adData.Location},{adspaceId}
                </span>
            </>
            )}
        </div>
        </div>


        <h1 className="details-heading">
          Advertising on {adData.AdSpace_Type} in {adData.City} ({adspaceId})
        </h1>

        <div className="details-top-section">
          <img
            src="https://via.placeholder.com/400x250"
            alt="Hoarding"
            className="details-image"
          />

          <div className="details-info-box">
            <div className="details-info-row">
              <div className="details-info-item">
                <h4>{adData.AdSpace_Type.toUpperCase()}</h4>
                <span className="details-info-label">MEDIA TYPE</span>
              </div>
              {/* <div className="details-info-item">
                <h4>{adData.Avilability}</h4>
                <span className="details-info-label">AVAILABILITY</span>
              </div> */}
            </div>

            <div className="details-description">
              <h3>About Advertising on this Media Type</h3>
              <p>
                This Advertising is located at {adData.Area}, offering high visibility
                with a crowd level of {adData["Crowd level"]}. The location is
                well-known and can help in building brand recognition.
              </p>
            </div>
          </div>
        </div>

        <div className="details-insights-section">
          <h2 className="details-subheading">Key Insights</h2>
          <div className="details-insight-boxes">
            {/* <div className="details-insight-item">
              <span className="details-insight-label">CITY</span>
              <h4>{adData.City}</h4>
            </div> */}
            <div className="details-insight-item">
              <span className="details-insight-label">LANDMARK</span>
              <h4>
                {(adData.AdSpace_Type === "Auto" || adData.AdSpace_Type === "Wall Ads")
                  ? adData.Location
                  : adData.Area}
              </h4>
            </div>
            <div className="details-insight-item">
              <span className="details-insight-label">SIZE</span>
              <h4>{adData.Dimension_x}</h4>
            </div>
            <div className="details-insight-item">
              <span className="details-insight-label">STARTING RATE</span>
              <h4>₹{adData.Starting_Rate}</h4>
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <button className="add-to-bag-button">Add to Bag</button>
          </div>
        </div>
      </div>

      <footer>
        <p>&copy; 2025 AdSpecta. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Details;

