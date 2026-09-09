import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import FadeIn from "../components/FadeIn";

export default function PdfReportPage() {
  const { activePatient, activeAnalysis } = useApp();
  const navigate = useNavigate();

  if (!activePatient || !activeAnalysis) {
    return (
      <FadeIn>
      <section className="rounded-lg border border-slate-200 bg-white p-6 text-center">
        <p className="mb-4 text-sm text-slate-500">No patient/analysis selected yet.</p>
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

  return (
    <FadeIn>
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-800">Report Preview</h2>
        <div className="flex gap-2">
          <button
            onClick={() => navigate("/report")}
            className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            &larr; Edit
          </button>
          <button
            onClick={() => window.print()}
            className="rounded-md bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700"
          >
            Download / Print PDF &rarr;
          </button>
        </div>
      </div>

      <div className="relative mx-auto max-w-3xl rounded-lg border border-slate-300 bg-white p-10 shadow">
        <div className="mb-6 flex justify-between border-b-2 border-slate-200 pb-4">
          <div>
            <h2 className="text-xl font-bold text-sky-700">PRIMARY HEALTH CENTRE TELE-RETINA REPORT</h2>
            <p className="text-sm text-slate-500">Diabetic Retinopathy Screening Network • India</p>
          </div>

          <div className="text-right text-sm text-slate-600">
            <div>Report ID: R-{Math.floor(Math.random() * 900000 + 100000)}</div>
            <div>
              Date:{" "}
              {new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
            </div>
          </div>
        </div>

        <div className="mb-6 grid grid-cols-2 gap-3 rounded-md bg-slate-50 p-4 text-sm">
          <div>
            <strong>Patient Name:</strong> {activePatient.name}
          </div>
          <div>
            <strong>Patient ID:</strong> {activePatient.id}
          </div>
          <div>
            <strong>Age / Gender:</strong> {activePatient.age} Yrs / {activePatient.gender}
          </div>
          <div>
            <strong>Location:</strong> {activePatient.village}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="mb-2 border-b border-slate-200 pb-2 font-semibold text-slate-800">
            Automated Diagnostic Findings
          </h3>
          <div className="mb-2 text-sm">
            <strong>Grading Result:</strong> {activeAnalysis.gradeText}
          </div>
          <p className="text-sm leading-relaxed text-slate-700">
            Microaneurysms: {activeAnalysis.maCount ?? "N/A"} <br />
            Intraretinal Hemorrhages: {activeAnalysis.hemCount ?? "N/A"} <br />
            Hard Exudates: {activeAnalysis.exudateCount ?? "N/A"} <br />
            AI Confidence Score:{" "}
            {activeAnalysis.confidence != null ? `${(activeAnalysis.confidence * 100).toFixed(1)}%` : "N/A"}
          </p>
        </div>

        <div className="border-t border-slate-200 pt-4">
          <h4 className="mb-1 font-semibold text-slate-800">Recommendation</h4>
          <p className="text-sm font-semibold text-red-800">{activeAnalysis.recommendation}</p>
        </div>

        <div className="mt-10 text-sm text-slate-600">
          <div>_______________________</div>
          <div>Medical Officer Signature</div>
        </div>
      </div>
    </section>
    </FadeIn>
  );
}
