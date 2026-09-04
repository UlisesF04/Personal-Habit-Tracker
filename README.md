# Personal Habit Tracker

> A full-stack habit tracking application to build and monitor daily routines.

![Java](https://img.shields.io/badge/Java-21-orange?style=flat-square&logo=openjdk)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.5.11-green?style=flat-square&logo=springboot)
![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?style=flat-square&logo=tailwindcss)
![MySQL](https://img.shields.io/badge/MySQL-8-4479A1?style=flat-square&logo=mysql)

## What is Personal-Habit-Tracker?

Personal-Habit-Tracker is a web application that allows users to create and track daily habits, with streak monitoring, consistency statistics, and a personalized dashboard. Built as a portfolio project to demonstrate full-stack development skills using Java/Spring Boot on the backend and React on the frontend.

## Features

- Secure JWT-based authentication (register & login)
- Full CRUD for personal habits
- Daily habit completion tracking (one per day)
- Automatic calculation of current streak and all-time best streak
- Completion rates (last 7 / 30 days) and consistency metrics
- General dashboard with key stats (total habits, completed today, longest streak, avg consistency)
- Paginated habit listing
- Landing page presenting HabitFlow — the personal tracker for your healthy habits
- Responsive UI with smooth animations, warm palette `#FAF3E0` / `#36251E` and rounded typography (`Nunito` + `Poppins`)

## Live Demo

> **Fill after deployment — leave this block as placeholder:**

- **Landing + Web App (Vercel):** `https://________________.vercel.app` <!-- TODO: paste Vercel URL after deploy -->
- **API (Render):** `https://________________.onrender.com` <!-- TODO: paste Render URL -->
- **Swagger UI:** `https://________________.onrender.com/swagger-ui.html`
- **Health Check:** `https://________________.onrender.com/actuator/health` → `{"status":"UP"}`
- **Database:** Aiven MySQL 8 — Free tier (host `...aivencloud.com`)

*Previous demo:* https://personal-habit-tracker-khaki.vercel.app

> **Note:** Free tier services sleep after ~15 min idle. First request may take ~30s to wake up.

## Tech Stack

### Backend — `demo/`

- **Java 21** + **Spring Boot 3.5.11**
- **Spring Security** — stateless JWT (`io.jsonwebtoken:jjwt 0.11.5`, `BCrypt`)
- **Spring Data JPA + Hibernate 6.6** — `ddl-auto=update`
- **MySQL 8** — `mysql-connector-j` (local) / **Aiven MySQL 8** (prod)
- **Spring Boot Actuator** — `health` endpoint for Render
- **Lombok 1.18.30**
- **SpringDoc OpenAPI 2.5.0** — Swagger UI
- Build: **Maven 3.9** (`./mvnw`), Docker `eclipse-temurin:21`

### Frontend — `habit-tracker-frontend/`

- **React 19.2.0** + **React Router 7.13.1** (SPA, protected `/dashboard`)
- **Vite 7.3.1** + **@vitejs/plugin-react 5.1**
- **Tailwind CSS 4.2.1** (`@tailwindcss/vite`) + custom CSS (`AuthPage.css`, `DashboardPage.css`, `LandingPage.css`)
- **Axios 1.13.6** with interceptors (`Authorization: Bearer <JWT>`, 401 auto-logout)
- **Context API** for auth (`localStorage` token)
- Images: `src/assets/calendar_image.png`, `src/assets/habits_image.png`

### Infrastructure (Free-only portfolio)

- **Frontend:** Vercel (Free) — `vercel.app` domain, `VITE_API_URL` env, `vercel.json` SPA rewrite
- **Backend:** Render (Free) — Docker, `PORT=10000`, `healthCheckPath: /actuator/health`, `render.yaml` IaC
- **Database:** Aiven MySQL 8 (Free) — fallback `Neon Postgres Free` (change driver only)

## Architecture

**Backend layered:** `Controllers → Services (streak/stats) → Repositories (JPA) → Entities` + `DTOs` + `HabitMapper` + `JwtAuthFilter`.

**Frontend:** `BrowserRouter → AuthProvider → Routes (/ → LandingPage, /auth → AuthPage single square with vanish animation, /dashboard → PrivateRoute)` + `axiosClient` + `LandingPage / DashboardPage`.

**Auth:** Stateless JWT (1h `app.jwt.expiration-ms`, secret via `JWT_SECRET` env). `JwtAuthFilter` reads `Bearer`, `SecurityConfig` permits `/auth/**`, `/swagger-ui/**`, `/actuator/health`.

## Getting Started (Local)

### Prerequisites

- Java 21+ (`java -version` → 21.0.x)
- Node.js 18+ (`node -v`)
- MySQL 8 (`mysql --version`)
- Maven wrapper included (`demo/mvnw`)

### Backend — Local MySQL

1. Create database:
```sql
CREATE DATABASE habit_tracker;
```

2. Create `demo/.env` or export env vars. See `demo/src/main/resources/application.properties.example`:
```
DB_URL=jdbc:mysql://localhost:3306/habit_tracker
DB_USERNAME=root
DB_PASSWORD=ulises2004
JWT_SECRET=ulises_habit_tracker_super_secret_key_2026_secure
PORT=8080
```

> `demo/src/main/resources/application.properties` is gitignored and has defaults `${DB_URL:...}` etc. Setting env vars overrides them.

3. Run:
```bash
cd demo
./mvnw spring-boot:run
# or: $env:JAVA_HOME="C:\Program Files\Java\jdk-21.0.12.1"; ./mvnw spring-boot:run
```
Server: `http://localhost:8080` — Swagger: `http://localhost:8080/swagger-ui.html` — Health: `http://localhost:8080/actuator/health`

Fix `JAVA_HOME` if you get `not defined correctly`:
```powershell
setx JAVA_HOME "C:\Program Files\Java\jdk-21.0.12.1"
# restart terminal/VS Code
```

### Frontend — Local

```bash
cd habit-tracker-frontend
npm install
# optional: create .env
echo "VITE_API_URL=http://localhost:8080" > .env
npm run dev
```
App: `http://localhost:5173` — Landing at `/`, Auth at `/auth`, Dashboard at `/dashboard` (login required).

## Environment Variables

| Var | Local Example | Production (Render/Vercel) | Description |
|---|---|---|---|
| `DB_URL` | `jdbc:mysql://localhost:3306/habit_tracker` | `jdbc:mysql://<aiven-host>:<port>/defaultdb?sslMode=REQUIRED` | JDBC URL (Aiven) |
| `DB_USERNAME` | `root` | `avnadmin` | DB user |
| `DB_PASSWORD` | `ulises2004` | `<aiven-password>` | DB pass |
| `PORT` | `8080` | `10000` (Render injects) | `server.port` |
| `JWT_SECRET` | `ulises_habit_tracker_super_secret_key_2026_secure` | `openssl rand -base64 32` | HS256 secret |
| `VITE_API_URL` | `http://localhost:8080` | `https://habit-tracker-api-xxxx.onrender.com` | Frontend → Backend (Vercel env) |

## Deployment — Step by Step (Free Tier)

### 1. Database — Aiven MySQL 8

1. Go to **aiven.io** → Sign up (GitHub) → *Create Service* → **MySQL 8** → **Free plan** → Region `europe-central` → Create
2. Wait ~2 min → Service Overview → **Connection Information** → copy `Host`, `Port`, `User` (`avnadmin`), `Password`, `Database` (`defaultdb`)
3. Build JDBC URL: `jdbc:mysql://<host>:<port>/defaultdb?sslMode=REQUIRED`
4. Test locally: set `DB_URL/DB_USERNAME/DB_PASSWORD` env → `./mvnw spring-boot:run` → `HikariPool-1 Added connection MySQL 8.0` + `Tomcat started on port 8080`
5. *(Fallback Postgres)*: Use **neon.tech** → Create Project → copy `psql` URL → change `pom.xml` `mysql-connector-j` → `org.postgresql:postgresql`, update `DB_URL=jdbc:postgresql://...?sslmode=require`

### 2. Backend — Render

1. Go to **render.com** → Sign up via GitHub → **New +** → **Web Service** → Connect repo `Personal-Habit-Tracker`
2. Settings: **Root Directory:** `demo` — **Runtime:** `Docker` — **Dockerfile Path:** `./Dockerfile` — **Plan:** `Free`
3. **Build Command** (auto via Docker) — **Health Check Path:** `/actuator/health`
4. **Environment → Add:**
   - `DB_URL` = `jdbc:mysql://...aivencloud.com...?sslMode=REQUIRED`
   - `DB_USERNAME` = `avnadmin`
   - `DB_PASSWORD` = `<aiven>`
   - `JWT_SECRET` = `openssl rand -base64 32` (generate locally)
   - `PORT` = `10000`
5. **Deploy** → Wait 3-5 min → Copy URL `https://habit-tracker-api-xxxx.onrender.com`
6. Verify: `https://...onrender.com/actuator/health` → `{"status":"UP"}` and `https://...onrender.com/swagger-ui.html`
7. CORS already allows `https://*.vercel.app` via `CorsConfig.java:14` (`addAllowedOriginPattern`)

> `render.yaml` at repo root automates this.

### 3. Frontend — Vercel

1. Go to **vercel.com** → Sign up via GitHub → **Add New Project** → Import `Personal-Habit-Tracker` → **Root Directory:** `habit-tracker-frontend` → Framework: `Vite`
2. **Environment Variables → Add:** `VITE_API_URL` = `https://habit-tracker-api-xxxx.onrender.com` → **Deploy**
3. Vercel provides `https://personal-habit-tracker-xxxx.vercel.app` — verify `/` Landing → `Join In` → `/auth` single square (login `user+pass`, vanish to register) → login → `/dashboard` stats load.
4. `vercel.json` at `habit-tracker-frontend/` ensures SPA rewrites.

After deploy, paste URLs into **Live Demo** section above.

## API Reference

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/auth/register` | ❌ | Register a new user |
| POST | `/auth/login` | ❌ | Login → returns JWT |
| GET | `/habits` | ✅ | List habits (paginated `?page&size=6`) |
| POST | `/habits` | ✅ | Create a habit |
| PUT | `/habits/{id}` | ✅ | Update a habit |
| DELETE | `/habits/{id}` | ✅ | Delete a habit |
| POST | `/habits/{id}/complete` | ✅ | Mark habit as completed today |
| GET | `/habits/{id}/stats` | ✅ | Get individual habit stats |
| GET | `/habits/dashboard` | ✅ | Get general dashboard summary |
| GET | `/actuator/health` | ❌ | Render health check |

## Author

**Ulises Fernandez**  
[LinkedIn](https://linkedin.com/in/ulises-fernández-a6620a259/)
