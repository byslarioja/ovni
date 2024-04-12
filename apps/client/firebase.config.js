// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQ6XJfjIyEbJmrUw9ohIOdhaCqc2EJZC8",
  authDomain: "ovni-d0e7b.firebaseapp.com",
  projectId: "ovni-d0e7b",
  storageBucket: "ovni-d0e7b.appspot.com",
  messagingSenderId: "573799368243",
  appId: "1:573799368243:web:313f6b6d1ecbd5f969c546",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
