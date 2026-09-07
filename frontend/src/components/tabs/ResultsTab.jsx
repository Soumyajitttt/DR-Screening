import GradeBadge from "../GradeBadge";

export default function ResultsTab({ analysis, onViewDetailedDiagnostics, onGenerateReport }) {
  if (!analysis) {
    return <p>No analysis available for this patient yet.</p>;
  }

  return (
    <div>
      <div>
        <h3>AI Retinal Visualization</h3>
        <GradeBadge grade={analysis.grade} gradeText={analysis.gradeText} />

        {/* Placeholder for the fundus image / Grad-CAM overlay viewer. */}
        <div>
          {analysis.enhanced_url ? (
            <img src={analysis.enhanced_url} alt="Enhanced fundus scan" />
          ) : (
            <p>[ Fundus image viewer placeholder ]</p>
          )}
        </div>

        <div>
          <button>Original Scan</button>
          <button>Grad-CAM Heatmap</button>
          <button onClick={onViewDetailedDiagnostics}>Detailed Diagnostics</button>
        </div>
      </div>

      <div>
        <h3>Detection Summary</h3>
        <p>Confidence Level: {analysis.confidence != null ? `${(analysis.confidence * 100).toFixed(1)}%` : "N/A"}</p>

        <h4>Key Lesion Highlights</h4>
        <ul>
          <li>Microaneurysms: {analysis.maCount ?? "N/A"}</li>
          <li>Intraretinal Hemorrhages: {analysis.hemCount ?? "N/A"}</li>
          <li>Hard Exudates: {analysis.exudateCount ?? "N/A"}</li>
        </ul>

        <button onClick={onGenerateReport}>Generate PDF Report</button>
      </div>
    </div>
  );
}
