import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(
    () => localStorage.getItem("username") || null,
  );
  const navigate = useNavigate();

  const login = async (username, password) => {
    const { data } = await axiosClient.post("/auth/login", {
      username,
      password,
    });
    localStorage.setItem("token", data.token);
    localStorage.setItem("username", username);
    setUser(username);
    navigate("/dashboard");
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
