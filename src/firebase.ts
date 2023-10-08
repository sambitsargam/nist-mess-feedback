
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
    apiKey: "AIzaSyBLe37o35-qGMhG6fv7WNVL68UqLgyrlNM",
    authDomain: "nistmess.firebaseapp.com",
    databaseURL: "https://nistmess-default-rtdb.firebaseio.com",
    projectId: "nistmess",
    storageBucket: "nistmess.appspot.com",
    messagingSenderId: "496484191548",
    appId: "1:496484191548:web:80d8998c2daf1276756239",
    measurementId: "G-RTGRJTR9JC"
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