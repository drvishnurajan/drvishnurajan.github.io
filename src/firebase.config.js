// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDkZ5vLZ952XjrQHDowuWJ8ri9Qh6RbZAg",
  authDomain: "cps-sahrday.firebaseapp.com",
  databaseURL: "https://cps-sahrday-default-rtdb.firebaseio.com",
  projectId: "cps-sahrday",
  storageBucket: "cps-sahrday.firebasestorage.app",
  messagingSenderId: "630088664236",
  appId: "1:630088664236:web:a4713ed6454b178d320b09",
  measurementId: "G-5HWN4JE4LR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and export it
export const db = getDatabase(app);

// Initialize Auth
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
