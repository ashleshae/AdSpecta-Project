
// Login.js
import React, { useState } from "react";
import "./homepage.css";

const Login = ({ onClose, onSignupClick }) => {
  const [userType, setUserType] = useState("buyer");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    let newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Form submitted successfully", formData);
    }
  };

  const handleUserTypeChange = (type) => {
    setUserType(type);
    setFormData({ username: "", password: "" }); // Reset input fields
    setErrors({}); // Clear errors
  };

  return (
    <div className="overlay">
      <button className="close-btn top-right" onClick={onClose}>&times;</button>
      <div className="login-box">
        <div className="login-tabs">
          <button className={userType === "buyer" ? "active" : ""} onClick={() => handleUserTypeChange("buyer")}>
            Login as Buyer
          </button>
          <button className={userType === "owner" ? "active" : ""} onClick={() => handleUserTypeChange("owner")}>
            Login as Owner
          </button>
        </div>

        <label>Username</label>
        <input type="text" name="username" placeholder={`${userType === "buyer" ? "Buyer" : "Owner"} username`} value={formData.username} onChange={handleChange} />
        {errors.username && <span className="error">{errors.username}</span>}

        <label>Password</label>
        <input type="password" name="password" placeholder={`${userType === "buyer" ? "Buyer" : "Owner"} password`} value={formData.password} onChange={handleChange} />
        {errors.password && <span className="error">{errors.password}</span>}

        <button className="continue-btn" onClick={handleSubmit}>Continue</button>

        <div className="signup-text">
          <span>New?</span><a href="#" onClick={onSignupClick}>Sign Up</a> 
        </div>
      </div>
    </div>
  );
};

export default Login;
