import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

export const firebaseConfig = {
    apiKey: "AIzaSyAlUSi_9xh6iX09ffXvHqMfepn4gPeL0b0",
    authDomain: "eliteeight-bcf40.firebaseapp.com",
    projectId: "eliteeight-bcf40",
    storageBucket: "eliteeight-bcf40.firebasestorage.app",
    messagingSenderId: "308207657981",
    appId: "1:308207657981:web:22ceaf005deb3ed873af94",
    measurementId: "G-T6QG5GG6RE"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
