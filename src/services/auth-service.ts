import {
  auth,
  db,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  addDoc,
  collection,
  GoogleAuthProvider,

} from "../firebase";
import {signInWithPopup} from "firebase/auth";


const logInWithEmailAndPassword = async (email: string, password: string) => {
    return await signInWithEmailAndPassword(auth, email, password);
};

const registerWithEmailAndPassword = async (name: string, email: string, password: string) => {

    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res?.user;
    if (user) {
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            name,
            email,
            scores: [
            ]
        });
    }
    return res;
};

// lets create for the google login

const loginUserWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const res = await signInWithPopup(auth, provider);
    const user = res?.user;
    if (user) {
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            name: user.displayName,
            email: user.email
        });
    }
    return res;
};
    


const logout = () => {
    signOut(auth);
};

export { logInWithEmailAndPassword, registerWithEmailAndPassword, loginUserWithGoogle, logout }