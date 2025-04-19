import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "./CartContext";
import "./Cart.css";
import Header from "../HomePage/components/ui/Header.jsx";
import Navigation from "../HomePage/components/ui/Navigation.jsx";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);
  const navigate = useNavigate();
  const handleCheckout = () => {
    navigate("/checkout");
  };
  
  // Calculate total with proper number parsing for each price
  const total = cartItems.reduce((sum, item) => {
    // Parse price as number and default to 0 if invalid
    const itemPrice = typeof item.price === 'string' ? 
      parseFloat(item.price.replace(/,/g, '')) : 
      parseFloat(item.price) || 0;
      
    const itemQuantity = item.quantity || 1;
    return sum + (itemPrice * itemQuantity);
  }, 0);

  // Format a number to always show full value without abbreviation
  const formatPrice = (price) => {
    // Ensure it's a number
    const numPrice = typeof price === 'string' ? 
      parseFloat(price.replace(/,/g, '')) : 
      parseFloat(price) || 0;
      
    // Format with commas but preserve all digits
    return numPrice.toLocaleString('en-IN');
  };

  return (
    <div className="amazon-cart-container">
      <Header />
      <Navigation />
      <h1>Your Shopping Bag</h1>
      <div className="cart-main">
        <div className="cart-left">
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cartItems.map((item, index) => (
              <div className="cart-item" key={index}>
                <img src={item.image} alt={item.name} />
                <div className="cart-info">
                  <h3>{item.name} - {item.city}</h3>
                  <p>Type: {item.type}</p>
                  <p><strong>₹{formatPrice(item.price)}</strong></p>
                  <div className="qty-control">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                  <button onClick={() => removeFromCart(item.docId)} className="remove-btn">
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="cart-right">
          <div className="cart-summary">
            <h3>Subtotal ({cartItems.length} items)</h3>
            <p><strong>₹{formatPrice(total)}</strong></p>
            <button 
              className="checkout-btn" 
              onClick={handleCheckout}
              disabled={cartItems.length === 0}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
