import { useApp } from "../context/AppContext";
import SpecialistCard from "../components/SpecialistCard";

export default function SpecialistsPage() {
  const { specialists, activePatient } = useApp();

  function handleSend(specialist) {
    // Placeholder: wire this up to a real "send report" API call later.
    const patientLabel = activePatient ? `${activePatient.name} (${activePatient.id})` : "the current patient";
    alert(`Report for ${patientLabel} has been transmitted to ${specialist.name}!`);
  }

  return (
    <section>
      <div>
        <h2>Nearest Specialists</h2>
        <p>Refer patients directly to regional ophthalmology partners</p>
      </div>

      <div>
        {specialists.map((specialist) => (
          <SpecialistCard key={specialist.id} specialist={specialist} onSend={handleSend} />
        ))}
      </div>
    </section>
  );
}
