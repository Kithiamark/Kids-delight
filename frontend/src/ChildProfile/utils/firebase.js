// src/utils/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDV5grX4jlhNZikxnjbjy6atVNTtVJayAA",
  authDomain: "teens-and-kids-delight.firebaseapp.com",
  projectId: "teens-and-kids-delight",
  storageBucket: "teens-and-kids-delight.firebasestorage.app",
  messagingSenderId: "289588893945",
  appId: "1:289588893945:web:23f9c45ede391c5eedaa28",
  measurementId: "G-WJXMQHWYY5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase services
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;