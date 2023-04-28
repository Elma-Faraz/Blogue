// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider}  from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCsOrnEUAhKQyGrQWE7Zgn_0uq3wYLS3AI",
  authDomain: "main-project-80693.firebaseapp.com",
  projectId: "main-project-80693",
  storageBucket: "main-project-80693.appspot.com",
  messagingSenderId: "611273271832",
  appId: "1:611273271832:web:62baed6eff26f41714b16d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);