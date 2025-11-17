import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, createUser as registerUser } from "@/services/auth";
import { useEmailField } from "./hooks/fields/useEmailField";
import { usePasswordField } from "./hooks/fields/usePasswordField";
import { Role } from "@/types";


export default function RegisterPage() {
  const { email, onEmailChange, emailError } = useEmailField("");
  const { password, onPasswordChange, passwordError } = usePasswordField("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      await registerUser();
      const user = await loginUser({ email, password });
      if (user.role === Role.Admin) {
        navigate("/manage", { replace: true });
      }
      else {
        navigate("/", { replace: true });
      }
    } catch (err: any) {
      setError(err?.message ?? "Registration failed");
    }
  }

  return (
    <div className="login-page">
      <section className="login-card">
        <h2>Register</h2>
        <form className="form" onSubmit={onSubmit}>
          <label>
            Email
            <input
              type="text"
              value={email}
              onChange={(e) => onEmailChange(e.target.value)}
              required
            />
            {emailError && <div className="error">{emailError}</div>}
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => onPasswordChange(e.target.value)}
              required
            />
            {passwordError && <div className="error">{passwordError}</div>}
          </label>
          {error && <div className="error">{error}</div>}
          <button className="btn" type="submit">
            Create Account
          </button>
        </form>
        <p className="muted">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </section>
    </div>
  );
}
