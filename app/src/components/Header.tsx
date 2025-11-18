import { useUser } from "@/context/user.context";
import { isAuthenticated, logout } from "@/services/auth";
import { Role } from "@/types";
import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const AdminNavButtons = ({ pathName }: { pathName: string }) => (<>
  <Link to="/manage"> Manage</Link>
  <Link
    className={pathName === "/create" ? "active" : ""}
    to="/create"> Add
  </Link>
  <Link
    className={pathName === "/metrics" ? "active" : ""}
    to="/metrics">Metrics</Link></>
);

const LoginLink = ({ pathName }: { pathName: string }) => {
  return (
    <Link
      className={pathName === "/login" ? "active" : ""}
      to="/login"
    >
      Login
    </Link>)
}

const RegisterLink = ({ pathName }: { pathName: string }) => {
  return (<Link
    className={pathName === "/register" ? "active" : ""}
    to="/register"
  >
    Register
  </Link>
  )
}

const Actions = ({ authed, onLogout }: { authed: boolean; onLogout: () => void }) => (
  <div className="actions">
    {authed ? (
      <button className="btn btn-ghost" onClick={onLogout}>
        Logout
      </button>
    ) : (
      <span className="hint">Welcome</span>
    )}
  </div>
);

export default function Header() {
  const { firstName, role } = useUser();
  const location = useLocation();
  const navigate = useNavigate();
  const authed = isAuthenticated();
  const onLogout = () => {
    logout();
    navigate("/login");
  }



  return (
    <header className="header">
      <div className="brand">
        <span className="logo-dot" />
        <span className="brand-text">
          Optimize<span className="accent">Security</span>
        </span>
      </div>

      <nav className="nav">
        {!authed ? (
          <>
            <LoginLink pathName={location.pathname} />
            <RegisterLink pathName={location.pathname} />
          </>
        ) : (<>
          <span className="greeting"> Hello {firstName}! </span>
          {
            role === Role.Admin && (
              <AdminNavButtons pathName={location.pathname} />
            )
          }
        </>)}
      </nav>
      <Actions authed={authed} onLogout={onLogout} />
    </header>
  );
}
