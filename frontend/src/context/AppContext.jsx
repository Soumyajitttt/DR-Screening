import { createContext, useContext, useMemo, useState } from "react";
import initialPatients from "../data/patients.json";
import initialAnalysisResults from "../data/analysisResults.json";
import initialSpecialists from "../data/specialists.json";

const AppContext = createContext(null);

// Maps numeric grade -> label text, used when adding a new patient etc.
export const GRADE_LABELS = {
  0: "Grade 0: Normal",
  1: "Grade 1: Mild DR",
  2: "Grade 2: Moderate DR",
  3: "Grade 3: Severe DR",
  4: "Grade 4: Proliferative DR"
};

export function AppProvider({ children }) {
  const [patients, setPatients] = useState(initialPatients);
  const [analysisResults, setAnalysisResults] = useState(initialAnalysisResults);
  const [specialists] = useState(initialSpecialists);
  const [activePatientId, setActivePatientId] = useState(initialPatients[0]?.id ?? null);

  const activePatient = useMemo(
    () => patients.find((p) => p.id === activePatientId) ?? null,
    [patients, activePatientId]
  );

  const activeAnalysis = useMemo(
    () => (activePatientId ? analysisResults[activePatientId] : null),
    [analysisResults, activePatientId]
  );

  function addPatient({ name, age, gender }) {
    const newId = `P-${1024 + patients.length}`;
    const newPatient = {
      id: newId,
      name,
      age,
      gender,
      village: "Unassigned PHC Center",
      screenDate: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric"
      }),
      grade: 1,
      gradeText: GRADE_LABELS[1]
    };
    setPatients((prev) => [newPatient, ...prev]);
    return newPatient;
  }

  // Placeholder for a real upload -> AI pipeline call (see webapp/app.py /analyze).
  // For now it just returns whatever hardcoded analysis exists for the patient,
  // or a generic "pending" shape if none exists yet.
  function runAnalysis(patientId, _imageFile) {
    return (
      analysisResults[patientId] ?? {
        status: "pending",
        grade: null,
        gradeText: "Awaiting analysis",
        confidence: null,
        maCount: null,
        hemCount: null,
        exudateCount: null,
        gradcam_url: null,
        enhanced_url: null,
        quality: null,
        recommendation: ""
      }
    );
  }

  function setPatientAnalysis(patientId, result) {
    setAnalysisResults((prev) => ({ ...prev, [patientId]: result }));
  }

  const value = {
    patients,
    specialists,
    analysisResults,
    activePatientId,
    setActivePatientId,
    activePatient,
    activeAnalysis,
    addPatient,
    runAnalysis,
    setPatientAnalysis
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within an AppProvider");
  return ctx;
}
