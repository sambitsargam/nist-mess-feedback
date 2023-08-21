
import { initializeApp } from "firebase/app";
import {
    GoogleAuthProvider,
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import {
    getFirestore,
    query,
    getDocs,
    collection,
    where,
    addDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD57txGXb5rj8MnP2Sz0wCXsukWjnBGY1U",
  authDomain: "nist-mess.firebaseapp.com",
  projectId: "nist-mess",
  storageBucket: "nist-mess.appspot.com",
  messagingSenderId: "287908041923",
  appId: "1:287908041923:web:c66d12c8b09c828b7cbe76",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {
    auth,
    db,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    addDoc,
    query,
    getDocs,
    collection,
    where,
};