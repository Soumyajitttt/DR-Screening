import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import ReportTabs from "../components/ReportTabs";
import AnalysisTab from "../components/tabs/AnalysisTab";
import ResultsTab from "../components/tabs/ResultsTab";
import ReportTab from "../components/tabs/ReportTab";

export default function UserReportPage() {
  const { activePatient, activeAnalysis, runAnalysis, setPatientAnalysis } = useApp();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("analysis");

  if (!activePatient) {
    return (
      <section>
        <p>No patient selected. Go to the Database page and choose a patient.</p>
        <button onClick={() => navigate("/database")}>Back to Database</button>
      </section>
    );
  }

  function handleImageSelected(file) {
    // Placeholder: in the real app this should POST to /analyze (see webapp/app.py)
    // and store the returned result via setPatientAnalysis.
    const result = runAnalysis(activePatient.id, file);
    setPatientAnalysis(activePatient.id, result);
  }

  function handleRunDiagnostics() {
    setActiveTab("results");
  }

  return (
    <section>
      <div>
        <span>ACTIVE USER REPORT</span>
        <h2>
          {activePatient.name} (ID: {activePatient.id})
        </h2>
        <button onClick={() => navigate("/database")}>Back to Database</button>
      </div>

      <ReportTabs activeTab={activeTab} onChange={setActiveTab} />

      {activeTab === "analysis" && (
        <AnalysisTab
          analysis={activeAnalysis}
          onImageSelected={handleImageSelected}
          onRunDiagnostics={handleRunDiagnostics}
        />
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
  );
}
