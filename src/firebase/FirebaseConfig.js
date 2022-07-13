import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCfcJOWB2uHmVDcoxyZj1aIf0PuGa5pZCQ",
  authDomain: "react-admin-demo-69c8b.firebaseapp.com",
  projectId: "react-admin-demo-69c8b",
  storageBucket: "react-admin-demo-69c8b.appspot.com",
  messagingSenderId: "537365635427",
  appId: "1:537365635427:web:6442a7e563a90f526ab356",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
