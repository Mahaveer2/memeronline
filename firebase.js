import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyDbo63584LL4hgNZ21t8295wtVEUR5UXZc",
  authDomain: "memer-ab39f.firebaseapp.com",
  projectId: "memer-ab39f",
  storageBucket: "memer-ab39f.appspot.com",
  messagingSenderId: "118332949054",
  appId: "1:118332949054:web:20e98d2684c6dbaf1a876f",
  measurementId: "G-94HWCQDQ8C"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export default app;
export { db, storage };