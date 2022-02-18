// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDxjFTQ-TEP7I2HHUXqAqn3yuOec2DoFow",
  authDomain: "artmart-93ab2.firebaseapp.com",
  projectId: "artmart-93ab2",
  storageBucket: "artmart-93ab2.appspot.com",
  messagingSenderId: "631180823774",
  appId: "1:631180823774:web:a1e554578a06354326864f"
};

// Initialize Firebase
initializeApp(firebaseConfig)
export const db = getFirestore()