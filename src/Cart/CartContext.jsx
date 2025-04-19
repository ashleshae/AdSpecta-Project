import React, { createContext, useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  query,
  where,
  updateDoc
} from "firebase/firestore";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const userId = "guest"; // Or user.uid if logged in

  // Sync from Firestore
  const fetchCartFromFirestore = async () => {
    const q = query(collection(db, "cartItems"), where("userId", "==", userId));
    const snapshot = await getDocs(q);
    const items = snapshot.docs.map(doc => ({
      ...doc.data(),
      docId: doc.id // store document ID for updating/removing
    }));
    setCartItems(items);
  };

  // Add
  const addToCart = async (item) => {
    const exists = cartItems.find(i => i.id === item.id);
    if (exists) {
      updateQuantity(item.id, exists.quantity + 1);
      return;
    }

    const docRef = await addDoc(collection(db, "cartItems"), {
      ...item,
      userId,
      quantity: 1,
      timestamp: new Date()
    });

    setCartItems(prev => [...prev, { ...item, quantity: 1, docId: docRef.id }]);
  };

  // Remove
  const removeFromCart = async (docId) => {
    await deleteDoc(doc(db, "cartItems", docId));
    setCartItems(prev => prev.filter(i => i.docId !== docId));
  };

  // Quantity update
  const updateQuantity = async (id, newQty) => {
    const item = cartItems.find(i => i.id === id);
    if (!item || newQty < 1) return;

    const docRef = doc(db, "cartItems", item.docId);
    await updateDoc(docRef, { quantity: newQty });

    setCartItems(prev =>
      prev.map(i =>
        i.id === id ? { ...i, quantity: newQty } : i
      )
    );
  };

  useEffect(() => {
    fetchCartFromFirestore();
  }, []);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

