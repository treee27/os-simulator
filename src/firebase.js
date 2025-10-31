import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAZsMRIRQlpnD7H2xoEmlXZJxaiRbKKUts",
  authDomain: "os-simulator-9ed69.firebaseapp.com",
  projectId: "os-simulator-9ed69",
  storageBucket: "os-simulator-9ed69.firebasestorage.app",
  messagingSenderId: "744819068005",
  appId: "1:744819068005:web:329d0a68d98c3734c58a8c",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
