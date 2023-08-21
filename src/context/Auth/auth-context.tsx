import { createContext, useContext, useEffect, useState } from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import {
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
} from "../../services/auth-service";
import { AuthContextType } from "../../types/authcontext.types";
import { toast } from "react-toastify";
import { collection, addDoc, db, getDocs, query, where } from "../../firebase";

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const localStorageToken = localStorage.getItem("token");
  const [token, setToken] = useState(localStorageToken);
  const localStorageUser = localStorage.getItem("user");
  const [user, setUser] = useState(localStorageUser);
  const [userInfo, setUserInfo] = useState({ name: "", email: "",photo: "", scores: [] });

  useEffect(() => {
    if (token && user) {
      (async () => {
        const q = query(collection(db, "users"), where("uid", "==", user));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          const userObj: any = doc.data();
          setUserInfo(userObj);
        });
      })();
    }
  }, [token, user]);

  const loginUser = async (email: string, password: string) => {
    if (email && password !== "") {
      try {
        const authRes = await logInWithEmailAndPassword(email, password);
        const user: any = authRes?.user;
        if (user) {
          localStorage.setItem("token", user.accessToken);
          localStorage.setItem("user", user.uid);
          setToken(user.accessToken);
          setUser(user.uid);
          toast.success(`Logged In Successfully!`);
        }
      } catch (error: any) {
        const msg = error.message
          .match(/\/(\S+)[)]./i)[1]
          .replace(/-/g, " ")
          .toUpperCase();
        toast.error(`${msg} !`);
        console.log(error.message);
      }
    }
  };

  const signUpUser = async (name: string, email: string, password: string) => {
    try {
      const authRes = await registerWithEmailAndPassword(name, email, password);
      const user: any = authRes?.user;
      if (user) {
        localStorage.setItem("token", user.accessToken);
        localStorage.setItem("user", user.uid);
        setToken(user.accessToken);
        setUser(user.uid);
        toast.success(`Account Created Successfully!`);
      }
    } catch (error: any) {
      const msg = error.message
        .match(/\/(\S+)[)]./i)[1]
        .replace(/-/g, " ")
        .toUpperCase();
      toast.error(`${msg} !`);
      console.log(error.message);
    }
  };
const loginUserWithGoogle = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ hd: "nist.edu" });
      const result = await signInWithPopup(auth, provider);
      const user: any = result.user;
      if (user) {
        localStorage.setItem("token", user.accessToken);
        localStorage.setItem("user", user.uid);
        setToken(user.accessToken);
        setUser(user.uid);
        toast.success(`Logged In Successfully using Google!`);
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            name: user.displayName,
            email: user.email,
            photo: user.photoURL,
            scores: [
            ]
        });
      }
    } catch (error: any) {
      const msg = error.message
        .match(/\/(\S+)[)]./i)[1]
        .replace(/-/g, " ")
        .toUpperCase();
      toast.error(`${msg} !`);
      console.log(error.message);
    }
  };
 return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        user,
        setUser,
        loginUser,
        signUpUser,
        loginUserWithGoogle,
        userInfo,
        setUserInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);
export { useAuth, AuthProvider };