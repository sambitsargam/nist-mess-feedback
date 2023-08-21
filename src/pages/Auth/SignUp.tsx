import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Auth/auth-context";
import { useQuiz } from "../../context/Quiz/quiz-context";
import "./Auth.css";

export function SignUp() {
  const signUp = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };
  const [form, setForm] = useState(signUp);
  const { signUpUser, token } = useAuth();
  const { setLoader } = useQuiz();
  const navigate = useNavigate();

  const signUpHandler = async () => {
    if (form.firstName !== "" && form.lastName !== "" && form.email !== "" && form.password !== "")
      await signUpUser(`${form.firstName} ${form.lastName}`, form.email, form.password);
    setForm(signUp);
  };

  if (token) {
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
      navigate("/");
    }, 1000);
  }
  return (
    <div className="auth-container flex-center">
      <div className="auth-main-container flex-center">
        <div className="auth-title">
          <h2 className="text-center">Sign Up</h2>
        </div>
        <div className="auth-main">
          <div className="sign-up-wrapper">
            <div className="auth-firstname">
              <label htmlFor="firstname">First Name</label>
              <input
                placeholder="Test"
                className="text-input"
                type="text"
                value={form.firstName}
                onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                required
              />
            </div>
            <div className="auth-lastname">
              <label htmlFor="lastname">Last Name</label>
              <input
                placeholder="Admin"
                className="text-input"
                type="text"
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="auth-email">
            <label htmlFor="mail">Email Address</label>
            <input
              placeholder="test@gmail.com"
              className="text-input"
              type="text"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
          <div className="auth-pwd">
            <label htmlFor="pwd">Password</label>
            <input
              placeholder="***********"
              className="pwd-input"
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>
          <div className="primary-btn text-center">
            <button className="link-btn" onClick={signUpHandler}>
              Create New Account
            </button>
          </div>
          <div className="auth-secondary-btn text-center">
            <Link to="/sign-in">
              Already have an account <i className="fa fa-chevron-right" aria-hidden="true"></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
