const TABS = [
  { key: "analysis", label: "Analysis" },
  { key: "results", label: "Result / Grading" },
  { key: "report", label: "Report" }
];

export default function ReportTabs({ activeTab, onChange }) {
  return (
    <div className="mb-6 flex gap-1 border-b-2 border-slate-200">
      {TABS.map((tab) => (
        <button
          key={tab.key}
          aria-selected={activeTab === tab.key}
          onClick={() => onChange(tab.key)}
          className={`-mb-0.5 border-b-2 px-4 py-2.5 text-sm font-semibold transition-colors ${
            activeTab === tab.key
              ? "border-sky-600 text-sky-600"
              : "border-transparent text-slate-500 hover:text-sky-600"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
