// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCaVqg5rLs-RRwkOIz694eXCY8FzsLtCys",
  authDomain: "test-ca96b.firebaseapp.com",
  projectId: "test-ca96b",
  storageBucket: "test-ca96b.firebasestorage.app",
  messagingSenderId: "370829647677",
  appId: "1:370829647677:web:84a1493e0d33bc30432f54",
  measurementId: "G-Q5T0HKQFWH",
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
