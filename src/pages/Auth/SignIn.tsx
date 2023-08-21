import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Auth/auth-context";
import "./Auth.css";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      <div className="auth-main-container flex-center">
        <div className="auth-title">
          <h2 className="text-center">Sign In</h2>
        </div>
        <div className="auth-main">
          <div className="auth-email">
            <label htmlFor="mail">Email Address</label>
            <input
              placeholder="test@gmail.com"
              value={email}
              className="text-input"
              type="text"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="auth-pwd">
            <label htmlFor="pwd">Password</label>
            <input
              placeholder="***********"
              value={password}
              className="pwd-input"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="primary-btn text-center">
            <button className="link-btn" onClick={loginUserWithGoogle}>
              Login
            </button>
          </div>
          <div className="auth-secondary-btn text-center">
            <Link to="/sign-up">
              Create New Account <i className="fa fa-chevron-right" aria-hidden="true"></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
