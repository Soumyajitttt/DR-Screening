export default function ReportTab({ patient, analysis, onReferToSpecialist }) {
  if (!analysis) {
    return <p className="text-sm text-slate-500">No report available for this patient yet.</p>;
  }

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6">
      <h3 className="mb-2 text-lg font-semibold text-slate-800">Executive Clinical Summary</h3>
      <p className="mb-4 text-sm text-slate-500">
        Evaluation report generated following ICMR Diabetic Retinopathy guidelines.
      </p>

      <div className="mb-6 rounded-md border-l-4 border-red-500 bg-red-50 p-4">
        <strong className="text-red-800">Action Required</strong>
        <p className="mt-1 text-sm text-red-700">{analysis.recommendation}</p>
      </div>

      <button
        onClick={onReferToSpecialist}
        className="rounded-md bg-teal-600 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-700"
      >
        Refer to Specialist &rarr;
      </button>
    </div>
  );
}
