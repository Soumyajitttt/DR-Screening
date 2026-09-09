import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import FadeIn from "../components/FadeIn";

export default function GradingDetailPage() {
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
    <section className="rounded-lg border border-slate-200 bg-white p-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-slate-800">Diagnostic Grading &amp; Grad-CAM Analysis</h2>
        <button
          onClick={() => navigate("/report")}
          className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          &larr; Back to User Report
        </button>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
          <h4 className="text-xs font-bold uppercase text-slate-400">1. Grade</h4>
          <div className="my-2 text-xl font-extrabold text-red-600">{activeAnalysis.gradeText}</div>
          <p className="text-sm text-slate-500">Automated grading based on lesion density and distribution.</p>
        </div>

        <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
          <h4 className="text-xs font-bold uppercase text-slate-400">2. Confidence</h4>
          <div className="my-2 text-xl font-extrabold text-sky-600">
            {activeAnalysis.confidence != null ? `${(activeAnalysis.confidence * 100).toFixed(1)}%` : "N/A"}
          </div>
          <p className="text-sm text-slate-500">Calibrated against Indian fundus dataset variations.</p>
        </div>

        <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
          <h4 className="text-xs font-bold uppercase text-slate-400">3. Grad-CAM</h4>
          <div className="my-2 text-lg font-bold text-teal-600">
            {activeAnalysis.gradcam_url ? "Heatmap Available" : "Heatmap Pending"}
          </div>
          <p className="text-sm text-slate-500">Explains the neural network focus areas for clinician verification.</p>
        </div>
      </div>

      <div className="mt-8 rounded-lg bg-slate-900 p-6 text-white">
        <h3 className="mb-2 font-semibold text-sky-400">Tackling the "Black Box" Problem</h3>
        <p className="text-sm leading-relaxed text-slate-300">
          By utilizing Gradient-weighted Class Activation Mapping (Grad-CAM), the screening tool generates
          pixel-level saliency maps. Field healthcare workers in rural Primary Healthcare Centres can verify
          that the AI is correctly identifying lesions rather than camera dust or artifacts.
        </p>
      </div>
    </section>
    </FadeIn>
  );
}
