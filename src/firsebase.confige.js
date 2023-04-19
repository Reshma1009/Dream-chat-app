// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCYycMnXygjeJelSs723EvECG6WUUCkn_8",
  authDomain: "dream-chat-app-7a9a1.firebaseapp.com",
  projectId: "dream-chat-app-7a9a1",
  storageBucket: "dream-chat-app-7a9a1.appspot.com",
  messagingSenderId: "632103302719",
  appId: "1:632103302719:web:7265870daa161eded26a8a",
};

// Initialize Firebase
const app = initializeApp( firebaseConfig );
const auth=getAuth(app)
const db = getDatabase( app );
export { auth, db };
export default firebaseConfig;