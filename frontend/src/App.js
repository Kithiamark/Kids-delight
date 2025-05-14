// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
