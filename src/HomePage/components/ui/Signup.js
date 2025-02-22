
// Signup.js
import React, { useState } from "react";
import "./homepage.css";

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert("Signup Successful!");
      onLoginClick();
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
    }); // Reset form fields
    setErrors({}); // Clear errors
  };

  return (
    <div className="overlay">
      <button className="close-btn outside" onClick={onClose}>&times;</button>
      <div className="signup-box scrollable">
        <div className="signup-tabs">
          <button className={userType === "buyer" ? "active" : ""} onClick={() => handleUserTypeChange("buyer")}>
            Signup as Buyer
          </button>
          <button className={userType === "owner" ? "active" : ""} onClick={() => handleUserTypeChange("owner")}>
            Signup as Owner
          </button>
        </div>

        {userType === "buyer" && (
          <>
            <label>Buyer Username</label>
            <input type="text" name="buyerUsername" placeholder="Enter your username" value={formData.buyerUsername} onChange={handleChange} />
            {errors.buyerUsername && <span className="error">{errors.buyerUsername}</span>}

            <label>Mobile Number</label>
            <input type="text" name="buyerMobile" placeholder="Enter your mobile number" value={formData.buyerMobile} onChange={handleChange} />
            {errors.buyerMobile && <span className="error">{errors.buyerMobile}</span>}

            <label>Email</label>
            <input type="email" name="buyerEmail" placeholder="Enter your email" value={formData.buyerEmail} onChange={handleChange} />
            {errors.buyerEmail && <span className="error">{errors.buyerEmail}</span>}

            <label>Password</label>
            <input type="password" name="buyerPassword" placeholder="Enter your password" value={formData.buyerPassword} onChange={handleChange} />
            {errors.buyerPassword && <span className="error">{errors.buyerPassword}</span>}

            <div className="form-group">
              <label>About Business</label>
              <textarea name="aboutBusiness" placeholder="Describe your business" value={formData.aboutBusiness} onChange={handleChange}></textarea>
            </div>
          </>
        )}

        {userType === "owner" && (
          <>
            <label>Owner Username</label>
            <input type="text" name="ownerUsername" placeholder="Enter your username" value={formData.ownerUsername} onChange={handleChange} />
            {errors.ownerUsername && <span className="error">{errors.ownerUsername}</span>}

            <label>Mobile Number</label>
            <input type="text" name="ownerMobile" placeholder="Enter your mobile number" value={formData.ownerMobile} onChange={handleChange} />
            {errors.ownerMobile && <span className="error">{errors.ownerMobile}</span>}

            <label>Email</label>
            <input type="email" name="ownerEmail" placeholder="Enter your email" value={formData.ownerEmail} onChange={handleChange} />
            {errors.ownerEmail && <span className="error">{errors.ownerEmail}</span>}

            <label>Password</label>
            <input type="password" name="ownerPassword" placeholder="Enter your password" value={formData.ownerPassword} onChange={handleChange} />
            {errors.ownerPassword && <span className="error">{errors.ownerPassword}</span>}

            <label>Choose Media</label>
            <div className="checkbox-group">
              {["Metro", "BillBoard", "Rickshaws", "Bus", "Roadside Walls", "Bus Shelter"].map((media) => (
                <label key={media}>
                  <input
                    type="checkbox"
                    name="mediaTypes"
                    value={media}
                    checked={formData.mediaTypes.includes(media)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData({ ...formData, mediaTypes: [...formData.mediaTypes, media] });
                      } else {
                        setFormData({ ...formData, mediaTypes: formData.mediaTypes.filter((item) => item !== media) });
                      }
                    }}
                  />
                  {media}
                </label>
              ))}
            </div>
          </>
        )}

        <button className="continue-btn" onClick={handleSubmit}>Continue</button>
      </div>
    </div>
  );
};

export default Signup;
