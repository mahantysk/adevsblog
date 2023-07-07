import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCakdGBcnG8t5hmYFjZ6vmRLxJkbygAn0s",
  authDomain: "adevsblog-fc62b-34a5d.firebaseapp.com",
  projectId: "adevsblog-fc62b",
  storageBucket: "adevsblog-fc62b.appspot.com",
  messagingSenderId: "976321039088",
  appId: "1:976321039088:web:3b01071336624994875035",
  measurementId: "G-JRS692SMNW",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
export { app, auth, db, analytics };
