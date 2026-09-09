import { apiFetch } from "./client";

export function getAnalysis(patientId) {
  return apiFetch(`/api/analysis/${patientId}`);
}

export function uploadAnalysis(patientId, file) {
  const formData = new FormData();
  formData.append("image", file);
  return apiFetch(`/api/analysis/${patientId}/upload`, {
    method: "POST",
    body: formData
  });
}
