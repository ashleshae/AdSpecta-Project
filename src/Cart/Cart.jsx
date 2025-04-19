import React, { useContext } from "react";
import { CartContext } from "./CartContext";
import "./Cart.css";
import Header from "../HomePage/components/ui/Header.jsx";
import Navigation from "../HomePage/components/ui/Navigation.jsx";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

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
                  <p><strong>₹{item.price}</strong></p>
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
            <p><strong>₹{total}</strong></p>
            <button className="checkout-btn">Proceed to Checkout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
