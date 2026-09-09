import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, checkingSession, openAuthModal } = useAuth();

  useEffect(() => {
    if (!checkingSession && !isAuthenticated) {
      openAuthModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkingSession, isAuthenticated]);

  if (checkingSession) {
    return <p className="p-6 text-sm text-slate-500">Checking session...</p>;
  }

  if (!isAuthenticated) {
    return (
      <div className="rounded-lg border border-slate-200 bg-white p-6 text-center">
        <p className="text-sm text-slate-600">You need to log in to view this page.</p>
      </div>
    );
  }

  return children;
}
