// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBJfAfKw0RVzO8-gCMWomMDs0bzZYgvw8g",
    authDomain: "sahrdaya-cps.firebaseapp.com",
    projectId: "sahrdaya-cps",
    storageBucket: "sahrdaya-cps.firebasestorage.app",
    messagingSenderId: "773439172484",
    appId: "1:773439172484:web:ff0c6a5345d74d2fe277d1",
    measurementId: "G-5LSYYHXE8R",
    databaseURL: "https://sahrdaya-cps-default-rtdb.firebaseio.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and export it
export const db = getDatabase(app);
