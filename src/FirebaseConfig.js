// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBSU-ZB56vLY_g7ZJURgHRXNWP_9fGaVLk",
    authDomain: "rueda-santa-fe.firebaseapp.com",
    projectId: "rueda-santa-fe",
    storageBucket: "rueda-santa-fe.appspot.com",
    messagingSenderId: "362408982563",
    appId: "1:362408982563:web:96cedbc6798f87cfd21996"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db;