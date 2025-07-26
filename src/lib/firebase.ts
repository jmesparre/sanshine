import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBDV0gEhTMZDpqxoGkR9vUtODEMzTOsvKI",
  authDomain: "sanshine-6e76f.firebaseapp.com",
  projectId: "sanshine-6e76f",
  storageBucket: "sanshine-6e76f.firebasestorage.app",
  messagingSenderId: "82098342907",
  appId: "1:82098342907:web:1f0bdd3a4d25a82c5b195e",
  measurementId: "G-9HCY94W11B"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}


export { app, auth, db, analytics };
