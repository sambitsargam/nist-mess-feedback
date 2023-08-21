import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Auth/auth-context";
import { useTheme } from "../../context/Theme/theme-context";
import "./Navbar.css";

export function Navbar() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const { changeTheme } = useTheme();
  const userHandler = () => {
    token ? navigate("/user-profile") : navigate("/sign-in");
  };
  return (
    <div className="navbar nav-fixed">
      <div className="navbar-left">
        <Link to="/">
          <h3 className="nav-title" title="Home">
            Quiz Me
          </h3>
        </Link>
      </div>
      <div className="navbar-right">
        <div>
          <Link to="/dashboard">
            <h5 className="dashboard-text">Dashboard</h5>
          </Link>
        </div>
        <i
          className="fa fa-moon-o profile-icon"
          aria-hidden="true"
          onClick={() => changeTheme()}
        ></i>
        <i
          className="fa fa-user-circle profile-icon"
          aria-hidden="true"
          title="Your Account"
          onClick={userHandler}
        ></i>
      </div>
    </div>
  );
}
