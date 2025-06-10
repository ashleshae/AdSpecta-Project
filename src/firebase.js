
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // ✅ Add this line

const firebaseConfig = {
  apiKey: "AIzaSyCH9Wiu-N6x44CmYUtwxIIBHZlKolGgG4w",
  authDomain: "finaladspecta.firebaseapp.com",
  projectId: "finaladspecta",
  storageBucket: "finaladspecta.firebasestorage.app",
  messagingSenderId: "480429853652",
  appId: "1:480429853652:web:e09fbbbe05728920432441",
  measurementId: "G-T4JNMMDJF7"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Auth
const db = getFirestore(app);
const auth = getAuth(app); // ✅ Add this line

// Export both
export { db, auth }; // ✅ Now both are available for import
