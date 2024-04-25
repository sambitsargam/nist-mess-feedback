
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
  apiKey: "AIzaSyC7b6ScU0wxxd4Qy5ZdNNOXZ9RIfl5UK2E",
  authDomain: "nist-messss.firebaseapp.com",
  databaseURL: "https://nist-messss-default-rtdb.firebaseio.com",
  projectId: "nist-messss",
  storageBucket: "nist-messss.appspot.com",
  messagingSenderId: "19227464249",
  appId: "1:19227464249:web:c6231050fc10003981b3e8"
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
