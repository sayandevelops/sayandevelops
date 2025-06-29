
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA67-Fy4JXZcq0obnckBoOVuowvn3vykjc",
  authDomain: "myauthproject-70650.firebaseapp.com",
  projectId: "myauthproject-70650",
  storageBucket: "myauthproject-70650.appspot.com",
  messagingSenderId: "662773446818",
  appId: "1:662773446818:web:006a8ff87790acd4f2fffb",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
