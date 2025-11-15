import { FormEvent, useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import api from "@/services/api";

export default function Login({text}: {text?: string}) {
  const [email, setEmail] = useState("nadav.zamir@email.com");
  const [password, setPassword] = useState("nadav123");
  const [error, setError] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
  const [counter, setCounter] = useState(0);
  const navigate = useNavigate();
  const location = useLocation() as any;

  useEffect(() => {
    console.log("Login attempts:", counter);
    if (counter > 2) {
      setNotification("Too many failed attempts. Please try again later.");
      return;
    }
  }, [counter]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      await loginUser({ email, password });
      navigate("/", { replace: true });
    } catch (err: any) {
      setError(err?.message ?? "Login failed");
    }
  }

  const loginUser = async ({email, password}: {email: string, password: string}) => {
    setCounter(counter + 1);
    try {
    const result = await api.post("/login", { email, password });
    localStorage.setItem("token", result.data.token);
    localStorage.setItem("user", JSON.stringify(result.data.user));
    return result;
    } catch (error) {
      throw new Error("Invalid email or password");
    }
  }

  return (
    <div className="login-page">
      <section className="login-card">
        <h2>Login {text}</h2>
        <form className="form" onSubmit={onSubmit}>
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          {error && <div className="error">{error}</div>}
          {notification && <div className="notification">{notification}</div>}
          <button className="btn" type="submit">
            Sign In
          </button>
        </form>
        <p className="muted">
          No account? <Link to="/register">Register</Link>
        </p>
      </section>
    </div>
  );
}
