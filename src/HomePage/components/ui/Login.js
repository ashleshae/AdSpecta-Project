
import React, { useState } from "react";
import "./homepage.css";
import { db } from "../../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

const Login = ({ onClose, onSignupClick }) => {
  const [userType, setUserType] = useState("buyer");
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false); // 👈 for toggling password

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    let newErrors = {};

    if (!formData.username.trim()) newErrors.username = "Username is required";
    if (!formData.password.trim()) newErrors.password = "Password is required";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      const collectionName = userType === "buyer" ? "AdSpace_Buyer_Data" : "AdSpace_Seller_Data";

      const q = query(
        collection(db, collectionName),
        where("Name", "==", formData.username),
        where("Password", "==", formData.password)
      );

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        const fullName = userData.Name;
        const firstName = fullName.split(" ")[0];

        // Save name to localStorage
        localStorage.setItem("userFirstName", firstName);
        localStorage.setItem("isLoggedIn", "true");

        alert("Login successful!");
        onClose(true); // ✅ Login success, tell Header to update state
      } else {
        alert("Invalid credentials. Please try again.");
      }

    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  const handleUserTypeChange = (type) => {
    setUserType(type);
    setFormData({ username: "", password: "" });
    setErrors({});
  };

  return (
    <div className="overlay">
      <button
        className="close-btn top-right"
        onClick={() => onClose(false)} // ❌ Modal closed without login
      >
        &times;
      </button>

      <div className="login-contain">
        <div className="login-left">
          <img src="images/loginImage.png" alt="Login Visual" className="login-image" />
        </div>
        <div className="login-box">
          <div className="login-tabs">
            <button className={userType === "buyer" ? "active" : ""} onClick={() => handleUserTypeChange("buyer")}>
              Login as Buyer
            </button>
            <button className={userType === "owner" ? "active" : ""} onClick={() => handleUserTypeChange("owner")}>
              Login as Seller
            </button>
          </div>

          <label>
            Username<span className="required">*</span>
          </label>
          <input
            type="text"
            name="username"
            placeholder={`${userType === "buyer" ? "Buyer" : "Seller"} Username`}
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && <span className="error">{errors.username}</span>}

          <label>
            Password<span className="required">*</span>
          </label>
          <div className="password-field">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder={`${userType === "buyer" ? "Buyer" : "Seller"} Password`}
              value={formData.password}
              onChange={handleChange}
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {errors.password && <span className="error">{errors.password}</span>}

          <button className="continue-btn" onClick={handleSubmit}>Continue</button>

          <div className="signup-text">
            <span>New?</span><a href="#" onClick={onSignupClick}> Sign Up</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
