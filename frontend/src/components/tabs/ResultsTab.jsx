import GradeBadge from "../GradeBadge";

export default function ResultsTab({ analysis, onViewDetailedDiagnostics, onGenerateReport }) {
  if (!analysis) {
    return <p className="text-sm text-slate-500">No analysis available for this patient yet.</p>;
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <div className="rounded-lg border border-slate-200 bg-white p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-lg font-semibold text-slate-800">AI Retinal Visualization</h3>
          <GradeBadge grade={analysis.grade} gradeText={analysis.gradeText} />
        </div>

        <div className="flex min-h-[280px] items-center justify-center rounded-lg bg-slate-900 text-slate-400">
          {analysis.enhanced_url ? (
            <img src={analysis.enhanced_url} alt="Enhanced fundus scan" className="max-h-72 rounded-lg" />
          ) : (
            <p className="text-sm">[ Fundus image viewer placeholder ]</p>
          )}
        </div>

        <div className="mt-4 flex flex-wrap justify-center gap-2">
          <button className="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium hover:bg-slate-50">
            Original Scan
          </button>
          <button className="rounded-md bg-sky-600 px-3 py-1.5 text-sm font-medium text-white">
            Grad-CAM Heatmap
          </button>
          <button
            onClick={onViewDetailedDiagnostics}
            className="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium hover:bg-slate-50"
          >
            Detailed Diagnostics &rarr;
          </button>
        </div>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-6">
        <h3 className="mb-3 text-lg font-semibold text-slate-800">Detection Summary</h3>
        <p className="mb-4 text-sm text-slate-600">
          Confidence Level:{" "}
          <strong className="text-slate-800">
            {analysis.confidence != null ? `${(analysis.confidence * 100).toFixed(1)}%` : "N/A"}
          </strong>
        </p>

        <h4 className="mb-2 text-sm font-semibold text-slate-700">Key Lesion Highlights</h4>
        <ul className="mb-5 space-y-1 text-sm text-slate-600">
          <li>
            Microaneurysms: <strong className="text-slate-800">{analysis.maCount ?? "N/A"}</strong>
          </li>
          <li>
            Intraretinal Hemorrhages: <strong className="text-slate-800">{analysis.hemCount ?? "N/A"}</strong>
          </li>
          <li>
            Hard Exudates: <strong className="text-slate-800">{analysis.exudateCount ?? "N/A"}</strong>
          </li>
        </ul>

        <button
          onClick={onGenerateReport}
          className="w-full rounded-md bg-sky-600 py-2 text-sm font-semibold text-white hover:bg-sky-700"
        >
          Generate PDF Report &rarr;
        </button>
      </div>
    </div>
  );
}
