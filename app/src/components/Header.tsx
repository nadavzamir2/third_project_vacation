import { useUser } from "@/context/user.context";
import { isAuthenticated, logout } from "@/services/auth";
import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Header() {
  const { email } = useUser();
  const location = useLocation();
  const navigate = useNavigate();
  const authed = isAuthenticated();
  const onLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="brand">
        <span className="logo-dot" />
        <span className="brand-text">
          Optimize<span className="accent">Security</span>
        </span>
      </div>

      <nav className="nav">
        <Link to="/user"> {email ? email.split("@")?.[0] : ""}</Link>
        <Link
          className={location.pathname === "/data" ? "active" : ""}
          to="/data"
        >
          Data
        </Link>
        {!authed && (
          <>
            <Link
              className={location.pathname === "/login" ? "active" : ""}
              to="/login"
            >
              Login
            </Link>
            <Link
              className={location.pathname === "/register" ? "active" : ""}
              to="/register"
            >
              Register
            </Link>
          </>
        )}
      </nav>
      <div className="actions">
        {authed ? (
          <button className="btn btn-ghost" onClick={onLogout}>
            Logout
          </button>
        ) : (
          <span className="hint">Welcome</span>
        )}
      </div>
    </header>
  );
}
