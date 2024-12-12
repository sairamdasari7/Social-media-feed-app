import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyByVsI3_2hbx1cAoXwE-qv8vQAgC4IdnVo",
  authDomain: "social-media-feed-app-cea49.firebaseapp.com",
  projectId: "social-media-feed-app-cea49",
  storageBucket: "social-media-feed-app-cea49.firebasestorage.app",
  messagingSenderId: "810478302382",
  appId: "1:810478302382:web:c169acffaf19c9069c293f",
  measurementId: "G-R1XZFWM4TD"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
