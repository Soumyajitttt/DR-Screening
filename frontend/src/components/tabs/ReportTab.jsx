export default function ReportTab({ patient, analysis, onReferToSpecialist }) {
  if (!analysis) {
    return <p>No report available for this patient yet.</p>;
  }

  return (
    <div>
      <h3>Executive Clinical Summary</h3>
      <p>Evaluation report generated following ICMR Diabetic Retinopathy guidelines.</p>

      <div>
        <strong>Action Required</strong>
        <p>{analysis.recommendation}</p>
      </div>

      <button onClick={onReferToSpecialist}>Refer to Specialist</button>
    </div>
  );
}
