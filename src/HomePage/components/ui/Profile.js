
import React, { useState, useEffect, useRef } from "react";
import "./homepage.css";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import Navigation from "./Navigation";
import { Link } from 'react-router-dom';
import {
  doc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../../../firebase";
import { uploadImageToCloudinary } from "../../../utils/cloudinaryUpload";

const Profile = () => {
  const [userData, setUserData] = useState({
    Name: "",
    Mobile_No: "",
    Email: "",
    Company_Name: "",
    Password: "",
  });
  const [role, setRole] = useState("");
  const [editable, setEditable] = useState(false);
  const [docId, setDocId] = useState("");
  const [showPasswordSection, setShowPasswordSection] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [profileImage, setProfileImage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const fileInputRef = useRef(null);

  const userId = localStorage.getItem("userId");
  const userRole = localStorage.getItem("userRole");

  const navigate = useNavigate();

  useEffect(() => {
    if (!userId || !userRole) {
      navigate("/login"); // redirect to login if user not logged in
    } else {
      fetchUserData(userRole, userId); // otherwise fetch profile data
    }
  }, [navigate, userId, userRole]);
  
  const fetchUserData = async (role, userId) => {
    try {
      const collectionName =
        role === "buyer" ? "AdSpace_Buyer_Data" : "AdSpace_Seller_Data";
      const idField = role === "buyer" ? "Buyer_Id" : "seller_id";
      const q = query(collection(db, collectionName), where(idField, "==", userId));

      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const data = userDoc.data();
        setDocId(userDoc.id);

        setRole(role);
        setUserData({
          Name: data.Name || "",
          Mobile_No: data.Mobile_No || "",
          Email: data.Email || "",
          Company_Name: role === "buyer" ? data.Company_Name || "" : "",
          Password: data.Password || "",
        });
        setProfileImage(data.Profile_Image || "/default-profile.png");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    if (file) {
      const imageUrl = await uploadImageToCloudinary(file);
      if (imageUrl) {
        setProfileImage(imageUrl);

        try {
          const collectionName =
            role === "buyer" ? "AdSpace_Buyer_Data" : "AdSpace_Seller_Data";
          await updateDoc(doc(db, collectionName, docId), {
            Profile_Image: imageUrl,
          });
          alert("Profile picture updated!");
        } catch (error) {
          console.error("Error updating profile image in Firestore:", error);
        }
      }
    }
  };

  const handleRemovePhoto = async () => {
    const defaultImage = "/default-profile.png";
    setProfileImage(defaultImage);

    try {
      const collectionName =
        role === "buyer" ? "AdSpace_Buyer_Data" : "AdSpace_Seller_Data";

      await updateDoc(doc(db, collectionName, docId), {
        Profile_Image: "",
      });

      alert("Profile photo removed.");
    } catch (error) {
      console.error("Error removing profile image:", error);
    }
  };

  const handleSave = async () => {
    try {
      const collectionName =
        role === "buyer" ? "AdSpace_Buyer_Data" : "AdSpace_Seller_Data";
      const updatedData =
        role === "buyer"
          ? {
              Name: userData.Name,
              Mobile_No: userData.Mobile_No,
              Company_Name: userData.Company_Name,
            }
          : {
              Name: userData.Name,
              Mobile_No: userData.Mobile_No,
            };

      await updateDoc(doc(db, collectionName, docId), updatedData);
      alert("Profile updated!");
      setEditable(false);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const handlePasswordUpdate = async () => {
    if (newPassword.length < 6) {
      alert("Password should be at least 6 characters.");
      return;
    }

    try {
      const collectionName =
        role === "buyer" ? "AdSpace_Buyer_Data" : "AdSpace_Seller_Data";
      await updateDoc(doc(db, collectionName, docId), {
        Password: newPassword,
      });

      setUserData({ ...userData, Password: newPassword });
      setNewPassword("");
      setShowPasswordSection(false);
      alert("Password updated!");
    } catch (error) {
      console.error("Error updating password:", error);
    }
  };

  const handlePostAd = () => {
    navigate("/seller/post-ad");
  };

  const handleSeePosts = () => {
    navigate("/seller/my-post");
  };

  return (
    <div>
      <Header />
      <Navigation />
      <div className="profile-container">
        <div className="profile-heading">
          <h2>My Profile</h2>
          {!editable ? (
            <button className="btn edit small-btn" onClick={() => setEditable(true)}>
              Edit Profile
            </button>
          ) : (
            <button className="btn save small-btn" onClick={handleSave}>
              Save
            </button>
          )}
        </div>

        <div className="profile-content">
          <div className="profile-image-section">
            <img
              src={profileImage || "/default-profile.png"}
              alt="Profile"
              style={{
                width: "200px",
                height: "200px",
                objectFit: "cover",
                borderRadius: "50%",
              }}
            />
            <input
              type="file"
              id="fileInput"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            <label htmlFor="fileInput" className="edit-icon">✏️</label>

            {profileImage !== "/default-profile.png" && (
              <button
                onClick={handleRemovePhoto}
                className="remove-photo-btn"
              >
                Remove Photo
              </button>
            )}
          </div>

          <div className="profile-details-section">
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                value={userData.Name}
                onChange={(e) =>
                  setUserData({ ...userData, Name: e.target.value })
                }
                disabled={!editable}
              />
            </div>

            <div className="form-group">
              <label>Mobile:</label>
              <input
                type="text"
                value={userData.Mobile_No}
                onChange={(e) =>
                  setUserData({ ...userData, Mobile_No: e.target.value })
                }
                disabled={!editable}
              />
            </div>

            <div className="form-group">
              <label>Email:</label>
              <input type="text" value={userData.Email} disabled />
            </div>

            {role === "buyer" && (
              <div className="form-group">
                <label>Business Name:</label>
                <input
                  type="text"
                  value={userData.Company_Name}
                  onChange={(e) =>
                    setUserData({ ...userData, Company_Name: e.target.value })
                  }
                  disabled={!editable}
                />
              </div>
            )}

            <div
              style={{
                marginBottom: "10px",
                fontSize: "14px",
                color: "#007BFF",
                cursor: "pointer",
              }}
              onClick={() => setShowPasswordSection(!showPasswordSection)}
            >
              {showPasswordSection ? "Cancel password change" : "Change Password?"}
            </div>

            {/* 👇 SHOW SELLER BUTTONS WHEN NOT IN PASSWORD EDIT MODE */}
            

            {showPasswordSection && (
              <div className="password-section">
                <div className="form-group">
                  <label>Current Password:</label>
                  <div className="password-input-wrapper">
                    <input
                      type={showCurrentPassword ? "text" : "password"}
                      value={userData.Password}
                      readOnly
                      className="password-input"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="password-toggle-btn"
                    >
                      {showCurrentPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <label>New Password:</label>
                  <div className="password-input-wrapper">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="password-input"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="password-toggle-btn"
                    >
                      {showNewPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>

                <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
                  <button className="btn save small-btn" onClick={handlePasswordUpdate}>
                    Save New Password
                  </button>
                </div>
              </div>
            )}

            {/* 👇 SHOW SELLER BUTTONS WHEN NOT IN PASSWORD EDIT MODE */}
            {role !== "buyer" && (
              <div className="seller-buttons" style={{ marginTop: "20px" }}>
                <button className="btn post-ad-btn" onClick={handlePostAd}>
                  Post Your Ad
                </button>
                
                <button className="btn view-posts-btn" onClick={handleSeePosts}>
                  See Uploaded Posts
                </button>
              </div>
            )}


            <div className="btn-container" style={{ marginTop: "20px" }}>
              <div style={{ marginTop: "10px", display: "flex", justifyContent: "center" }}>
                <button className="btn logout small-btn" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer>
        <p>&copy; 2025 AdSpecta. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Profile;
