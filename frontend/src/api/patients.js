import { apiFetch } from "./client";

export function getPatients({ search = "", grade = "all" } = {}) {
  const params = new URLSearchParams();
  if (search) params.set("search", search);
  if (grade && grade !== "all") params.set("grade", grade);
  const qs = params.toString();
  return apiFetch(`/api/patients${qs ? `?${qs}` : ""}`);
}

export function getPatientById(id) {
  return apiFetch(`/api/patients/${id}`);
}

export function createPatient(data) {
  return apiFetch("/api/patients", {
    method: "POST",
    body: JSON.stringify(data)
  });
}
