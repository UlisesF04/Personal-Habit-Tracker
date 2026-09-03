import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import axiosClient from "../api/axiosClient";
import "./DashboardPage.css";

const IconLayers = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 2L2 7l10 5 10-5-10-5z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path
      d="M2 17l10 5 10-5M2 12l10 5 10-5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
);
const IconCheck = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path
      d="M20 6L9 17l-5-5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const IconFire = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 2c0 0-5 4-5 9a5 5 0 0010 0c0-2-1-4-2-5 0 2-1 3-2 3-1 0-1-2-1-7z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
);
const IconTrend = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path
      d="M3 17l4-4 4 4 4-5 4-3"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const IconPlus = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 5v14M5 12h14"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);
const IconEdit = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
    <path
      d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);
const IconTrash = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
    <path
      d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const IconLogout = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <path
      d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const IconClose = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path
      d="M18 6L6 18M6 6l12 12"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);
const IconRepeat = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
    <path
      d="M17 2l4 4-4 4M3 11V9a4 4 0 014-4h14M7 22l-4-4 4-4M21 13v2a4 4 0 01-4 4H3"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

function Toast({ toast }) {
  if (!toast) return null;
  return (
    <div className={`db-toast ${toast.type}`}>
      {toast.type === "success" ? (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
          <path
            d="M20 6L9 17l-5-5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M12 8v4M12 16h.01"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      )}
      {toast.message}
    </div>
  );
}

function StatCard({ icon, value, label, color, delay }) {
  return (
    <div className={`db-stat-card ${color} db-fade-up db-d${delay}`}>
      <div className={`db-stat-icon ${color}`}>{icon}</div>
      <div className="db-stat-value">{value}</div>
      <div className="db-stat-label">{label}</div>
    </div>
  );
}

function HabitCard({ habit, onComplete, onEdit, onDelete, delay }) {
  return (
    <div className="db-habit-card" style={{ animationDelay: `${delay}ms` }}>
      <div className="db-habit-card-top">
        <span className="db-habit-name">{habit.name}</span>
        {habit.frequency && (
          <span className="db-habit-freq">
            <IconRepeat /> {habit.frequency}
          </span>
        )}
      </div>

      {habit.description && (
        <p className="db-habit-desc">{habit.description}</p>
      )}

      <div className="db-habit-actions">
        <button
          className="db-habit-action-btn complete"
          onClick={() => onComplete(habit)}
        >
          <IconCheck /> Complete
        </button>
        <button
          className="db-habit-action-btn edit"
          onClick={() => onEdit(habit)}
        >
          <IconEdit /> Edit
        </button>
        <button
          className="db-habit-action-btn delete"
          onClick={() => onDelete(habit)}
        >
          <IconTrash />
        </button>
      </div>
    </div>
  );
}

function HabitModal({ habit, onClose, onSaved }) {
  const isEdit = !!habit?.id;
  const [form, setForm] = useState({
    name: habit?.name || "",
    description: habit?.description || "",
    frequency: habit?.frequency || "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (field) => (e) =>
    setForm((p) => ({ ...p, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (isEdit) {
        await axiosClient.put(`/habits/${habit.id}`, form);
      } else {
        await axiosClient.post("/habits", form);
      }
      onSaved();
    } catch (err) {
      setError(err.response?.data?.message || "An exception ocurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="db-overlay"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="db-modal">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 4,
          }}
        >
          <div>
            <h2 className="db-modal-title">
              {isEdit ? "Edit Habit" : "New Habit"}
            </h2>
            <p className="db-modal-sub">
              {isEdit
                ? "Edit habit"
                : "Complete the form to create a new habit"}
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              color: "#6b7280",
              cursor: "pointer",
              padding: 4,
            }}
          >
            <IconClose />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="db-modal-field">
            <label className="db-modal-label">Name *</label>
            <input
              className="db-modal-input"
              type="text"
              placeholder="Example: Meditate, Read, Do some exercise..."
              required
              value={form.name}
              onChange={handleChange("name")}
            />
          </div>

          <div className="db-modal-field">
            <label className="db-modal-label">Description</label>
            <textarea
              className="db-modal-input"
              placeholder="Optional Description..."
              rows={3}
              value={form.description}
              onChange={handleChange("description")}
            />
          </div>

          <div className="db-modal-field">
            <label className="db-modal-label">Frequency</label>
            <input
              className="db-modal-input"
              type="text"
              placeholder="Example: Daily, Weekly, 3 times per week..."
              value={form.frequency}
              onChange={handleChange("frequency")}
            />
          </div>

          {error && (
            <p style={{ fontSize: 13, color: "#f87171", marginBottom: 8 }}>
              {error}
            </p>
          )}

          <div className="db-modal-actions">
            <button
              type="button"
              className="db-modal-btn secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="db-modal-btn primary"
              disabled={loading}
            >
              {loading ? (
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                  }}
                >
                  <span className="db-spinner" /> Saving...
                </span>
              ) : isEdit ? (
                "Save changes"
              ) : (
                "Create habit"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function ConfirmModal({ type, habitName, onConfirm, onClose, loading }) {
  const isComplete = type === "complete";
  return (
    <div
      className="db-overlay"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="db-modal" style={{ maxWidth: 380 }}>
        <div className={`db-confirm-icon ${type}`}>
          {isComplete ? <IconCheck /> : <IconTrash />}
        </div>
        <h2 className="db-modal-title">
          {isComplete ? "Completar hábito" : "Eliminar hábito"}
        </h2>
        <p className="db-modal-sub" style={{ marginBottom: 0 }}>
          {isComplete ? (
            <>
              Confirm you completed{" "}
              <strong style={{ color: "#e2e8f0" }}>{habitName}</strong> today?
            </>
          ) : (
            <>
              Do you want to delete this{" "}
              <strong style={{ color: "#e2e8f0" }}>{habitName}</strong>? This
              action cannot be undone.
            </>
          )}
        </p>
        <div className="db-modal-actions">
          <button
            className="db-modal-btn secondary"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            className={`db-modal-btn ${isComplete ? "primary" : "danger"}`}
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? (
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                }}
              >
                <span className="db-spinner" />{" "}
                {isComplete ? "Completing..." : "Eliminating..."}
              </span>
            ) : isComplete ? (
              "Yes, complete"
            ) : (
              "Yes, delete this"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { user, logout } = useAuth();

  const [stats, setStats] = useState(null);
  const [statsLoading, setStatsLoading] = useState(true);

  const [habits, setHabits] = useState([]);
  const [habitsLoading, setHabitsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const PAGE_SIZE = 6;

  const [habitModal, setHabitModal] = useState(null);
  const [confirmModal, setConfirmModal] = useState(null);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchStats = useCallback(async () => {
    try {
      const { data } = await axiosClient.get("/habits/dashboard");
      setStats(data);
    } catch {
    } finally {
      setStatsLoading(false);
    }
  }, []);

  const fetchHabits = useCallback(async (p = 0) => {
    setHabitsLoading(true);
    try {
      const { data } = await axiosClient.get(
        `/habits?page=${p}&size=${PAGE_SIZE}`,
      );
      setHabits(data.content);
      setTotalPages(data.totalPages);
    } catch {
      showToast("An error ocurred loading habits", "error");
    } finally {
      setHabitsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
    fetchHabits(0);
  }, [fetchStats, fetchHabits]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    fetchHabits(newPage);
  };

  const handleConfirmComplete = async () => {
    setConfirmLoading(true);
    try {
      const res = await axiosClient.post(
        `/habits/${confirmModal.habit.id}/complete`,
      );
      showToast(res.data.message || "Habit Completed! 🔥");
      setConfirmModal(null);
      fetchStats();
    } catch (err) {
      const msg = err.response?.data?.message || "";
      if (msg.toLowerCase().includes("already")) {
        showToast("Habit already completed today", "error");
      } else {
        showToast("Error completing the habit", "error");
      }
      setConfirmModal(null);
    } finally {
      setConfirmLoading(false);
    }
  };

  const handleConfirmDelete = async () => {
    setConfirmLoading(true);
    try {
      await axiosClient.delete(`/habits/${confirmModal.habit.id}`);
      showToast("Habit deleted");
      setConfirmModal(null);
      fetchStats();
      fetchHabits(page);
    } catch {
      showToast("Error deleting this habit", "error");
      setConfirmModal(null);
    } finally {
      setConfirmLoading(false);
    }
  };

  const handleSaved = () => {
    const isEdit = !!habitModal?.id;
    showToast(isEdit ? "Habit updated" : "¡Habit created!");
    setHabitModal(null);
    fetchStats();
    fetchHabits(isEdit ? page : 0);
    if (!isEdit) setPage(0);
  };

  return (
    <div className="db-page">
      <div className="db-blob db-blob-1" />
      <div className="db-blob db-blob-2" />
      <div className="db-noise" />

      <header className="db-header db-fade-up" style={{ animationDelay: "0s" }}>
        <div className="db-header-inner">
          <div className="db-logo">
            <div className="db-logo-icon">
              <IconLayers />
            </div>
            <span className="db-logo-text">Habitflow</span>
          </div>
          <div className="db-header-right">
            <div className="db-username-badge">
              <span className="db-username-dot" />
              {user}
            </div>
            <button className="db-logout-btn" onClick={logout}>
              <IconLogout /> Log Out
            </button>
          </div>
        </div>
      </header>

      <main className="db-main">
        <div className="db-fade-up db-d1" style={{ marginBottom: 32 }}>
          <h1
            style={{
              fontFamily: "'Poppins', 'Nunito', sans-serif",
              fontSize: 28,
              fontWeight: 800,
              color: "#36251E",
              letterSpacing: "-0.03em",
              marginBottom: 4,
            }}
          >
            Hi, {user}!
          </h1>
          <p style={{ fontSize: 14, color: "#7A6458", fontWeight: 600 }}>
            {new Date().toLocaleDateString("es-AR", {
              weekday: "long",
              day: "numeric",
              month: "long",
            })}
          </p>
        </div>

        <p className="db-section-title db-fade-up db-d2">Summary</p>
        {statsLoading ? (
          <div className="db-stats-grid db-fade-up db-d3" style={{ marginBottom: 48 }}>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="db-skeleton" style={{ height: 120 }} />
            ))}
          </div>
        ) : (
          <div className="db-stats-grid">
            <StatCard
              delay={3}
              color="cyan"
              icon={<IconLayers />}
              value={stats?.totalHabits ?? 0}
              label="Total habits"
            />
            <StatCard
              delay={4}
              color="emerald"
              icon={<IconCheck />}
              value={stats?.completedToday ?? 0}
              label="Completed today"
            />
            <StatCard
              delay={5}
              color="violet"
              icon={<IconFire />}
              value={stats?.longestStreakOverall ?? 0}
              label="Best streak (days)"
            />
            <StatCard
              delay={6}
              color="amber"
              icon={<IconTrend />}
              value={`${Math.round(stats?.averageConsistencyLast7Days ?? 0)}%`}
              label="Consistency in 7 days"
            />
          </div>
        )}

        <div className="db-habits-header db-fade-up db-d7">
          <p className="db-section-title" style={{ margin: 0 }}>
            My habits
          </p>
          <button className="db-add-btn" onClick={() => setHabitModal({})}>
            <IconPlus /> New habit
          </button>
        </div>

        {habitsLoading ? (
          <div className="db-habits-grid db-fade-up db-d8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="db-skeleton" style={{ height: 160 }} />
            ))}
          </div>
        ) : habits.length === 0 ? (
          <div className="db-habits-grid db-fade-up db-d8">
            <div className="db-empty">
              <div className="db-empty-icon">
                <IconPlus />
              </div>
              <p className="db-empty-title">You don't have habits yet</p>
              <p className="db-empty-sub">
                Create your first habit and start building a better routine!
              </p>
              <button className="db-add-btn" onClick={() => setHabitModal({})}>
                <IconPlus /> Create my first habit
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="db-habits-grid db-fade-up db-d8">
              {habits.map((habit, i) => (
                <HabitCard
                  key={habit.id}
                  habit={habit}
                  delay={680 + i * 80}
                  onComplete={(h) =>
                    setConfirmModal({ type: "complete", habit: h })
                  }
                  onEdit={(h) => setHabitModal(h)}
                  onDelete={(h) =>
                    setConfirmModal({ type: "delete", habit: h })
                  }
                />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="db-pagination db-fade-up db-d9">
                <button
                  className="db-page-btn"
                  disabled={page === 0}
                  onClick={() => handlePageChange(page - 1)}
                >
                  ← Previous
                </button>
                <span className="db-page-info">
                  Page {page + 1} of {totalPages}
                </span>
                <button
                  className="db-page-btn"
                  disabled={page >= totalPages - 1}
                  onClick={() => handlePageChange(page + 1)}
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </main>

      {habitModal !== null && (
        <HabitModal
          habit={habitModal?.id ? habitModal : null}
          onClose={() => setHabitModal(null)}
          onSaved={handleSaved}
        />
      )}

      {confirmModal && (
        <ConfirmModal
          type={confirmModal.type}
          habitName={confirmModal.habit.name}
          loading={confirmLoading}
          onClose={() => setConfirmModal(null)}
          onConfirm={
            confirmModal.type === "complete"
              ? handleConfirmComplete
              : handleConfirmDelete
          }
        />
      )}

      <Toast toast={toast} />
    </div>
  );
}
