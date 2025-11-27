// firebase.js
import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyANWlZiX1E9Evrf50eKrgXsv2gcAlruFKk",
  authDomain: "agrismart-b5054.firebaseapp.com",
  projectId: "agrismart-b5054",
  storageBucket: "agrismart-b5054.firebasestorage.app",
  messagingSenderId: "1071335921406",
  appId: "1:1071335921406:web:1cb42f395c5e56d4c9b7af",
  measurementId: "G-9XGZ1S0P9N"
};

const existingApps = getApps();
const app = existingApps.length ? existingApps[0] : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export { app };
