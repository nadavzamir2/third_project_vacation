import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUser, loginUser } from "@/services/auth";
import { useEmailField } from "./hooks/fields/useEmailField";
import { usePasswordField } from "./hooks/fields/usePasswordField";
import { Role } from "@/types";
import { useLastNameField } from "./hooks/fields/useLastNameField";
import { useFirstNameField } from "./hooks/fields/useFirstNameField";


export default function RegisterPage() {
  const {firstName, onFirstNameChange, firstNameError} = useFirstNameField("");
  const {lastName, onLastNameChange, lastNameError} = useLastNameField("");
  const { email, onEmailChange, emailError } = useEmailField("");
  const { password, onPasswordChange, passwordError } = usePasswordField("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const isDisabled= firstNameError || lastNameError || emailError || passwordError ? true : false;

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (isDisabled) {
      return;
    }
    try {
      const user = await createUser({ firstName, lastName, email, password });
      await loginUser({ email, password });
      if (user.role === Role.Admin) {
        navigate("/manage", { replace: true });
      }
      else {
        navigate("/vacations", { replace: true });
      }
    } catch (err: any) {
      setError(err?.message ?? "Registration failed");
    }
  }

  return (
    <div className="login-page">
      <section className="register-card">
        <h2>Register</h2>
        <form className="form" onSubmit={onSubmit}>
          <label>
            First Name
            <input
              type="text"
              value={firstName}
              onChange={(e) => onFirstNameChange(e.target.value)}
              required
            />
            {firstNameError && <div className="error">{firstNameError}</div>}
          </label>
           <label>
            Last Name
            <input
              type="text"
              value={lastName}
              onChange={(e) => onLastNameChange(e.target.value)}
              required
            />
            {lastNameError && <div className="error">{lastNameError}</div>}
          </label>
          
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
          <button className="btn signin-btn" type="submit" disabled={isDisabled} >
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
  