// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJ4iqXSjWTta_YRUIRq9XPFZ-SwdE3P0M",
  authDomain: "duc-event.firebaseapp.com",
  projectId: "duc-event",
  storageBucket: "duc-event.appspot.com",
  messagingSenderId: "513459457850",
  appId: "1:513459457850:web:f0a3524599127ed4c44a03",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
export default db;
