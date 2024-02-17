// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDWIIUZCQow-rskm3Wfzcu8_EQ01gtMlDc",
  authDomain: "eve-2c69b.firebaseapp.com",
  projectId: "eve-2c69b",
  storageBucket: "eve-2c69b.appspot.com",
  messagingSenderId: "644593485622",
  appId: "1:644593485622:web:e66adfa8ff2177f5ec5597",
  measurementId: "G-KTJN2BKME0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
