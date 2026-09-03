import { useNavigate } from "react-router-dom";
import "./LandingPage.css";
import calendarImg from "../assets/calendar_image.png";
import habitsImg from "../assets/habits_image.png";

function IconCheck() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconLayers() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

const calendarFeatures = [
  { title: "7-day completion rate", desc: "See your consistency over the last 7 days for each habit at a glance." },
  { title: "30-day overview", desc: "Track longer trends and spot patterns across the past month." },
  { title: "Current & best streaks", desc: "Stay motivated with automatic streak counting and personal records." },
  { title: "Calendar history", desc: "Visual daily completion log — never lose track of your progress in time." },
];

const habitFeatures = [
  { title: "Create habits your way", desc: "Add a name, description and frequency — daily, weekly or custom." },
  { title: "One-tap daily completion", desc: "Mark a habit as done for today and keep your streak alive." },
  { title: "Completion percentage", desc: "Instant stats per habit and an average consistency for your dashboard." },
  { title: "Edit & manage effortlessly", desc: "Update details or remove habits — your data stays clean and personal." },
  { title: "Dashboard insights", desc: "Total habits, completed today, longest streak and more in one view." },
];

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <div className="landing-blob landing-blob-1" />
      <div className="landing-blob landing-blob-2" />
      <div className="landing-noise" />

      <header className="landing-header">
        <div className="landing-header-inner">
          <div className="landing-logo" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
            <div className="landing-logo-icon">
              <IconLayers />
            </div>
            <span className="landing-logo-text">Habitflow</span>
          </div>
          <button className="landing-header-btn" onClick={() => navigate("/auth")}>
            Join In
          </button>
        </div>
      </header>

      <main className="landing-main">
        {/* Hero */}
        <section className="landing-hero landing-fade-up">
          <h1 className="landing-title">
            HabitFlow <span className="landing-title-accent">—</span> the personal tracker for your healthy habits
          </h1>
          <p className="landing-subtitle">
            Build routines that stick. Track daily habits, keep your streaks alive and watch your consistency grow — all in a warm, minimal space designed to feel like home.
          </p>
        </section>

        {/* Calendar section: list left, image right */}
        <section className="landing-section">
          <div className="landing-grid">
            <div className="landing-text-col landing-fade-up" style={{ animationDelay: "0.08s" }}>
              <p className="landing-eyebrow">Time & Calendar</p>
              <h2 className="landing-section-title">Stay on track with your time</h2>
              <p className="landing-section-sub">Your habits live in time — HabitFlow makes every day visible and meaningful.</p>
              <ul className="landing-feature-list">
                {calendarFeatures.map((f) => (
                  <li key={f.title} className="landing-feature-item">
                    <span className="landing-feature-icon">
                      <IconCheck />
                    </span>
                    <div>
                      <p className="landing-feature-title">{f.title}</p>
                      <p className="landing-feature-desc">{f.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="landing-image-col landing-fade-up" style={{ animationDelay: "0.16s" }}>
              <div className="landing-image-card">
                <img src={calendarImg} alt="Calendar view of habit completion" className="landing-image" />
              </div>
            </div>
          </div>
        </section>

        {/* Habits section: image left, list right */}
        <section className="landing-section">
          <div className="landing-grid reverse">
            <div className="landing-image-col landing-fade-up" style={{ animationDelay: "0.08s" }}>
              <div className="landing-image-card">
                <img src={habitsImg} alt="Habits creation and tracking" className="landing-image" />
              </div>
            </div>
            <div className="landing-text-col landing-fade-up" style={{ animationDelay: "0.16s" }}>
              <p className="landing-eyebrow">Habits</p>
              <h2 className="landing-section-title">Create and track habits that matter</h2>
              <p className="landing-section-sub">Everything you need to start small, stay consistent and see real progress.</p>
              <ul className="landing-feature-list">
                {habitFeatures.map((f) => (
                  <li key={f.title} className="landing-feature-item">
                    <span className="landing-feature-icon">
                      <IconCheck />
                    </span>
                    <div>
                      <p className="landing-feature-title">{f.title}</p>
                      <p className="landing-feature-desc">{f.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="landing-cta landing-fade-up" style={{ animationDelay: "0.2s" }}>
          <h2 className="landing-cta-title">Ready to build a healthier routine?</h2>
          <p className="landing-cta-sub">Join HabitFlow today — create your first habit in seconds and feel the progress day after day.</p>
          <button className="landing-cta-btn" onClick={() => navigate("/auth")}>
            Join In
          </button>
        </section>
      </main>

      <footer className="landing-footer">
        <p>© {new Date().getFullYear()} HabitFlow — Your personal healthy habits tracker</p>
      </footer>
    </div>
  );
}
