# Personal Habit Tracker

> A full-stack habit tracking application to build and monitor daily routines.

![Java](https://img.shields.io/badge/Java-21-orange?style=flat-square&logo=openjdk)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.5.11-green?style=flat-square&logo=springboot)
![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?style=flat-square&logo=tailwindcss)
![MySQL](https://img.shields.io/badge/MySQL-8-4479A1?style=flat-square&logo=mysql)
![Vercel](https://img.shields.io/badge/Vercel-deployed-black?style=flat-square&logo=vercel)
![Render](https://img.shields.io/badge/Render-deployed-46E3B7?style=flat-square&logo=render)
![Aiven](https://img.shields.io/badge/Aiven-MySQL-FF6B6B?style=flat-square&logo=aiven)

## What is Personal-Habit-Tracker?

Personal-Habit-Tracker is a web application that allows users to create and track daily habits, with streak monitoring, consistency statistics, and a personalized dashboard. Built as a portfolio project to demonstrate full-stack development skills using Java/Spring Boot on the backend and React on the frontend.

The app helps you turn intentions into streaks: create habits with name, description and frequency, mark them complete each day, and watch current/best streaks, 7/30-day completion rates and dashboard insights grow.

## Features

- **Landing page** — `HabitFlow — the personal tracker for your healthy habits` with calendar/time and habit creation highlights, CTA `Join In`
- **Secure JWT authentication** — register & login, `BCrypt` passwords, `1h` stateless JWT
- **Full CRUD for habits** — name, description, frequency
- **Daily completion** — one log per habit per day (`habit_log` unique `habit_id+date`)
- **Streak engine** — automatic `currentStreak` and `bestStreak` (consecutive days)
- **Statistics** — per-habit `7/30-day` completion rates, `totalCompletions`, dashboard `totalHabits / completedToday / longestStreak / avgConsistency 7d`
- **Dashboard** — 4 stat cards + habit grid (3→2→1 cols), staggered top-to-bottom entrance, skeletons & toasts
- **Single-square auth** — centered `28px` rounded square, login (`user+pass`) ↔ register (vanish/scale) animation, strength meter
- **Paginated habits** — `GET /habits?page&size=6`
- **Responsive & warm UI** — palette `#FAF3E0` (cream) / `#36251E` (espresso), `Nunito` + `Poppins`, dark landing `#36251E/#FAF3E0` with blended images

## Live Demo

**Try the app online:**

- **Web App (Vercel):** **[https://pht-beta.vercel.app/](https://pht-beta.vercel.app/)** — Landing `/` → `Join In` → Auth `/auth` → Dashboard `/dashboard`
- **API (Render):** `https://personal-habit-tracker-8y5s.onrender.com`
- **Swagger UI:** `https://personal-habit-tracker-8y5s.onrender.com/swagger-ui.html`
- **Health Check:** `https://personal-habit-tracker-8y5s.onrender.com/actuator/health`

> Free tier sleeps after ~15 min idle — first request may take ~30s to wake up.

## Tech Stack

### Backend — `demo/`

- **Java 21** + **Spring Boot 3.5.11** + **Maven 3.9** (`./mvnw`)
- **Spring Security** — stateless JWT via `io.jsonwebtoken:jjwt-api/impl/jackson 0.11.5` (`HS256`, `JWT_SECRET` env, 256-bit key derivation)
- **Spring Data JPA + Hibernate 6.6** — `ddl-auto=update`, HikariCP
- **MySQL 8** — `mysql-connector-j 9.6.0` locally / **Aiven MySQL 8** in prod (`sslMode=REQUIRED`)
- **Spring Boot Actuator** — `/actuator/health` for Render
- **SpringDoc OpenAPI 2.5.0** — Swagger
- **Lombok 1.18.30** — `commons-math3` (unused, kept)
- **Docker** — `eclipse-temurin:21` multi-stage (`demo/Dockerfile`), `render.yaml` IaC

### Frontend — `habit-tracker-frontend/`

- **React 19.2.0** + **React Router 7.13.1** — SPA (`/`, `/auth`, `/dashboard` with `PrivateRoute`)
- **Vite 7.3.1** + `@vitejs/plugin-react 5.1` + `@tailwindcss/vite 4.2.1`
- **Tailwind CSS 4.2.1** + custom CSS (`AuthPage.css` single square, `DashboardPage.css` sequential fade, `LandingPage.css` dark `#36251E`)
- **Axios 1.13.6** — `axiosClient` (`baseURL: VITE_API_URL`, `Bearer` interceptor, `401 → /auth`)
- **Context API** — `AuthContext` (`localStorage` token/username)
- **Assets** — `src/assets/calendar_image.png`, `src/assets/habits_image.png` (blended into dark landing via glow + `scale(1.04)`)

### Infrastructure

- **Frontend:** Vercel (`vercel.app`, `vercel.json` SPA rewrite, `VITE_API_URL`)
- **Backend:** Render Docker (`PORT=10000`, `healthCheckPath: /actuator/health`)
- **Database:** Aiven MySQL 8 Free (`defaultdb`, SSL) — fallback `Neon Postgres` (change driver only)

## Architecture

**Backend layered:** `Controller → Service (streak/consistency) → Repository (JPA) → Entity` + `DTO` + `Mapper` + `JwtAuthFilter` + `CorsConfig` (`https://*.vercel.app`).

Key logic `HabitService`:
- `currentStreak` — consecutive logs ending **today** (desc walk, break on gap)
- `bestStreak` — longest consecutive sequence anywhere
- `completionRate(days)` — `count ≥ today-days+1 / days *100`

**Frontend:**
`BrowserRouter → AuthProvider → Routes: / (LandingPage) /auth (AuthPage single square + squareVanishOut/In) /dashboard (PrivateRoute + StatCard/HabitCard/Modals) → axiosClient`.

**Auth:** `POST /auth/register|login → JWT (1h) → localStorage → Bearer → JwtAuthFilter` permits `/auth/**`, `/swagger-ui/**`, `/actuator/health`.

## Getting Started — Local Deployment

### Prerequisites

- **Java 21+** — `java -version` → `21.0.12`
- **Node.js 18+** — `node -v` → `v20+`
- **MySQL 8** — `mysql --version`
- **Maven Wrapper** included — `demo/mvnw`

### Backend

1. Create database:
   ```sql
   CREATE DATABASE habit_tracker;
   ```

2. Configure env — create `demo/.env` (gitignored) or export vars. See `demo/src/main/resources/application.properties.example`:
   ```
   DB_URL=jdbc:mysql://localhost:3306/habit_tracker
   DB_USERNAME=root
   DB_PASSWORD=your_mysql_password
   JWT_SECRET=ulises_habit_tracker_super_secret_key_2026_secure
   PORT=8080
   ```
   > `application.properties` has defaults `DB_URL=jdbc:mysql://localhost:3306/habit_tracker`, `DB_USERNAME=root`, `DB_PASSWORD=ulises2004`, `PORT=8080`. Setting env overrides them. Aiven prod uses `jdbc:mysql://<host>:<port>/defaultdb?sslMode=REQUIRED`.

3. Fix `JAVA_HOME` if you get `not defined correctly`:
   ```powershell
   setx JAVA_HOME "C:\Program Files\Java\jdk-21.0.12.1"
   # restart terminal/VS Code
   ```

4. Run:
   ```bash
   cd demo
   ./mvnw spring-boot:run
   ```
   Server `http://localhost:8080` — Swagger `http://localhost:8080/swagger-ui.html` — Health `http://localhost:8080/actuator/health`

### Frontend

```bash
cd habit-tracker-frontend
npm install
# optional: point to local backend
echo "VITE_API_URL=http://localhost:8080" > .env
npm run dev
```
App `http://localhost:5173` — Landing `/`, Auth `/auth` (single square, `Sign up` vanish), Dashboard `/dashboard` (requires login).

### Environment Variables

| Var | Local Example | Production | Description |
|-----|---------------|------------|-------------|
| `DB_URL` | `jdbc:mysql://localhost:3306/habit_tracker` | `jdbc:mysql://<aiven-host>:<port>/defaultdb?sslMode=REQUIRED` | JDBC URL |
| `DB_USERNAME` | `root` | `avnadmin` | DB user |
| `DB_PASSWORD` | `ulises2004` | `<aiven-password>` | DB password |
| `PORT` | `8080` | `10000` (Render) | `server.port` |
| `JWT_SECRET` | `ulises_habit_tracker_super_secret_key_2026_secure` | `openssl rand -base64 32` | HS256 secret (≥32 chars) |
| `VITE_API_URL` | `http://localhost:8080` | `https://personal-habit-tracker-8y5s.onrender.com` | Frontend → Backend |

## API Reference

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/auth/register` | ❌ | Register a new user |
| POST | `/auth/login` | ❌ | Login → returns `{token}` |
| GET | `/habits` | ✅ | List habits (paginated `?page=0&size=6`) |
| POST | `/habits` | ✅ | Create a habit |
| PUT | `/habits/{id}` | ✅ | Update a habit |
| DELETE | `/habits/{id}` | ✅ | Delete a habit |
| POST | `/habits/{id}/complete` | ✅ | Mark habit as completed today |
| GET | `/habits/{id}/stats` | ✅ | Get stats `currentStreak/bestStreak/totalCompletions/rate7/rate30` |
| GET | `/habits/dashboard` | ✅ | Get `totalHabits/completedToday/longestStreakOverall/averageConsistencyLast7Days` |
| GET | `/actuator/health` | ❌ | Health check |
| GET | `/swagger-ui.html` | ❌ | API docs |

## Deployment (Free Tier Recap)

- **Aiven:** MySQL 8 Free → JDBC `?sslMode=REQUIRED` → `HikariPool` connects
- **Render:** Root `demo`, Docker, `healthCheckPath: /actuator/health`, env `DB_URL/DB_USERNAME/DB_PASSWORD/JWT_SECRET/PORT`
- **Vercel:** Root `habit-tracker-frontend`, `VITE_API_URL` → `https://personal-habit-tracker-8y5s.onrender.com`, `vercel.json` rewrites

## Author

**Ulises Fernandez** — [LinkedIn](https://linkedin.com/in/ulises-fernández-a6620a259/)
