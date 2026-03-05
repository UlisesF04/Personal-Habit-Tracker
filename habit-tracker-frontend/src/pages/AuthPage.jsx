import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import axiosClient from "../api/axiosClient";
import { useNavigate } from "react-router-dom";
import "./AuthPage.css";
import tw from "./authStyles.js";

const STRENGTH_COLORS = ["#1f2937", "#ef4444", "#f59e0b", "#10b981", "#22d3ee"];
const STRENGTH_LABELS = ["", "Weak", "Regular", "Good", "Excelent"];

const DECOR_FEATURES = {
  login: ["Diary Streaks", "Detailed Statistics", "Personal Dashboard"],
  register: ["Completely Free!", "Unlimited Follow Up", "Visual Progress"],
};

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
      <rect
        x="2"
        y="4"
        width="20"
        height="16"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M2 8l10 6 10-6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconLock() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
      <rect
        x="3"
        y="11"
        width="18"
        height="11"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M7 11V7a5 5 0 0 1 10 0v4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconCheck() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path
        d="M20 6L9 17l-5-5"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconError() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M12 8v4M12 16h.01"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function InputField({
  label,
  icon,
  extraClass = "",
  delay = "d3",
  ...inputProps
}) {
  return (
    <div className={`${tw.fieldGroup} fade-up fade-up-${delay}`}>
      <label className={`${tw.label} auth-label`}>{label}</label>
      <div className={tw.inputWrap}>
        <span className={tw.iconWrap}>{icon}</span>
        <input
          {...inputProps}
          className={`${tw.input} auth-input ${extraClass}`}
        />
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

function DecorPanel({ mode }) {
  return (
    <div className={tw.decorInner}>
      <div className={`${tw.decorGrid} auth-decor-grid`} />

      <div className={`${tw.decorOrb} auth-decor-orb mode-${mode}`} />

      <div className={`${tw.decorContent} fade-up fade-up-d2`}>
        <div className={`auth-decor-number mode-${mode}`}>
          {mode === "login" ? "01" : "02"}
        </div>
        <div className={tw.decorSub}>
          {mode === "login" ? "Access" : "New Account"}
        </div>
      </div>

      <div className={`${tw.decorPills} fade-up fade-up-d4`}>
        {DECOR_FEATURES[mode].map((text) => (
          <div key={text} className={`${tw.decorPill} auth-decor-pill`}>
            <span className={`auth-decor-dot mode-${mode}`} />
            <span className={tw.decorText}>{text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function LoginForm({ onSwitch }) {
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
    <form onSubmit={handleSubmit} className={tw.form}>
      <div className="fade-up fade-up-d3">
        <h1 className={`${tw.title} auth-title`}>Welcome Back</h1>
        <p className={tw.subtitle}>Sign In</p>
      </div>

      <InputField
        label="User"
        icon={<IconUser />}
        delay="d4"
        type="text"
        placeholder="Your User"
        required
        value={form.username}
        onChange={handleChange("username")}
      />

      <InputField
        label="Password"
        icon={<IconLock />}
        delay="d5"
        type="password"
        placeholder="••••••••"
        required
        value={form.password}
        onChange={handleChange("password")}
      />

      <ErrorBox message={error} />

      <button
        type="submit"
        disabled={loading}
        className={`${tw.btn} auth-btn auth-btn-login fade-up fade-up-d6`}
      >
        {loading ? (
          <span className={tw.btnLoading}>
            <Spinner /> Signing in...
          </span>
        ) : (
          "Sign In"
        )}
      </button>

      <p className={`${tw.footerHint} fade-up fade-up-d7`}>
        You don't have an account?{" "}
        <button
          type="button"
          onClick={onSwitch}
          className={`${tw.footerLink} text-cyan-400 hover:text-cyan-300`}
        >
          Sign Up
        </button>
      </p>
    </form>
  );
}

function RegisterForm({ onSwitch }) {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirm: "",
  });
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
      setTimeout(() => onSwitch(), 2200);
    } catch (err) {
      setError(err.response?.data?.message || "Error signing up");
    } finally {
      setLoading(false);
    }
  };

  const confirmBorderClass = form.confirm
    ? form.password === form.confirm
      ? "valid"
      : "invalid"
    : "";

  if (success) {
    return (
      <div className={tw.successWrap}>
        <div className={`${tw.successIcon} auth-success-icon`}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path
              d="M20 6L9 17l-5-5"
              stroke="#10b981"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="text-center">
          <p className={`${tw.successTitle} auth-title`}>¡Account Created!</p>
          <p className={tw.successSub}>Going back to login...</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={tw.formRegister}>
      <div className="fade-up fade-up-d3">
        <h1 className={`${tw.title} auth-title`}>Create Account</h1>
        <p className={tw.subtitle}>Start building better habits today!</p>
      </div>

      <InputField
        label="User"
        icon={<IconUser />}
        delay="d4"
        type="text"
        placeholder="Your Username"
        required
        value={form.username}
        onChange={handleChange("username")}
      />

      <InputField
        label="Email"
        icon={<IconMail />}
        delay="d5"
        type="email"
        placeholder="tu@email.com"
        required
        value={form.email}
        onChange={handleChange("email")}
      />

      {/* Password + strength bar */}
      <div className={`${tw.fieldGroup} fade-up fade-up-d6`}>
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
                    background:
                      i <= strength
                        ? STRENGTH_COLORS[strength]
                        : "rgba(255,255,255,0.07)",
                  }}
                />
              ))}
            </div>
            <span
              className={tw.strengthLbl}
              style={{ color: STRENGTH_COLORS[strength] }}
            >
              {STRENGTH_LABELS[strength]}
            </span>
          </div>
        )}
      </div>

      {/* Confirm password */}
      <div className={`${tw.fieldGroup} fade-up fade-up-d7`}>
        <label className={`${tw.label} auth-label`}>Confirm Password</label>
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

      <button
        type="submit"
        disabled={loading}
        className={`${tw.btn} auth-btn auth-btn-register fade-up fade-up-d8`}
      >
        {loading ? (
          <span className={tw.btnLoading}>
            <Spinner /> Creating Account...
          </span>
        ) : (
          "Create Account"
        )}
      </button>

      <p className={`${tw.footerHint} fade-up fade-up-d8`}>
        You have an account?{" "}
        <button
          type="button"
          onClick={onSwitch}
          className={`${tw.footerLink} text-violet-400 hover:text-violet-300`}
        >
          Sign In
        </button>
      </p>
    </form>
  );
}

export default function AuthPage() {
  const [mode, setMode] = useState("login");
  const [sliding, setSliding] = useState(false);
  const [slideDir, setSlideDir] = useState(1);

  const switchMode = (target) => {
    if (sliding || target === mode) return;
    setSlideDir(target === "register" ? 1 : -1);
    setSliding(true);
    setTimeout(() => {
      setMode(target);
      setSliding(false);
    }, 420);
  };

  const isLogin = mode === "login";

  return (
    <div className={`${tw.page} auth-page`}>
      {/* Ambient blobs */}
      <div className={`${tw.blob} auth-blob-1`} />
      <div className={`${tw.blob} auth-blob-2 mode-${mode}`} />
      <div className={`${tw.noise} auth-noise`} />

      {/* Card */}
      <div className={`${tw.card} auth-card`}>
        <div className={tw.cardInner}>
          {/* Decorative panel */}
          <div
            className={`${tw.decorPanel} auth-decor-panel ${sliding ? "sliding" : ""}`}
            style={{
              transform: sliding
                ? `translateX(${slideDir * 40}px)`
                : "translateX(0)",
            }}
          >
            <DecorPanel mode={mode} />
          </div>

          {/* Form panel */}
          <div
            className={`${tw.formPanel} auth-form-panel ${sliding ? "sliding" : ""}`}
            style={{
              transform: sliding
                ? `translateX(${slideDir * -60}px)`
                : "translateX(0)",
            }}
          >
            {/* Brand */}
            <div className={`${tw.brand} fade-up fade-up-d1`}>
              <div className={`${tw.logoIcon} auth-logo-icon`}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2L2 7l10 5 10-5-10-5z"
                    stroke="#22d3ee"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 17l10 5 10-5M2 12l10 5 10-5"
                    stroke="#22d3ee"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className={`${tw.logoText} auth-logo-text`}>Habitflow</span>
            </div>

            {/* Tabs */}
            <div className={`${tw.tabs} auth-tabs fade-up fade-up-d2`}>
              {["login", "register"].map((m) => (
                <button
                  key={m}
                  onClick={() => switchMode(m)}
                  className={`${tw.tab} auth-tab ${mode === m ? "active" : "inactive"}`}
                >
                  {m === "login" ? "Sign In" : "Sign Up"}
                </button>
              ))}
            </div>

            {/* Form */}
            {isLogin ? (
              <LoginForm onSwitch={() => switchMode("register")} />
            ) : (
              <RegisterForm onSwitch={() => switchMode("login")} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
