// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDYy98kLxtEwuFsQWj6CqDNLZaViZGzMf4",
  authDomain: "tutorial-d1c88.firebaseapp.com",
  projectId: "tutorial-d1c88",
  storageBucket: "tutorial-d1c88.firebasestorage.app",
  messagingSenderId: "873217094188",
  appId: "1:873217094188:web:9105b84a832d1512e31789",
  measurementId: "G-TSMZYSK4ZQ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);