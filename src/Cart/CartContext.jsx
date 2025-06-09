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

  // Add to cart - enhanced to handle both regular items and custom posters
  const addToCart = async (item) => {
    // Check if this is a custom poster (they have unique IDs with timestamp)
    const isCustomPoster = item.id && item.id.startsWith('custom-poster-');
    
    // For regular items, check if it exists and update quantity
    // For custom posters, always add as new item (since each poster is unique)
    const exists = isCustomPoster ? null : cartItems.find(i => i.id === item.id);
    
    if (exists) {
      updateQuantity(item.id, exists.quantity + 1);
      return;
    }

    // Prepare item for storage
    // For posters, we convert the blob URL to base64 data to store in Firestore
    let itemToStore = { ...item };
    
    // If the item has an image URL generated from createObjectURL
    if (isCustomPoster && item.image && item.image.startsWith('blob:')) {
      try {
        // Convert the blob URL to base64 data
        const response = await fetch(item.image);
        const blob = await response.blob();
        
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = async () => {
            // Store the base64 data instead of blob URL
            itemToStore.image = reader.result;
            
            const docRef = await addDoc(collection(db, "cartItems"), {
              ...itemToStore,
              userId,
              quantity: item.quantity || 1,
              timestamp: new Date()
            });
            
            setCartItems(prev => [...prev, { 
              ...itemToStore, 
              quantity: item.quantity || 1, 
              docId: docRef.id 
            }]);
            
            resolve();
          };
          reader.readAsDataURL(blob);
        });
      } catch (error) {
        console.error("Error processing image:", error);
        // Fallback - store without image if conversion fails
        itemToStore.image = null;
      }
    }

    // Add the item to Firestore
    const docRef = await addDoc(collection(db, "cartItems"), {
      ...itemToStore,
      userId,
      quantity: item.quantity || 1,
      timestamp: new Date()
    });

    setCartItems(prev => [...prev, { 
      ...itemToStore, 
      quantity: item.quantity || 1, 
      docId: docRef.id 
    }]);
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

  // Clear cart
  const clearCart = async () => {
    // Delete all cart items from Firestore
    const deletePromises = cartItems.map(item => 
      deleteDoc(doc(db, "cartItems", item.docId))
    );
    
    await Promise.all(deletePromises);
    setCartItems([]);
  };

  useEffect(() => {
    fetchCartFromFirestore();
  }, []);

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart, 
      updateQuantity,
      clearCart 
    }}>
      {children}
    </CartContext.Provider>
  );
};