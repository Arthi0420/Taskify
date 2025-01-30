// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"


const firebaseConfig = {
  apiKey: "AIzaSyB7JFfbZ4Eg11JqKk8ZuksViUF9zOnxXeQ",
  authDomain: "taskisy-app.firebaseapp.com",
  projectId: "taskisy-app",
  storageBucket: "taskisy-app.firebasestorage.app",
  messagingSenderId: "198731667906",
  appId: "1:198731667906:web:ae1a9bcf22700b8e951e5b",
  measurementId: "G-3ZLRTCSPE7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)


export default auth