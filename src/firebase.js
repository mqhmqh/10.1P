
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA1iA4449LZXzVQFPoCELwZ5R8kKJ2yq7g",
  authDomain: "sit313task.firebaseapp.com",
  projectId: "sit313task",
  storageBucket: "sit313task.appspot.com",
  messagingSenderId: "469066694659",
  appId: "1:469066694659:web:36b437f4cb3c44656c8e36",
  measurementId: "G-25XNWXVTCN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export default getFirestore();