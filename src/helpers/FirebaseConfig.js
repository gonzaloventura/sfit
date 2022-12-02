// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBb8IdR4Qz9vQeQLRvMqFheK7ndeJFoqNw",
  authDomain: "rueda-genomma.firebaseapp.com",
  projectId: "rueda-genomma",
  storageBucket: "rueda-genomma.appspot.com",
  messagingSenderId: "226975920157",
  appId: "1:226975920157:web:de88f12cc5c2668a8fd6f4"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db;