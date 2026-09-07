import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function PdfReportPage() {
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
        <h2>Report Preview</h2>
        <div>
          <button onClick={() => navigate("/report")}>Edit</button>
          <button onClick={() => window.print()}>Download / Print PDF</button>
        </div>
      </div>

      <div>
        <div>
          <h2>PRIMARY HEALTH CENTRE TELE-RETINA REPORT</h2>
          <p>Diabetic Retinopathy Screening Network • India</p>
        </div>

        <div>
          <div>Report ID: R-{Math.floor(Math.random() * 900000 + 100000)}</div>
          <div>Date: {new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</div>
        </div>

        <div>
          <div>Patient Name: {activePatient.name}</div>
          <div>Patient ID: {activePatient.id}</div>
          <div>
            Age / Gender: {activePatient.age} Yrs / {activePatient.gender}
          </div>
          <div>Location: {activePatient.village}</div>
        </div>

        <div>
          <h3>Automated Diagnostic Findings</h3>
          <div>Grading Result: {activeAnalysis.gradeText}</div>
          <p>
            Microaneurysms: {activeAnalysis.maCount ?? "N/A"} <br />
            Intraretinal Hemorrhages: {activeAnalysis.hemCount ?? "N/A"} <br />
            Hard Exudates: {activeAnalysis.exudateCount ?? "N/A"} <br />
            AI Confidence Score:{" "}
            {activeAnalysis.confidence != null ? `${(activeAnalysis.confidence * 100).toFixed(1)}%` : "N/A"}
          </p>
        </div>

        <div>
          <h4>Recommendation</h4>
          <p>{activeAnalysis.recommendation}</p>
        </div>

        <div>
          <div>_______________________</div>
          <div>Medical Officer Signature</div>
        </div>
      </div>
    </section>
  );
}
