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
    return <p className="p-6 font-tight text-sm text-[#45545e]">Checking session...</p>;
  }

  if (!isAuthenticated) {
    return (
      <div className="rounded-2xl bg-white p-6 text-center shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.04)]">
        <p className="font-tight text-sm text-[#45545e]">You need to log in to view this page.</p>
      </div>
    );
  }

  return children;
}
