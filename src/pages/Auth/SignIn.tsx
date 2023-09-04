import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Auth/auth-context";
import "./Auth.css";
import GoogleButton from 'react-google-button'


export function SignIn() {
  const { loginUserWithGoogle, token } = useAuth();
  const navigate = useNavigate();

  // eslint-disable-next-line
  
  if (token) {
    setTimeout(() => {
      navigate("/");
    }, 1000);
  }

  return (
    <div className="auth-container flex-center">
      <div className=" flex-center">
      

          <GoogleButton onClick={loginUserWithGoogle}/>
      </div>
    </div>
  );
}
