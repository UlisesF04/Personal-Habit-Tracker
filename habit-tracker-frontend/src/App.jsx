import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import AuthPage from "./pages/AuthPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import LandingPage from "./pages/LandingPage.jsx";

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/auth" />;
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthProvider>
      <Analytics />
    </BrowserRouter>
  );
}
