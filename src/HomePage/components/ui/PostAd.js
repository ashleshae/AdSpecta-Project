

import React, { useState, useEffect, useRef } from "react";
import Header from "./Header";
import Navigation from "./Navigation";
import "./details.css";
import { db } from "../../../firebase";
import { useNavigate } from "react-router-dom";
import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  serverTimestamp,
  setDoc,
  doc,
} from "firebase/firestore";
import { getDoc } from "firebase/firestore";

const PostAd = () => {
  const [mediaType, setMediaType] = useState("");
  const [state, setState] = useState(""); // Added state
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [dimension, setDimension] = useState("");
  const [rate, setRate] = useState("");
  const [availability, setAvailability] = useState(true);
  const [tags, setTags] = useState("");
  const [crowdLevel, setCrowdLevel] = useState("");
  const [sellerData, setSellerData] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imageURL, setImageURL] = useState("");
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchSeller = async () => {
      const userId = localStorage.getItem("userId");
      const userRole = localStorage.getItem("userRole");
      if (!userId || userRole !== "owner") return;

      try {
        const q = query(
          collection(db, "AdSpace_Seller_Data"),
          where("seller_id", "==", userId)
        );
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const docSnap = querySnapshot.docs[0];
          setSellerData({ seller_id: userId, ...docSnap.data() });
        }
      } catch (error) {
        console.error("Error fetching seller data:", error);
      }
    };

    fetchSeller();
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "media_preset");
    formData.append("cloud_name", "dfmgvui9m");

    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/dfmgvui9m/image/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setImageURL(data.secure_url);
    } catch (error) {
      console.error("Image upload failed:", error);
      alert("Image upload failed. Try again.");
    }
  };

  const generateUniqueAdSpaceId = async (type, state, city) => {
    const firstLetter = (str) => str?.charAt(0)?.toUpperCase() || "X";
    const prefix = `${firstLetter(type)}${firstLetter(state)}${firstLetter(city)}`;
    let uniqueId;
    let exists = true;

    while (exists) {
      const randomDigits = Math.floor(1000 + Math.random() * 9000);
      uniqueId = `${prefix}${randomDigits}`;
      const docRef = doc(db, "AdSpace_Data", uniqueId);
      const docSnap = await getDoc(docRef);
      exists = docSnap.exists();
    }

    return uniqueId;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!sellerData) {
      alert("You must be logged in as a seller to post an ad.");
      return;
    }

    try {
      const adSpaceId = await generateUniqueAdSpaceId(mediaType, state, city);

      const adData = {
        AdSpace_id: adSpaceId,
        AdSpace_Type: mediaType,
        State: state,
        City: city,
        Area: address,
        Location: location,
        Dimension_x: dimension.split("x")[0].trim(),
        Dimension_y: dimension.split("x")[1]?.trim() || "",
        Starting_Rate: Number(rate),
        Availability: availability ? "Available" : "Booked",
        Crowd_level: crowdLevel,
        Tags: tags,
        Seller_id: sellerData.seller_id,
        ImageURL: imageURL,
        Timestamp: serverTimestamp(),
      };

      await setDoc(doc(db, "AdSpace_Data", adSpaceId), adData);

      const sellerPostData = {
        seller_id: sellerData.seller_id,
        Name: sellerData.Name || "",
        Mobile_No: sellerData.Mobile_No || "",
        Email: sellerData.Email || "",
        Website: sellerData.Website || "",
        Password: sellerData.Password || "",
        AdSpace_Type: mediaType,
        AdSpace_id: adSpaceId,
        City: city,
        ImageURL: imageURL,
      };

      await addDoc(collection(db, "AdSpace_Seller_Data"), sellerPostData);

      alert("Ad successfully posted!");
      navigate("/profile");

      // Reset form
      setMediaType("");
      setState("");
      setAddress("");
      setCity("");
      setLocation("");
      setDimension("");
      setRate("");
      setAvailability(true);
      setCrowdLevel("");
      setTags("");
      setImageURL("");
      if (fileInputRef.current) fileInputRef.current.value = null;
    } catch (error) {
      console.error("Error posting ad:", error);
      alert("Failed to post the ad. Try again later.");
    }
  };

  return (
    <div>
      <Header />
      <Navigation />
      <div className="post-ad-container">
      <button 
        onClick={() => navigate("/profile")}
        style={{
          padding: "5px 5px",
          backgroundColor: "#f1f1f1",
          color: "#333",
          border: "1px solid #ddd",
          borderRadius: "5px",
          fontSize: "22px",
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: "50px", 
          gap: "8px"
        }}
      >
        ←
      </button>
        <h2>Post Your Advertisement</h2>
        <form className="post-ad-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Choose Media Type:</label>
            <select value={mediaType} onChange={(e) => setMediaType(e.target.value)} required>
              <option value="">-- Select Media --</option>
              <option value="Hoarding">Hoarding</option>
              <option value="Bus Shelter">Bus Shelter</option>
              <option value="Metro Ads">Metro Ads</option>
              <option value="Wall Ads">Roadside Wall Ads</option>
              <option value="Auto Ads">Auto Ads</option>
            </select>
          </div>

          <div className="form-group">
            <label>Address/Area:</label>
            <input
              type="text"
              placeholder="Enter Address/Area"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Location:</label>
            <input
              type="text"
              placeholder="Enter Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>City:</label>
            <input
              type="text"
              placeholder="Enter City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>State:</label>
            <input
              type="text"
              placeholder="Enter State"
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Dimension (e.g., 20x10):</label>
            <input
              type="text"
              placeholder="Enter Dimension"
              value={dimension}
              onChange={(e) => setDimension(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Rate:</label>
            <input
              type="number"
              placeholder="Enter Rate"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Available:</label>
            <select value={availability} onChange={(e) => setAvailability(e.target.value === "true")}>
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>

          <div className="form-group">
            <label>Crowd Level:</label>
            <select value={crowdLevel} onChange={(e) => setCrowdLevel(e.target.value)} required>
              <option value="">-- Select Crowd Level --</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div className="form-group">
            <label>Tags (comma-separated):</label>
            <input
              type="text"
              placeholder="Enter Tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Upload Media Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              ref={fileInputRef}
              required
            />
          </div>

          {imageURL && (
            <div style={{ textAlign: "center" }}>
              <img src={imageURL} alt="Uploaded" style={{ maxHeight: "200px", maxWidth: "200px" }} />
              <br />
              <button
                type="button"
                onClick={() => {
                  setImageURL("");
                  setImageFile(null);
                  if (fileInputRef.current) fileInputRef.current.value = null;
                }}
                style={{
                  padding: "5px 10px",
                  backgroundColor: "#ff4d4f",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Remove Image
              </button>
            </div>
          )}

          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <button className="btn post-btn" type="submit">
              Submit Ad
            </button>
          </div>
        </form>
      </div>

      <footer>
        <p>&copy; 2025 AdSpecta. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default PostAd;
