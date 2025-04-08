
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // For Firestore

const firebaseConfig = {
    apiKey: "AIzaSyBG7GDRyFANNMSh2_JvMSMTMsLcnAaVLn8",
    authDomain: "adspecta-c3c0f.firebaseapp.com",
    projectId: "adspecta-c3c0f",
    storageBucket: "adspecta-c3c0f.firebasestorage.app",
    messagingSenderId: "794254859674",
    appId: "1:794254859674:web:b027861d3073999191ae23",
    measurementId: "G-4YFTWM82V1"
};
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Export the database to use in components
export  { db };
