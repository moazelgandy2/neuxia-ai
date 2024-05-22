// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKl1LSdTF1wdduNgpuYx_5ciTS8C4teeE",
  authDomain: "neuxia-81225.firebaseapp.com",
  projectId: "neuxia-81225",
  storageBucket: "neuxia-81225.appspot.com",
  messagingSenderId: "1048251718886",
  appId: "1:1048251718886:web:f91e9c5c9f11ed2705af27",
  measurementId: "G-4LLTY10G29",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
