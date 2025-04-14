
import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";  // import useNavigate
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import Header from "./Header";
import Navigation from "./Navigation";
import axios from "axios";

const EditAd = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // initialize navigate function
  const fileInputRef = useRef(null);

  const [mediaType, setMediaType] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState("");
  const [dimension, setDimension] = useState(""); // single field
  const [rate, setRate] = useState("");
  const [availability, setAvailability] = useState(true);
  const [crowdLevel, setCrowdLevel] = useState("");
  const [tags, setTags] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const fetchAdData = async () => {
      try {
        const docRef = doc(db, "AdSpace_Data", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setMediaType(data.AdSpace_Type || "");
          setState(data.State || "");
          setCity(data.City || "");
          setAddress(data.Area || "");
          setLocation(data.Location || "");
          setDimension(data.Dimension_x || "");
          setRate(data.Starting_Rate ? data.Starting_Rate.toString() : "");
          setAvailability(data.Availability !== false);
          setCrowdLevel(data["Crowd level"] || "");
          setTags(data.Tags || "");
          setImageURL(data.ImageURL || "");
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching ad:", error);
      }
    };

    fetchAdData();
  }, [id]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    setImageFile(file);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "media_preset");

    try {
      const res = await axios.post("https://api.cloudinary.com/v1_1/dfmgvui9m/image/upload", formData);
      setImageURL(res.data.secure_url);
    } catch (err) {
      console.error("Image upload failed:", err);
    }
  };

  const handleUpdate = async () => {
    try {
      const docRef = doc(db, "AdSpace_Data", id);
      await updateDoc(docRef, {
        AdSpace_Type: mediaType,
        State: state,
        City: city,
        Area: address,
        Location: location,
        Dimension: dimension,
        Rate: Number(rate), 
        Availability: availability,
        CrowdLevel: crowdLevel,
        Tags: tags,
        ImageURL: imageURL,
        Dimension: dimension,
        Dimension_x: dimension,
      });
      // alert("Ad updated successfully!");
      navigate("/seller/my-post");
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update ad.");
    }
  };

  return (
    <div>
      <Header />
      <Navigation />
      <div className="edit-ad-container">
      <button 
        onClick={() => navigate("/seller/my-post")}
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

        <h2>Edit Advertisement</h2>

        <div className="form-group">
          <label>Choose Media Type:</label>
          <select value={mediaType} onChange={(e) => setMediaType(e.target.value)} required>
          <option value="">-- Select Media --</option>
         <option value="Hoarding">Hoarding</option>
         <option value="Bus Shelter">Bus Shelter</option>
         <option value="Metro Ads">Metro Ads</option>
         <option value="Roadside Walls">Roadside Walls</option>  {/* New Option */}
         <option value="Auto Ads">Auto Ads</option>
          </select>
        </div>

        <div className="form-group">
          <label>Address/Area:</label>
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
        </div>

        <div className="form-group">
          <label>Location:</label>
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
        </div>

        <div className="form-group">
          <label>State:</label>
          <input type="text" value={state} onChange={(e) => setState(e.target.value)} required />
        </div>

        <div className="form-group">
          <label>City:</label>
          <input type="text" value={city} onChange={(e) => setCity(e.target.value)} required />
        </div>

        <div className="form-group">
        <label>Dimension (Width x Height):</label>
        <input
            type="text"
            placeholder="e.g. 20x10"
            value={dimension}
            onChange={(e) => setDimension(e.target.value)}
            required
        />
        </div>

        <div className="form-group">
        <label>Rate:</label>
        <input 
            type="number" 
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
          <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Upload Media Image:</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} ref={fileInputRef} />
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

        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
          <button className="update-btn" onClick={handleUpdate}>
            Update Ad
          </button>
        </div>
      </div>
      <footer>
        <p>&copy; 2025 AdSpecta. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default EditAd;
