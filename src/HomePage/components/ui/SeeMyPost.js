import React, { useEffect, useState } from "react"; 
import { collection, query, where, getDocs } from "firebase/firestore"; 
import { db } from "../../../firebase"; 
import Header from "./Header"; 
import Navigation from "./Navigation"; 
import "./details.css"; 
import { Link, useNavigate } from "react-router-dom"; 

const SeeMyPost = () => { 
  const [ads, setAds] = useState([]); 
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); 
  const sellerId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchSellerAds = async () => {
      if (!sellerId) return;

      try {
        const q = query(
          collection(db, "AdSpace_Data"),
          where("Seller_id", "==", sellerId)
        );
        const querySnapshot = await getDocs(q);
        
        const adList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAds(adList);
      } catch (error) {
        console.error("Error fetching seller ads:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSellerAds();
  }, [sellerId]);

  return (
    <div>
      <Header />
      <Navigation />
      <div className="see-my-post-container">
        <button 
          onClick={() => navigate("/profile")}
          style={{
            padding: "5px",
            backgroundColor: "#f1f1f1",
            color: "#333",
            border: "1px solid #ddd",
            borderRadius: "5px",
            fontSize: "22px",
            cursor: "pointer",
            width: "50px",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          ←
        </button>
        <h2 style={{ marginTop: "10px" }}>My Uploaded Ads</h2>
        {loading ? (
          <p>Loading...</p>
        ) : ads.length === 0 ? (
          <p>No ads uploaded yet.</p>
        ) : (
          <div className="ads-grid">
            {ads.map((ad) => (
              <Link to={`/seller/edit-ad/${ad.id}`} className="ad-card-link" key={ad.id}>
                <div className="ad-card">
                  <img src={ad.ImageURL || "/no-image.png"} alt="Ad Preview" className="ad-image" />
                  <div className="ad-details">
                    <h4>{ad.AdSpace_Type || "Untitled Ad"}</h4>
                    <p><strong>Area:</strong> {ad.Area || "N/A"}</p>
                    <p><strong>Location:</strong> {ad.Location || "N/A"}</p>
                    <p><strong>Rate:</strong> {ad.Starting_Rate || "N/A"}</p>
                    <p>
                      <strong>Status:</strong>{" "}
                      <span
                        style={{
                          color: ad.Availability ? "green" : "red",
                          fontWeight: "bold",
                        }}
                      >
                        {ad.Availability ? "Available" : "Not Available"}
                      </span>
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      <footer>
        <p>&copy; 2025 AdSpecta. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default SeeMyPost;
