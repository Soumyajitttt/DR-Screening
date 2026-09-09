import { useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const TITLES = {
  "/database": "Patient Database",
  "/report": "Screening & Analysis",
  "/grading": "Diagnostic AI & Grad-CAM",
  "/pdf-report": "Report Preview",
  "/specialists": "Nearest Specialists"
};

export default function Topbar() {
  const location = useLocation();
  const { isAuthenticated, user, openAuthModal } = useAuth();

  const title = TITLES[location.pathname] || "RetinaVision AI";

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-200 bg-white/80 px-6 py-3.5 backdrop-blur">
      <div>
        <h1 className="text-base font-semibold text-slate-800">{title}</h1>
        <p className="text-xs text-slate-400">PHC Edition &middot; AI-assisted diabetic retinopathy screening</p>
      </div>

      {!isAuthenticated && (
        <button
          onClick={() => openAuthModal("login")}
          className="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Login / Register
        </button>
      )}
      {isAuthenticated && (
        <span className="hidden text-sm text-slate-500 sm:inline">Signed in as {user?.name}</span>
      )}
    </header>
  );
}
