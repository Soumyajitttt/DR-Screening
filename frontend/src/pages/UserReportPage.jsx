import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import ReportTabs from "../components/ReportTabs";
import AnalysisTab from "../components/tabs/AnalysisTab";
import ResultsTab from "../components/tabs/ResultsTab";
import ReportTab from "../components/tabs/ReportTab";
import FadeIn from "../components/FadeIn";

export default function UserReportPage() {
  const { activePatient, activeAnalysis, analyzeImage } = useApp();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("analysis");
  const [uploadError, setUploadError] = useState("");

  if (!activePatient) {
    return (
      <FadeIn>
      <section className="rounded-lg border border-slate-200 bg-white p-6 text-center">
        <p className="mb-4 text-sm text-slate-500">No patient selected. Go to the Database page and choose a patient.</p>
        <button
          onClick={() => navigate("/database")}
          className="rounded-md bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700"
        >
          Back to Database
        </button>
      </section>
      </FadeIn>
    );
  }

  async function handleImageSelected(file) {
    setUploadError("");
    try {
      // Posts to /api/analysis/:patientId/upload (see
      // backend/src/controllers/analysisController.js), which runs the
      // MATLAB pipeline (or a mock result until MATLAB is configured).
      await analyzeImage(activePatient.id, file);
    } catch (err) {
      setUploadError(err.message || "Failed to analyze image");
    }
  }

  function handleRunDiagnostics() {
    setActiveTab("results");
  }

  return (
    <FadeIn>
    <section>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white p-4">
        <div>
          <span className="rounded bg-sky-100 px-2 py-0.5 text-xs font-semibold text-sky-800">
            ACTIVE USER REPORT
          </span>
          <h2 className="mt-1 text-lg font-semibold text-slate-800">
            {activePatient.name} (ID: {activePatient.id})
          </h2>
        </div>
        <button
          onClick={() => navigate("/database")}
          className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          &larr; Back to Database
        </button>
      </div>

      <ReportTabs activeTab={activeTab} onChange={setActiveTab} />

      {activeTab === "analysis" && (
        <>
          {uploadError && <p className="mb-3 text-sm font-medium text-red-600">{uploadError}</p>}
          <AnalysisTab
            analysis={activeAnalysis}
            onImageSelected={handleImageSelected}
            onRunDiagnostics={handleRunDiagnostics}
          />
        </>
      )}

      {activeTab === "results" && (
        <ResultsTab
          analysis={activeAnalysis}
          onViewDetailedDiagnostics={() => navigate("/grading")}
          onGenerateReport={() => navigate("/pdf-report")}
        />
      )}

      {activeTab === "report" && (
        <ReportTab
          patient={activePatient}
          analysis={activeAnalysis}
          onReferToSpecialist={() => navigate("/specialists")}
        />
      )}
    </section>
    </FadeIn>
  );
}
