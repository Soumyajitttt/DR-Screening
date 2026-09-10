import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import FadeIn from "../components/FadeIn";

export default function GradingDetailPage() {
  const { activePatient, activeAnalysis } = useApp();
  const navigate = useNavigate();

  if (!activePatient || !activeAnalysis) {
    return (
      <FadeIn>
      <section className="rounded-2xl bg-white p-6 text-center shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.04)]">
        <p className="mb-4 font-tight text-sm text-[#45545e]">No patient/analysis selected yet.</p>
        <button
          onClick={() => navigate("/database")}
          className="rounded-full bg-[#111318] px-4 py-2 font-tight text-sm font-semibold text-white transition hover:bg-black"
        >
          Back to Database
        </button>
      </section>
      </FadeIn>
    );
  }

  return (
    <FadeIn>
    <section className="rounded-2xl bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.04)]">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-helvetica-neue text-lg font-medium text-[#010110]">Diagnostic Grading &amp; Grad-CAM Analysis</h2>
        <button
          onClick={() => navigate("/report")}
          className="rounded-full border border-black/15 px-4 py-2 font-tight text-sm font-medium text-[#242424] transition hover:bg-[#f5f5f2]"
        >
          &larr; Back to User Report
        </button>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <div className="rounded-2xl bg-[#f8f8f8] p-5">
          <h4 className="font-tight text-xs font-bold uppercase text-[#8a8f98]">1. Grade</h4>
          <div className="my-2 text-xl font-extrabold text-red-600">{activeAnalysis.gradeText}</div>
          <p className="font-tight text-sm text-[#45545e]">Automated grading based on lesion density and distribution.</p>
        </div>

        <div className="rounded-2xl bg-[#f8f8f8] p-5">
          <h4 className="font-tight text-xs font-bold uppercase text-[#8a8f98]">2. Confidence</h4>
          <div className="my-2 text-xl font-extrabold text-[#010110]">
            {activeAnalysis.confidence != null ? `${(activeAnalysis.confidence * 100).toFixed(1)}%` : "N/A"}
          </div>
          <p className="font-tight text-sm text-[#45545e]">Calibrated against Indian fundus dataset variations.</p>
        </div>

        <div className="rounded-2xl bg-[#f8f8f8] p-5">
          <h4 className="font-tight text-xs font-bold uppercase text-[#8a8f98]">3. Grad-CAM</h4>
          <div className="my-2 text-lg font-bold text-[#010110]">
            {activeAnalysis.gradcam_url ? "Heatmap Available" : "Heatmap Pending"}
          </div>
          <p className="font-tight text-sm text-[#45545e]">Explains the neural network focus areas for clinician verification.</p>
        </div>
      </div>

      <div className="mt-8 rounded-2xl bg-[#111318] p-6 text-white">
        <h3 className="mb-2 font-helvetica-neue font-medium text-white">Tackling the "Black Box" Problem</h3>
        <p className="font-tight text-sm leading-relaxed text-white/70">
          By utilizing Gradient-weighted Class Activation Mapping (Grad-CAM), the screening tool generates
          pixel-level saliency maps. Field healthcare workers in rural Primary Healthcare Centres can verify
          that the AI is correctly identifying lesions rather than camera dust or artifacts.
        </p>
      </div>
    </section>
    </FadeIn>
  );
}
