const TABS = [
  { key: "analysis", label: "[ Analysis ]" },
  { key: "results", label: "[ Result / Grading ]" },
  { key: "report", label: "[ Report ]" }
];

export default function ReportTabs({ activeTab, onChange }) {
  return (
    <div className="report-tabs">
      {TABS.map((tab) => (
        <button
          key={tab.key}
          aria-selected={activeTab === tab.key}
          onClick={() => onChange(tab.key)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
