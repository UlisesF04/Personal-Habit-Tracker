# Personal Habit Tracker 🔥

> A full-stack habit tracking application to build and monitor daily routines.

![Java](https://img.shields.io/badge/Java-21-orange?style=flat-square&logo=openjdk)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.2-green?style=flat-square&logo=springboot)
![React](https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?style=flat-square&logo=tailwindcss)
![MySQL](https://img.shields.io/badge/MySQL-8-4479A1?style=flat-square&logo=mysql)

## What is Personal-Habit-Tracker?

Personal-Habit-Tracker is a web application that allows users to create and track daily habits,
with streak monitoring, consistency statistics, and a personalized dashboard.
Built as a portfolio project to demonstrate full-stack development skills using
Java/Spring Boot on the backend and React on the frontend.

## Features

- Secure JWT-based authentication (register & login)
- Full CRUD for personal habits
- Daily habit completion tracking
- Automatic calculation of current streak and all-time best streak
- General dashboard with key stats (7-day consistency, completed today, longest streak)
- Paginated habit listing
- Responsive UI with smooth animations and transitions

## Tech Stack

### Backend

- **Java 21** + **Spring Boot 3.2**
- **Spring Security** — stateless authentication via **JWT**
- **Spring Data JPA** + **Hibernate** for persistence
- **MySQL 8** as the relational database
- **Lombok** to reduce boilerplate
- **OpenAPI / Swagger** for API documentation

### Frontend

- **React 18** with functional components and hooks
- **Tailwind CSS v4** for utility-first styling
- **React Router v6** for client-side navigation (SPA)
- **Axios** with request interceptors to automatically attach the JWT
- **Context API** for global authentication state management

## Architecture

The backend follows a layered architecture: **Controllers** expose the REST
endpoints, **Services** contain the business logic (streak calculation,
statistics), **Repositories** abstract data access via JPA, and **DTOs**
decouple the presentation layer from the domain model.

The frontend separates logic from presentation: JSX components handle
structure and state, while styles are centralized in dedicated CSS files
with Tailwind classes grouped by responsibility.

Authentication is fully stateless — the backend issues a JWT on login,
and the frontend stores it in `localStorage`, automatically attaching it
to every request through an Axios interceptor.

## Getting Started

### Prerequisites

- Java 21+
- Node.js 18+
- MySQL 8

### Backend

1. Create the database:

```sql
CREATE DATABASE habit_tracker;
```

2. Create a `.env` file in the backend root (same level as `pom.xml`).
   Use `application.properties.example` as a reference:

```
DB_URL=jdbc:mysql://localhost:3306/habit_tracker
DB_USERNAME=your_mysql_username
DB_PASSWORD=your_mysql_password
```

3. Run the server:

```bash
cd backend
./mvnw spring-boot:run
```

The server will be available at `http://localhost:8080`.  
Swagger UI available at `http://localhost:8080/swagger-ui.html`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

## API Reference

| Method | Endpoint                | Auth | Description                   |
| ------ | ----------------------- | ---- | ----------------------------- |
| POST   | `/auth/register`        | ❌   | Register a new user           |
| POST   | `/auth/login`           | ❌   | Login → returns JWT           |
| GET    | `/habits`               | ✅   | List habits (paginated)       |
| POST   | `/habits`               | ✅   | Create a habit                |
| PUT    | `/habits/{id}`          | ✅   | Update a habit                |
| DELETE | `/habits/{id}`          | ✅   | Delete a habit                |
| POST   | `/habits/{id}/complete` | ✅   | Mark habit as completed today |
| GET    | `/habits/{id}/stats`    | ✅   | Get individual habit stats    |
| GET    | `/habits/dashboard`     | ✅   | Get general dashboard summary |

## Author

**Ulises Fernandez**  
[LinkedIn](https://linkedin.com/in/ulises-fernández-a6620a259/)
