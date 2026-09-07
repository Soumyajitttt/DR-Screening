import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function GradingDetailPage() {
  const { activePatient, activeAnalysis } = useApp();
  const navigate = useNavigate();

  if (!activePatient || !activeAnalysis) {
    return (
      <section>
        <p>No patient/analysis selected yet.</p>
        <button onClick={() => navigate("/database")}>Back to Database</button>
      </section>
    );
  }

  return (
    <section>
      <div>
        <h2>Diagnostic Grading &amp; Grad-CAM Analysis</h2>
        <button onClick={() => navigate("/report")}>Back to User Report</button>
      </div>

      <div>
        <div>
          <h4>1. Grade</h4>
          <div>{activeAnalysis.gradeText}</div>
          <p>Automated grading based on lesion density and distribution.</p>
        </div>

        <div>
          <h4>2. Confidence</h4>
          <div>
            {activeAnalysis.confidence != null ? `${(activeAnalysis.confidence * 100).toFixed(1)}%` : "N/A"}
          </div>
          <p>Calibrated against Indian fundus dataset variations.</p>
        </div>

        <div>
          <h4>3. Grad-CAM</h4>
          <div>{activeAnalysis.gradcam_url ? "Heatmap Available" : "Heatmap Pending"}</div>
          <p>Explains the neural network focus areas for clinician verification.</p>
        </div>
      </div>

      <div>
        <h3>Tackling the "Black Box" Problem</h3>
        <p>
          By utilizing Gradient-weighted Class Activation Mapping (Grad-CAM), the screening tool generates
          pixel-level saliency maps. Field healthcare workers in rural Primary Healthcare Centres can verify
          that the AI is correctly identifying lesions rather than camera dust or artifacts.
        </p>
      </div>
    </section>
  );
}
