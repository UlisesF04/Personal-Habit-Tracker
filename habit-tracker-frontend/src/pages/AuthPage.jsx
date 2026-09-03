import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import axiosClient from "../api/axiosClient";
import "./AuthPage.css";
import tw from "./authStyles.js";

const STRENGTH_COLORS = ["#1f2937", "#ef4444", "#f59e0b", "#10b981", "#36251E"];
const STRENGTH_LABELS = ["", "Weak", "Regular", "Good", "Excelent"];

function getPasswordStrength(pwd) {
  if (!pwd) return 0;
  let score = 0;
  if (pwd.length >= 8) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  return score;
}

function IconUser() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M4 20c0-4 3.6-7 8-7s8 3 8 7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconMail() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M2 8l10 6 10-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IconLock() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IconCheck() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconError() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function InputField({ label, icon, extraClass = "", ...inputProps }) {
  return (
    <div className={tw.fieldGroup}>
      <label className={`${tw.label} auth-label`}>{label}</label>
      <div className={tw.inputWrap}>
        <span className={tw.iconWrap}>{icon}</span>
        <input {...inputProps} className={`${tw.input} auth-input ${extraClass}`} />
      </div>
    </div>
  );
}

function Spinner() {
  return <span className="auth-spinner" />;
}

function ErrorBox({ message }) {
  if (!message) return null;
  return (
    <div className={`${tw.error} auth-error`}>
      <IconError />
      {message}
    </div>
  );
}

/* ── Single square forms ─────────────────────────────────────────────── */

function LoginSquare({ onSwitch }) {
  const { login } = useAuth();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form.username, form.password);
    } catch {
      setError("Wrong user or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="auth-square-header">
        <div className="auth-square-logo">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="#FAF3E0" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="#FAF3E0" strokeWidth="1.5" strokeLinejoin="round" />
          </svg>
        </div>
        <span className="auth-square-brand">Habitflow</span>
      </div>

      <h1 className="auth-square-title">Welcome back</h1>
      <p className="auth-square-subtitle">Sign in to continue</p>

      <form onSubmit={handleSubmit} className="auth-square-form">
        <InputField
          label="Username"
          icon={<IconUser />}
          type="text"
          placeholder="Your username"
          required
          value={form.username}
          onChange={handleChange("username")}
        />
        <InputField
          label="Password"
          icon={<IconLock />}
          type="password"
          placeholder="••••••••"
          required
          value={form.password}
          onChange={handleChange("password")}
        />
        <ErrorBox message={error} />
        <button type="submit" disabled={loading} className="auth-btn auth-btn-login auth-square-btn">
          {loading ? (
            <span className={tw.btnLoading}>
              <Spinner /> Signing in...
            </span>
          ) : (
            "Sign in"
          )}
        </button>
      </form>

      <p className="auth-switch-text">
        Don&apos;t have an account?{" "}
        <button type="button" onClick={onSwitch} className="auth-switch-link">
          Sign up
        </button>
      </p>
    </>
  );
}

function RegisterSquare({ onSwitch }) {
  const [form, setForm] = useState({ username: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const strength = getPasswordStrength(form.password);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      setError("Passwords don't match!");
      return;
    }
    setLoading(true);
    try {
      await axiosClient.post("/auth/register", {
        username: form.username,
        email: form.email,
        password: form.password,
      });
      setSuccess(true);
      setTimeout(() => onSwitch(), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Error signing up");
    } finally {
      setLoading(false);
    }
  };

  const confirmBorderClass = form.confirm ? (form.password === form.confirm ? "valid" : "invalid") : "";

  if (success) {
    return (
      <div className={tw.successWrap}>
        <div className={`${tw.successIcon} auth-success-icon`}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M20 6L9 17l-5-5" stroke="#FAF3E0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div className="text-center">
          <p className={`${tw.successTitle} auth-title`} style={{ color: "#36251E" }}>
            Account created!
          </p>
          <p className={tw.successSub}>Going back to login...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="auth-square-header">
        <div className="auth-square-logo">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="#FAF3E0" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="#FAF3E0" strokeWidth="1.5" strokeLinejoin="round" />
          </svg>
        </div>
        <span className="auth-square-brand">Habitflow</span>
      </div>

      <h1 className="auth-square-title">Create account</h1>
      <p className="auth-square-subtitle">Start building better habits today</p>

      <form onSubmit={handleSubmit} className="auth-square-form">
        <InputField
          label="Username"
          icon={<IconUser />}
          type="text"
          placeholder="Choose a username"
          required
          value={form.username}
          onChange={handleChange("username")}
        />
        <InputField
          label="Email"
          icon={<IconMail />}
          type="email"
          placeholder="you@email.com"
          required
          value={form.email}
          onChange={handleChange("email")}
        />
        <div className={tw.fieldGroup}>
          <label className={`${tw.label} auth-label`}>Password</label>
          <div className={tw.inputWrap}>
            <span className={tw.iconWrap}>
              <IconLock />
            </span>
            <input
              type="password"
              placeholder="••••••••"
              required
              value={form.password}
              onChange={handleChange("password")}
              className={`${tw.input} auth-input`}
            />
          </div>
          {form.password && (
            <div className={tw.strengthWrap}>
              <div className={tw.strengthBars}>
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="auth-strength-bar flex-1"
                    style={{
                      background: i <= strength ? STRENGTH_COLORS[strength] : "rgba(54,37,30,0.08)",
                    }}
                  />
                ))}
              </div>
              <span className={tw.strengthLbl} style={{ color: STRENGTH_COLORS[strength] }}>
                {STRENGTH_LABELS[strength]}
              </span>
            </div>
          )}
        </div>

        <div className={tw.fieldGroup}>
          <label className={`${tw.label} auth-label`}>Confirm password</label>
          <div className={tw.inputWrap}>
            <span className={tw.iconWrap}>
              <IconLock />
            </span>
            <input
              type="password"
              placeholder="••••••••"
              required
              value={form.confirm}
              onChange={handleChange("confirm")}
              className={`${tw.input} auth-input ${confirmBorderClass}`}
            />
            {form.confirm && form.password === form.confirm && (
              <span className={tw.iconRight}>
                <IconCheck />
              </span>
            )}
          </div>
        </div>

        <ErrorBox message={error} />

        <button type="submit" disabled={loading} className="auth-btn auth-btn-register auth-square-btn">
          {loading ? (
            <span className={tw.btnLoading}>
              <Spinner /> Creating account...
            </span>
          ) : (
            "Create account"
          )}
        </button>
      </form>

      <p className="auth-switch-text">
        Already have an account?{" "}
        <button type="button" onClick={onSwitch} className="auth-switch-link">
          Sign in
        </button>
      </p>
    </>
  );
}

export default function AuthPage() {
  const [displayMode, setDisplayMode] = useState("login");
  const [phase, setPhase] = useState("enter"); // 'idle' | 'exit' | 'enter'

  const switchMode = (target) => {
    if (target === displayMode || phase === "exit") return;
    setPhase("exit");
    setTimeout(() => {
      setDisplayMode(target);
      setPhase("enter");
      setTimeout(() => setPhase("idle"), 460);
    }, 280);
  };

  const isLogin = displayMode === "login";

  return (
    <div className="auth-page auth-single-page">
      <div className="auth-blob auth-blob-1" />
      <div className={`auth-blob auth-blob-2 mode-${displayMode}`} />
      <div className="auth-noise" />

      <div className="auth-single-wrapper">
        <div className={`auth-square ${phase === "exit" ? "square-exit" : phase === "enter" ? "square-enter" : ""}`}>
          {isLogin ? (
            <LoginSquare onSwitch={() => switchMode("register")} />
          ) : (
            <RegisterSquare onSwitch={() => switchMode("login")} />
          )}
        </div>
      </div>
    </div>
  );
}
