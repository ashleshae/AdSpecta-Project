// Signup.js

import React, { useState } from "react";
import "./homepage.css";
import { db } from "../../../firebase";
import { collection, addDoc } from "firebase/firestore";

const Signup = ({ onClose, onLoginClick }) => {
  const [userType, setUserType] = useState("buyer");
  const [formData, setFormData] = useState({
    buyerUsername: "",
    buyerMobile: "",
    buyerEmail: "",
    buyerPassword: "",
    ownerUsername: "",
    ownerMobile: "",
    ownerEmail: "",
    ownerPassword: "",
    aboutBusiness: "",
    mediaTypes: []
  });
  const [errors, setErrors] = useState({});

  const [showBuyerPassword, setShowBuyerPassword] = useState(false);
  const [showOwnerPassword, setShowOwnerPassword] = useState(false);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let newErrors = {};

    if (userType === "buyer") {
      if (!formData.buyerUsername.trim()) newErrors.buyerUsername = "Username is required";
      if (!formData.buyerMobile.trim()) newErrors.buyerMobile = "Mobile number is required";
      if (!formData.buyerEmail.trim()) newErrors.buyerEmail = "Email is required";
      if (!formData.buyerPassword.trim()) newErrors.buyerPassword = "Password is required";
    }

    if (userType === "owner") {
      if (!formData.ownerUsername.trim()) newErrors.ownerUsername = "Username is required";
      if (!formData.ownerMobile.trim()) newErrors.ownerMobile = "Mobile number is required";
      if (!formData.ownerEmail.trim()) newErrors.ownerEmail = "Email is required";
      if (!formData.ownerPassword.trim()) newErrors.ownerPassword = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (userType === "buyer") {
        const buyerData = {
          Name: formData.buyerUsername,
          Mobile_No: formData.buyerMobile,
          Email: formData.buyerEmail,
          Password: formData.buyerPassword,
          Company_Name: formData.aboutBusiness || ""
        };

        await addDoc(collection(db, "AdSpace_Buyer_Data"), buyerData);
        localStorage.setItem("name", formData.buyerUsername.split(" ")[0]); // store first name
        alert("Buyer signed up successfully!");
      }

      if (userType === "owner") {
        const ownerData = {
          Name: formData.ownerUsername,
          Mobile_No: formData.ownerMobile,
          Email: formData.ownerEmail,
          Password: formData.ownerPassword,
        };

        await addDoc(collection(db, "AdSpace_Seller_Data"), ownerData);
        localStorage.setItem("name", formData.ownerUsername.split(" ")[0]); // store first name
        alert("Seller signed up successfully!");
      }

      onLoginClick(); // Redirect to login page
    } catch (error) {
      console.error("Signup error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const handleUserTypeChange = (type) => {
    setUserType(type);
    setFormData({
      buyerUsername: "",
      buyerMobile: "",
      buyerEmail: "",
      buyerPassword: "",
      ownerUsername: "",
      ownerMobile: "",
      ownerEmail: "",
      ownerPassword: "",
      aboutBusiness: "",
      mediaTypes: []
    });
    setErrors({});
  };

  return (
    <div className="overlay">
      <button className="close-btn outside" onClick={onClose}>&times;</button>
      <div className="login-contain">
        <div className="login-left">
          <img src="images/loginImage.png" alt="Signup Visual" className="login-image" />
        </div>
        <div className="signup-box scrollable">
          <button className="back-btn" onClick={onLoginClick}>← Back to Login</button>
          <div className="signup-tabs">
            <button className={userType === "buyer" ? "active" : ""} onClick={() => handleUserTypeChange("buyer")}>
              Signup as Buyer
            </button>
            <button className={userType === "owner" ? "active" : ""} onClick={() => handleUserTypeChange("owner")}>
              Signup as Seller
            </button>
          </div>

          {userType === "buyer" && (
            <>
              <label>Buyer Username<span className="required">*</span> </label>
              <input type="text" name="buyerUsername" placeholder="Enter your username" value={formData.buyerUsername} onChange={handleChange} />
              {errors.buyerUsername && <span className="error">{errors.buyerUsername}</span>}

              <label>Mobile Number<span className="required">*</span></label>
              <input type="text" name="buyerMobile" placeholder="Enter your mobile number" value={formData.buyerMobile} onChange={handleChange} />
              {errors.buyerMobile && <span className="error">{errors.buyerMobile}</span>}

              <label>Email<span className="required">*</span></label>
              <input type="email" name="buyerEmail" placeholder="Enter your email" value={formData.buyerEmail} onChange={handleChange} />
              {errors.buyerEmail && <span className="error">{errors.buyerEmail}</span>}

              <label>Password<span className="required">*</span></label>
              <div className="password-field">
                <input
                  type={showBuyerPassword ? "text" : "password"}
                  name="buyerPassword"
                  placeholder="Enter your password"
                  value={formData.buyerPassword}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowBuyerPassword(prev => !prev)}
                >
                  {showBuyerPassword ? "Hide" : "Show"}
                </button>
              </div>
              {errors.buyerPassword && <span className="error">{errors.buyerPassword}</span>}


              <div className="form-group">
                <label>Name your Business</label>
                <input type="text" name="aboutBusiness" placeholder="Name your business" value={formData.aboutBusiness} onChange={handleChange}/>
              </div>
            </>
          )}

          {userType === "owner" && (
            <>
              <label>Seller Username<span className="required">*</span></label>
              <input type="text" name="ownerUsername" placeholder="Enter your username" value={formData.ownerUsername} onChange={handleChange} />
              {errors.ownerUsername && <span className="error">{errors.ownerUsername}</span>}

              <label>Mobile Number<span className="required">*</span></label>
              <input type="text" name="ownerMobile" placeholder="Enter your mobile number" value={formData.ownerMobile} onChange={handleChange} />
              {errors.ownerMobile && <span className="error">{errors.ownerMobile}</span>}

              <label>Email<span className="required">*</span></label>
              <input type="email" name="ownerEmail" placeholder="Enter your email" value={formData.ownerEmail} onChange={handleChange} />
              {errors.ownerEmail && <span className="error">{errors.ownerEmail}</span>}

              <label>Password<span className="required">*</span></label>
              <div className="password-field">
                <input
                  type={showOwnerPassword ? "text" : "password"}
                  name="ownerPassword"
                  placeholder="Enter your password"
                  value={formData.ownerPassword}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowOwnerPassword(prev => !prev)}
                >
                  {showOwnerPassword ? "Hide" : "Show"}
                </button>
              </div>
              {errors.ownerPassword && <span className="error">{errors.ownerPassword}</span>}

            </>
          )}

          <button className="continue-btn" onClick={handleSubmit}>Continue</button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
