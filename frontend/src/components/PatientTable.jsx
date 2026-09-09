import GradeBadge from "./GradeBadge";

const DOT_COLORS = {
  0: "bg-emerald-500",
  1: "bg-yellow-500",
  2: "bg-orange-500",
  3: "bg-red-500",
  4: "bg-purple-500"
};

function PatientRow({ patient, onViewReport }) {
  return (
    <tr className="border-b border-slate-200 last:border-0 hover:bg-slate-50">
      <td className="px-4 py-3">
        <span className={`inline-block h-2.5 w-2.5 rounded-full ${DOT_COLORS[patient.grade] ?? "bg-slate-400"}`} />
      </td>
      <td className="px-4 py-3 font-semibold text-slate-700">{patient.id}</td>
      <td className="px-4 py-3">
        <div className="font-medium text-slate-800">{patient.name}</div>
        <div className="text-xs text-slate-500">
          {patient.age} Yrs • {patient.gender}
        </div>
      </td>
      <td className="px-4 py-3 text-sm text-slate-600">{patient.screenDate}</td>
      <td className="px-4 py-3">
        <GradeBadge grade={patient.grade} gradeText={patient.gradeText} />
      </td>
      <td className="px-4 py-3">
        <button
          onClick={() => onViewReport(patient.id)}
          className="rounded-md border border-sky-600 px-3 py-1 text-xs font-semibold text-sky-600 hover:bg-sky-50"
        >
          View Report &rarr;
        </button>
      </td>
    </tr>
  );
}

export default function PatientTable({ patients, onViewReport }) {
  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="bg-slate-100 text-xs font-semibold uppercase text-slate-500">
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Patient ID</th>
            <th className="px-4 py-3">Name &amp; Details</th>
            <th className="px-4 py-3">Screen Date</th>
            <th className="px-4 py-3">Grade</th>
            <th className="px-4 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((p) => (
            <PatientRow key={p.id} patient={p} onViewReport={onViewReport} />
          ))}
          {patients.length === 0 && (
            <tr>
              <td colSpan={6} className="px-4 py-6 text-center text-sm text-slate-500">
                No patients found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
