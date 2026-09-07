import { NavLink } from "react-router-dom";
import { useState } from "react";
import AuthModal from "./modals/AuthModal";

const NAV_LINKS = [
  { to: "/", label: "Landing Page" },
  { to: "/database", label: "Database" },
  { to: "/report", label: "User Report" },
  { to: "/grading", label: "Diagnostic Analysis" },
  { to: "/pdf-report", label: "Report Preview" },
  { to: "/specialists", label: "Specialists" }
];

export default function Header() {
  const [authModalOpen, setAuthModalOpen] = useState(false);

  return (
    <header>
      <div className="brand">
        <span>RetinaVision AI</span>
        <span className="brand-tag">PHC Edition</span>
      </div>

      <nav>
        <ul>
          {NAV_LINKS.map((link) => (
            <li key={link.to}>
              <NavLink to={link.to} end={link.to === "/"}>
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="auth-btns">
        <button onClick={() => setAuthModalOpen(true)}>Login / Register</button>
      </div>

      <AuthModal open={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </header>
  );
}
