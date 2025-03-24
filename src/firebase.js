import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDiG5LmwVCCzYN5BG9HwMVeffCgnS6H81M",
    authDomain: "bakery-app-de2c2.firebaseapp.com",
    projectId: "bakery-app-de2c2",
    storageBucket: "bakery-app-de2c2.firebasestorage.app",
    messagingSenderId: "981834927782",
    appId: "1:981834927782:web:bb0af1c83005e6cb3f2e67",
    measurementId: "G-YQ4T174WY2"
  };

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);