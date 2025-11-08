import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDXMnVL8qydeD7wPQneh0KETbUyZFeINGE",
  authDomain: "pera-6d85b.firebaseapp.com",
  projectId: "pera-6d85b",
  storageBucket: "pera-6d85b.firebasestorage.app",
  messagingSenderId: "571094808591",
  appId: "1:571094808591:web:580d5e01227749227c0b7a",
  measurementId: "G-L7LVY6CT4V",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)

