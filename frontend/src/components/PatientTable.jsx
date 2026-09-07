import GradeBadge from "./GradeBadge";

function PatientRow({ patient, onViewReport }) {
  return (
    <tr>
      <td>{patient.grade}</td>
      <td>{patient.id}</td>
      <td>
        <div>{patient.name}</div>
        <div>
          {patient.age} Yrs • {patient.gender}
        </div>
      </td>
      <td>{patient.screenDate}</td>
      <td>
        <GradeBadge grade={patient.grade} gradeText={patient.gradeText} />
      </td>
      <td>
        <button onClick={() => onViewReport(patient.id)}>View Report</button>
      </td>
    </tr>
  );
}

export default function PatientTable({ patients, onViewReport }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Status</th>
          <th>Patient ID</th>
          <th>Name &amp; Details</th>
          <th>Screen Date</th>
          <th>Grade</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {patients.map((p) => (
          <PatientRow key={p.id} patient={p} onViewReport={onViewReport} />
        ))}
        {patients.length === 0 && (
          <tr>
            <td colSpan={6}>No patients found.</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
