import { createContext, useContext, useEffect, useState } from "react";
import * as authApi from "../api/auth";
import { getToken, setToken as persistToken, clearToken } from "../api/client";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setTokenState] = useState(() => getToken());
  const [user, setUser] = useState(null);
  const [checkingSession, setCheckingSession] = useState(true);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [authError, setAuthError] = useState("");

  // On first load, if a token is already stored, validate it against the
  // backend (GET /api/auth/me) rather than trusting it blindly.
  useEffect(() => {
    async function restoreSession() {
      if (!token) {
        setCheckingSession(false);
        return;
      }
      try {
        const { user: restoredUser } = await authApi.me();
        setUser(restoredUser);
      } catch {
        clearToken();
        setTokenState(null);
        setUser(null);
      } finally {
        setCheckingSession(false);
      }
    }
    restoreSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function login(clinicianId, password) {
    setAuthError("");
    try {
      const { token: newToken, user: loggedInUser } = await authApi.login(clinicianId, password);
      persistToken(newToken);
      setTokenState(newToken);
      setUser(loggedInUser);
      setAuthModalOpen(false);
      return true;
    } catch (err) {
      setAuthError(err.message || "Login failed");
      return false;
    }
  }

  async function register(details) {
    setAuthError("");
    try {
      const { token: newToken, user: newUser } = await authApi.register(details);
      persistToken(newToken);
      setTokenState(newToken);
      setUser(newUser);
      setAuthModalOpen(false);
      return true;
    } catch (err) {
      setAuthError(err.message || "Registration failed");
      return false;
    }
  }

  function logout() {
    clearToken();
    setTokenState(null);
    setUser(null);
  }

  function openAuthModal(mode = "login") {
    setAuthError("");
    setAuthMode(mode);
    setAuthModalOpen(true);
  }

  function closeAuthModal() {
    setAuthError("");
    setAuthModalOpen(false);
  }

  const value = {
    token,
    user,
    isAuthenticated: Boolean(token && user),
    checkingSession,
    login,
    register,
    logout,
    authModalOpen,
    authMode,
    setAuthMode,
    openAuthModal,
    closeAuthModal,
    authError
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
