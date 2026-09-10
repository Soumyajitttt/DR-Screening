import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import {
  LayoutDashboard,
  ScanEye,
  Activity,
  FileText,
  Stethoscope,
  ChevronsLeft,
  ChevronsRight,
  LogOut,
  Home
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const NAV_ITEMS = [
  { to: "/database", label: "Patient Database", icon: LayoutDashboard },
  { to: "/report", label: "Screening & Analysis", icon: ScanEye },
  { to: "/grading", label: "Diagnostic AI", icon: Activity },
  { to: "/pdf-report", label: "Report Preview", icon: FileText },
  { to: "/specialists", label: "Specialists", icon: Stethoscope }
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout } = useAuth();

  return (
    <aside
      className={`sticky top-0 flex h-screen shrink-0 flex-col border-r border-white/10 bg-[#17171a] text-white transition-[width] duration-200 ease-in-out ${
        collapsed ? "w-[76px]" : "w-64"
      }`}
    >
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-4">
        <Link to="/" className="flex min-w-0 items-center gap-2" aria-label="RetinaVision AI home">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-white">
            <Home size={18} />
          </span>
          {!collapsed && (
            <span className="truncate font-geist text-[15px] font-medium text-white">RetinaVision AI</span>
          )}
        </Link>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-2 py-4" aria-label="Primary">
        {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            title={collapsed ? label : undefined}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-2.5 font-tight text-sm font-medium transition-colors ${
                isActive ? "bg-white/10 text-white" : "text-white/55 hover:bg-white/5 hover:text-white"
              }`
            }
          >
            <Icon size={19} className="shrink-0" />
            {!collapsed && <span className="truncate">{label}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-white/10 p-2">
        {!collapsed && (
          <div className="mb-1 px-2 py-2">
            <p className="truncate font-tight text-sm font-medium text-white">{user?.name || "Clinician"}</p>
            <p className="truncate font-tight text-xs text-white/40">{user?.id}</p>
          </div>
        )}

        <button
          onClick={logout}
          title="Logout"
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 font-tight text-sm font-medium text-white/55 transition-colors hover:bg-white/5 hover:text-white"
        >
          <LogOut size={19} className="shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>

        <button
          onClick={() => setCollapsed((c) => !c)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 font-tight text-sm font-medium text-white/40 transition-colors hover:bg-white/5 hover:text-white"
        >
          {collapsed ? <ChevronsRight size={19} /> : <ChevronsLeft size={19} />}
          {!collapsed && <span>Collapse</span>}
        </button>
      </div>
    </aside>
  );
}
