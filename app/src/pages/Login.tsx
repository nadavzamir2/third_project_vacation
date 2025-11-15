import { FormEvent, useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { loginUser } from "@/services/auth";
import { Role } from "@/types";

export default function Login({ text }: { text?: string }) {
  const [email, setEmail] = useState("nadav.zamir@email.com");
  const [password, setPassword] = useState("nadav123");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { search } = useLocation();
  useEffect(() => {
    const params = new URLSearchParams(search);
    if (params.get("adminAccessRequired") === "true") {
      setError("Admin access required. Please log in.");
    }
  }
    , [search]);


  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      const user = await loginUser({ email, password });
      if (user.role === Role.Admin) {
        navigate("/manage", { replace: true });
      }
      else {
        navigate("/", { replace: true });
      }
    } catch (err: any) {
      setError(err?.message ?? "Login failed");
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
