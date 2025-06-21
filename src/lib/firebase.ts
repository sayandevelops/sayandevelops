import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// --- IMPORTANT ---
// 1. Create a Firebase project at https://console.firebase.google.com/
// 2. Go to Project settings > General tab.
// 3. Under "Your apps", click the "Web" icon (</>) to register a new web app.
// 4. Copy the firebaseConfig object here.

const firebaseConfig = {
  // THIS IS SAMPLE CONFIG. REPLACE WITH YOUR OWN.
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abc123def456"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
