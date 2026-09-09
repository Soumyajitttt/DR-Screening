import { apiFetch } from "./client";

export function getSpecialists() {
  return apiFetch("/api/specialists");
}

export function sendReferral(specialistId, patientId) {
  return apiFetch(`/api/specialists/${specialistId}/send`, {
    method: "POST",
    body: JSON.stringify({ patientId })
  });
}
