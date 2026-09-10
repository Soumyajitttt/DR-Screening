export default function ReportTab({ patient, analysis, onReferToSpecialist }) {
  if (!analysis) {
    return <p className="font-tight text-sm text-[#45545e]">No report available for this patient yet.</p>;
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.04)]">
      <h3 className="mb-2 font-helvetica-neue text-lg font-medium text-[#010110]">Executive Clinical Summary</h3>
      <p className="mb-4 font-tight text-sm text-[#45545e]">
        Evaluation report generated following ICMR Diabetic Retinopathy guidelines.
      </p>

      <div className="mb-6 rounded-xl border-l-4 border-red-500 bg-red-50 p-4">
        <strong className="text-red-800">Action Required</strong>
        <p className="mt-1 font-tight text-sm text-red-700">{analysis.recommendation}</p>
      </div>

      <button
        onClick={onReferToSpecialist}
        className="rounded-full bg-[#111318] px-4 py-2 font-tight text-sm font-semibold text-white transition hover:bg-black"
      >
        Refer to Specialist &rarr;
      </button>
    </div>
  );
}
