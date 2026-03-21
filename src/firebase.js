import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup as firebaseSignInWithPopup, signOut as firebaseSignOut } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || import.meta.env.VITE_GOOGLE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
let auth;
let googleProvider;
let analytics;
let db;
let storage;
let signInWithPopup = () => Promise.reject(new Error("Auth not initialized"));
let signOut = () => Promise.resolve();

try {
    if (!firebaseConfig.apiKey || firebaseConfig.apiKey === 'undefined') {
        throw new Error('Firebase API Key is missing');
    }
    const app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    analytics = getAnalytics(app);
    db = getFirestore(app);
    storage = getStorage(app);
    googleProvider = new GoogleAuthProvider();
    signInWithPopup = firebaseSignInWithPopup;
    signOut = firebaseSignOut;
} catch (error) {
    console.error("Firebase Initialization Error:", error.message);
    auth = { onAuthStateChanged: (cb) => { cb(null); return () => { }; } };
    googleProvider = {};
    analytics = {};
    db = null;
    storage = null;
}

export { auth, googleProvider, signInWithPopup, signOut, analytics, db, storage };
