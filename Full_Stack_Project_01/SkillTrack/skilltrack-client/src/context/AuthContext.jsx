import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("skilltrack_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!user;
  const isAdmin = user?.role === "Admin";

  const login = async (email, password) => {
    const response = await api.post("/auth/login", {
      email,
      password,
    });

    const { token, user } = response.data;

    localStorage.setItem("skilltrack_token", token);
    localStorage.setItem("skilltrack_user", JSON.stringify(user));

    setUser(user);

    return user;
  };

  const register = async (fullName, email, password) => {
    const response = await api.post("/auth/register", {
      fullName,
      email,
      password,
    });

    const { token, user } = response.data;

    localStorage.setItem("skilltrack_token", token);
    localStorage.setItem("skilltrack_user", JSON.stringify(user));

    setUser(user);

    return user;
  };

  const logout = () => {
    localStorage.removeItem("skilltrack_token");
    localStorage.removeItem("skilltrack_user");
    setUser(null);
  };

  useEffect(() => {
    const checkUser = async () => {
      const token = localStorage.getItem("skilltrack_token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await api.get("/auth/me");
        localStorage.setItem("skilltrack_user", JSON.stringify(response.data));
        setUser(response.data);
      } catch (error) {
        logout();
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        isAdmin,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}