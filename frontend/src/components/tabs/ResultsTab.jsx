import GradeBadge from "../GradeBadge";

export default function ResultsTab({ analysis, onViewDetailedDiagnostics, onGenerateReport }) {
  if (!analysis) {
    return <p className="font-tight text-sm text-[#45545e]">No analysis available for this patient yet.</p>;
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <div className="rounded-2xl bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.04)]">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <h3 className="font-helvetica-neue text-lg font-medium text-[#010110]">AI Retinal Visualization</h3>
          <GradeBadge grade={analysis.grade} gradeText={analysis.gradeText} />
        </div>

        <div className="flex min-h-[280px] items-center justify-center rounded-2xl bg-[#111318] text-white/50">
          {analysis.enhanced_url ? (
            <img src={analysis.enhanced_url} alt="Enhanced fundus scan" className="max-h-72 rounded-xl" />
          ) : (
            <p className="font-tight text-sm">[ Fundus image viewer placeholder ]</p>
          )}
        </div>

        <div className="mt-4 flex flex-wrap justify-center gap-2">
          <button className="rounded-full border border-black/15 px-3 py-1.5 font-tight text-sm font-medium text-[#242424] transition hover:bg-[#f5f5f2]">
            Original Scan
          </button>
          <button className="rounded-full bg-[#111318] px-3 py-1.5 font-tight text-sm font-medium text-white">
            Grad-CAM Heatmap
          </button>
          <button
            onClick={onViewDetailedDiagnostics}
            className="rounded-full border border-black/15 px-3 py-1.5 font-tight text-sm font-medium text-[#242424] transition hover:bg-[#f5f5f2]"
          >
            Detailed Diagnostics &rarr;
          </button>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.04)]">
        <h3 className="mb-3 font-helvetica-neue text-lg font-medium text-[#010110]">Detection Summary</h3>
        <p className="mb-4 font-tight text-sm text-[#45545e]">
          Confidence Level:{" "}
          <strong className="text-[#010110]">
            {analysis.confidence != null ? `${(analysis.confidence * 100).toFixed(1)}%` : "N/A"}
          </strong>
        </p>

        <h4 className="mb-2 font-tight text-sm font-semibold text-[#242424]">Key Lesion Highlights</h4>
        <ul className="mb-5 space-y-1 font-tight text-sm text-[#45545e]">
          <li>
            Microaneurysms: <strong className="text-[#010110]">{analysis.maCount ?? "N/A"}</strong>
          </li>
          <li>
            Intraretinal Hemorrhages: <strong className="text-[#010110]">{analysis.hemCount ?? "N/A"}</strong>
          </li>
          <li>
            Hard Exudates: <strong className="text-[#010110]">{analysis.exudateCount ?? "N/A"}</strong>
          </li>
        </ul>

        <button
          onClick={onGenerateReport}
          className="w-full rounded-full bg-[#111318] py-2 font-tight text-sm font-semibold text-white transition hover:bg-black"
        >
          Generate PDF Report &rarr;
        </button>
      </div>
    </div>
  );
}
