import { apiFetch } from "./client";

export function register({ clinicianId, name, email, password, facility }) {
  return apiFetch("/api/auth/register", {
    method: "POST",
    body: JSON.stringify({ clinicianId, name, email, password, facility })
  });
}

export function login(clinicianId, password) {
  return apiFetch("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ clinicianId, password })
  });
}

export function me() {
  return apiFetch("/api/auth/me");
}
