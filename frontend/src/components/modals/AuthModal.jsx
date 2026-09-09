import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import { useAuth } from "../../context/AuthContext";

const inputClasses =
  "w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500";
const labelClasses = "mb-1 block text-sm font-semibold text-slate-700";

function TabButton({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex-1 rounded-md py-2 text-sm font-semibold transition ${
        active ? "bg-white text-sky-700 shadow-sm" : "text-slate-500 hover:text-slate-700"
      }`}
    >
      {children}
    </button>
  );
}

function LoginForm() {
  const { login, authError } = useAuth();
  const navigate = useNavigate();
  const [clinicianId, setClinicianId] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    const success = await login(clinicianId, password);
    setSubmitting(false);
    if (success) {
      setClinicianId("");
      setPassword("");
      // Land the clinician straight in the patient database after login.
      navigate("/database");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="clinicianId" className={labelClasses}>
          Clinician ID
        </label>
        <input
          id="clinicianId"
          type="text"
          placeholder="PHC-RAMPUR-102"
          required
          value={clinicianId}
          onChange={(e) => setClinicianId(e.target.value)}
          className={inputClasses}
        />
      </div>

      <div>
        <label htmlFor="password" className={labelClasses}>
          Password
        </label>
        <input
          id="password"
          type="password"
          placeholder="********"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={inputClasses}
        />
      </div>

      {authError && <p className="text-sm font-medium text-red-600">{authError}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-md bg-sky-600 py-2 text-sm font-semibold text-white hover:bg-sky-700 disabled:opacity-60"
      >
        {submitting ? "Logging in..." : "Login"}
      </button>

      <p className="text-xs text-slate-400">
        Demo credentials: <strong>PHC-RAMPUR-102</strong> / <strong>password123</strong>
      </p>
    </form>
  );
}

function RegisterForm() {
  const { register, authError } = useAuth();
  const [form, setForm] = useState({
    clinicianId: "",
    name: "",
    email: "",
    facility: "",
    password: "",
    confirmPassword: ""
  });
  const [localError, setLocalError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function update(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLocalError("");

    if (form.password.length < 8) {
      setLocalError("Password must be at least 8 characters");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setLocalError("Passwords do not match");
      return;
    }

    setSubmitting(true);
    const success = await register({
      clinicianId: form.clinicianId,
      name: form.name,
      email: form.email,
      facility: form.facility,
      password: form.password
    });
    setSubmitting(false);
    if (success) {
      setForm({ clinicianId: "", name: "", email: "", facility: "", password: "", confirmPassword: "" });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor="reg-clinicianId" className={labelClasses}>
            Clinician ID
          </label>
          <input
            id="reg-clinicianId"
            type="text"
            placeholder="PHC-RAMPUR-103"
            required
            value={form.clinicianId}
            onChange={update("clinicianId")}
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="reg-name" className={labelClasses}>
            Full name
          </label>
          <input
            id="reg-name"
            type="text"
            placeholder="Dr. Anjali Rao"
            required
            value={form.name}
            onChange={update("name")}
            className={inputClasses}
          />
        </div>
      </div>

      <div>
        <label htmlFor="reg-email" className={labelClasses}>
          Email
        </label>
        <input
          id="reg-email"
          type="email"
          placeholder="you@phc.example.in"
          required
          value={form.email}
          onChange={update("email")}
          className={inputClasses}
        />
      </div>

      <div>
        <label htmlFor="reg-facility" className={labelClasses}>
          Facility <span className="font-normal text-slate-400">(optional)</span>
        </label>
        <input
          id="reg-facility"
          type="text"
          placeholder="Rampur PHC Center"
          value={form.facility}
          onChange={update("facility")}
          className={inputClasses}
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor="reg-password" className={labelClasses}>
            Password
          </label>
          <input
            id="reg-password"
            type="password"
            placeholder="At least 8 characters"
            required
            value={form.password}
            onChange={update("password")}
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="reg-confirmPassword" className={labelClasses}>
            Confirm password
          </label>
          <input
            id="reg-confirmPassword"
            type="password"
            placeholder="********"
            required
            value={form.confirmPassword}
            onChange={update("confirmPassword")}
            className={inputClasses}
          />
        </div>
      </div>

      {(localError || authError) && (
        <p className="text-sm font-medium text-red-600">{localError || authError}</p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-md bg-teal-600 py-2 text-sm font-semibold text-white hover:bg-teal-700 disabled:opacity-60"
      >
        {submitting ? "Creating account..." : "Create account"}
      </button>
    </form>
  );
}

export default function AuthModal() {
  const { authModalOpen, closeAuthModal, authMode, setAuthMode } = useAuth();

  return (
    <Modal open={authModalOpen} title="Login / Register" onClose={closeAuthModal}>
      <div className="mb-4 flex gap-1 rounded-lg bg-slate-100 p-1">
        <TabButton active={authMode === "login"} onClick={() => setAuthMode("login")}>
          Login
        </TabButton>
        <TabButton active={authMode === "register"} onClick={() => setAuthMode("register")}>
          Register
        </TabButton>
      </div>

      {authMode === "login" ? <LoginForm /> : <RegisterForm />}
    </Modal>
  );
}
