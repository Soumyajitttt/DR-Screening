import GradeBadge from "./GradeBadge";

function PatientRow({ patient, onViewReport }) {
  const isGraded = patient.grade != null && patient.gradeText;

  return (
    <tr className="border-b border-black/5 last:border-0 hover:bg-[#f8f8f8]">
      <td className="px-4 py-3 font-tight font-semibold text-[#242424]">{patient.id}</td>
      <td className="px-4 py-3">
        <div className="font-tight font-medium text-[#010110]">{patient.name}</div>
        <div className="font-tight text-xs text-[#45545e]">
          {patient.age} Yrs • {patient.gender}
        </div>
      </td>
      <td className="px-4 py-3 font-tight text-sm text-[#45545e]">{patient.screenDate}</td>
      <td className="px-4 py-3">
        {isGraded ? (
          <GradeBadge grade={patient.grade} gradeText={patient.gradeText} />
        ) : (
          <span className="font-tight text-xs text-[#8a8f98]">Not analysed</span>
        )}
      </td>
      <td className="px-4 py-3">
        <button
          onClick={() => onViewReport(patient.id)}
          className="rounded-full border border-black/15 px-3 py-1 font-tight text-xs font-semibold text-[#010110] transition hover:bg-[#f5f5f2]"
        >
          View Report &rarr;
        </button>
      </td>
    </tr>
  );
}

export default function PatientTable({ patients, onViewReport }) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.04)]">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="bg-[#f5f5f5] font-tight text-xs font-semibold uppercase text-[#45545e]">
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
              <td colSpan={5} className="px-4 py-6 text-center font-tight text-sm text-[#45545e]">
                No patients found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}