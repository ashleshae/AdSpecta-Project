import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./OrderConfirmation.css";

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderInfo } = location.state || {};

  // If no order info is available, redirect to home
  if (!orderInfo) {
    return (
      <div className="confirmation-container">
        <div className="confirmation-card">
          <h2>No order information found</h2>
          <p>Please return to the home page and try again.</p>
          <button onClick={() => navigate("/")} className="home-btn">
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  // Format price with commas (Indian format)
  const formatPrice = (price) => {
    return price.toLocaleString('en-IN');
  };

  // Generate random order number if not provided
  const orderNumber = orderInfo.orderId?.slice(0, 8) || 
    Math.random().toString(36).substring(2, 10).toUpperCase();

  return (
    <div className="confirmation-container">
      <div className="confirmation-card">
        <div className="confirmation-header">
          <div className="checkmark-circle">
            <div className="checkmark"></div>
          </div>
          <h1>Order Confirmed!</h1>
          <p>Thank you for your purchase. Your ad space booking has been confirmed.</p>
        </div>

        <div className="order-details">
          <div className="detail-row">
            <span>Order Number:</span>
            <span>{orderNumber}</span>
          </div>
          <div className="detail-row">
            <span>Payment ID:</span>
            <span>{orderInfo.paymentId || "Not available"}</span>
          </div>
          <div className="detail-row">
            <span>Amount Paid:</span>
            <span>₹{formatPrice(orderInfo.amount)}</span>
          </div>
        </div>

        <div className="customer-info">
          <h3>Customer Information</h3>
          <p>
            <strong>{orderInfo.customerInfo?.name}</strong><br />
            {orderInfo.customerInfo?.address}<br />
            {orderInfo.customerInfo?.city}, {orderInfo.customerInfo?.state} {orderInfo.customerInfo?.pincode}<br />
            {orderInfo.customerInfo?.phone}<br />
            {orderInfo.customerInfo?.email}
          </p>
        </div>

        <div className="order-items">
          <h3>Items</h3>
          {orderInfo.items?.map((item, index) => (
            <div className="confirmation-item" key={index}>
              <div className="confirmation-item-info">
                <h4>{item.name} - {item.city}</h4>
                <p>{item.type}</p>
              </div>
              <div className="confirmation-item-price">
                ₹{formatPrice(parseFloat(item.price) * (item.quantity || 1))}
              </div>
            </div>
          ))}
        </div>

        <div className="next-steps">
          <p>
            An email with your order details has been sent to {orderInfo.customerInfo?.email}.
            Our team will contact you shortly to discuss the next steps for your ad campaign.
          </p>
        </div>

        <div className="action-buttons">
          <button onClick={() => window.print()} className="print-btn">
            Print Receipt
          </button>
          <button onClick={() => navigate("/")} className="home-btn">
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;