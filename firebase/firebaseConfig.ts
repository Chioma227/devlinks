// firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase, ref as dbRef, set } from 'firebase/database';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAQ5O8ENuxPRxu-jfJBl0XstE3zqFoQB2Y",
    authDomain: "devlinks-8b778.firebaseapp.com",
    projectId: "devlinks-8b778",
    storageBucket: "devlinks-8b778.appspot.com",
    messagingSenderId: "1014045764284",
    appId: "1:1014045764284:web:3737c231b80619bff13eb9"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app)
const storage = getStorage(app);
const database = getDatabase(app);

export { auth, createUserWithEmailAndPassword, database, db, storage, signInWithEmailAndPassword };
