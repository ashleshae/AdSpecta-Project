import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import { CartContext } from "./CartContext";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase";
import "./Checkout.css";

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });
  
  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => {
    const itemPrice = typeof item.price === 'string' ? 
      parseFloat(item.price.replace(/,/g, '')) : 
      parseFloat(item.price) || 0;
    return sum + (itemPrice * (item.quantity || 1));
  }, 0);
  
  // Add tax (18% GST)
  const tax = subtotal * 0.18;
  const total = subtotal + tax;

  useEffect(() => {
    // Load Razorpay script
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const isFormValid = () => {
    const { name, email, phone, address, city, state, pincode } = formData;
    return name && email && phone && address && city && state && pincode;
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    
    if (!isFormValid()) {
      alert("Please fill all the required fields");
      return;
    }
    
    setLoading(true);
    
    try {
      // Create order in database
      const orderRef = await addDoc(collection(db, "orders"), {
        items: cartItems,
        customer: formData,
        subtotal,
        tax,
        total,
        status: "pending",
        createdAt: Timestamp.now()
      });
      
      // Initialize Razorpay payment
      const options = {
        key: "rzp_test_YourTestKeyHere", // Replace with your Razorpay Key
        amount: total * 100, // Razorpay accepts amount in paise
        currency: "INR",
        name: "AdSpecta",
        description: "Payment for Ad Space Booking",
        order_id: "", // This would be generated from Razorpay backend
        handler: function(response) {
          // Update order with payment details
          handlePaymentSuccess(orderRef.id, response);
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone
        },
        notes: {
          address: formData.address
        },
        theme: {
          color: "#3399cc"
        }
      };
      
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
      
    } catch (error) {
      console.error("Error in checkout:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSuccess = async (orderId, paymentResponse) => {
    try {
      // Here you would update the order with payment info
      // This would typically involve a server call
      
      // For now, we'll just navigate to success page
      clearCart();
      navigate("/order-confirmation", { 
        state: { 
          orderInfo: {
            orderId,
            paymentId: paymentResponse.razorpay_payment_id,
            amount: total,
            items: cartItems,
            customerInfo: formData
          } 
        } 
      });
    } catch (error) {
      console.error("Error updating payment info:", error);
    }
  };

  // Format price with commas (Indian format)
  const formatPrice = (price) => {
    return price.toLocaleString('en-IN');
  };

  if (cartItems.length === 0) {
    return (
      <div className="checkout-container empty-cart">
        <h2>Your cart is empty</h2>
        <p>Please add items to your cart before proceeding to checkout.</p>
        <button onClick={() => navigate("/browse-hoarding")} className="browse-btn">
          Browse Ads
        </button>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h1>Checkout Page</h1>
      
      <div className="checkout-grid">
        <div className="checkout-form">
          <h2>Billing Information</h2>
          <form onSubmit={handlePayment}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                value={formData.name} 
                onChange={handleInputChange} 
                required 
              />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  value={formData.phone} 
                  onChange={handleInputChange} 
                  required 
                  pattern="[0-9]{10}" 
                  placeholder="10-digit number" 
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input 
                type="text" 
                id="address" 
                name="address" 
                value={formData.address} 
                onChange={handleInputChange} 
                required 
              />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input 
                  type="text" 
                  id="city" 
                  name="city" 
                  value={formData.city} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="state">State</label>
                <input 
                  type="text" 
                  id="state" 
                  name="state" 
                  value={formData.state} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="pincode">Pincode</label>
                <input 
                  type="text" 
                  id="pincode" 
                  name="pincode" 
                  value={formData.pincode} 
                  onChange={handleInputChange} 
                  required 
                  pattern="[0-9]{6}" 
                  placeholder="6-digit code" 
                />
              </div>
            </div>
            
            <button 
              type="submit" 
              className="payment-btn" 
              disabled={loading || !isFormValid()}
            >
              {loading ? "Processing..." : `Pay ₹${formatPrice(total)}`}
            </button>
          </form>
        </div>
        
        <div className="order-summary">
          <h2>Order Summary</h2>
          <div className="order-items">
            {cartItems.map((item, index) => (
              <div className="order-item" key={index}>
                <div className="item-info">
                  <h4>{item.name}</h4>
                  <p>{item.type} in {item.city}</p>
                </div>
                <div className="item-price">
                  <p>₹{formatPrice(parseFloat(item.price) * (item.quantity || 1))}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="order-totals">
            <div className="total-row">
              <span>Subtotal</span>
              <span>₹{formatPrice(subtotal)}</span>
            </div>
            <div className="total-row">
              <span>GST (18%)</span>
              <span>₹{formatPrice(tax)}</span>
            </div>
            <div className="total-row grand-total">
              <span>Total</span>
              <span>₹{formatPrice(total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;