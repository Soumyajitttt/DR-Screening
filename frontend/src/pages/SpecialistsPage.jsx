import { useApp } from "../context/AppContext";
import SpecialistCard from "../components/SpecialistCard";
import FadeIn from "../components/FadeIn";

export default function SpecialistsPage() {
  const { specialists, activePatient, sendReferral } = useApp();

  async function handleSend(specialist) {
    try {
      const { message } = await sendReferral(specialist.id);
      alert(message);
    } catch (err) {
      alert(err.message || `Failed to send referral to ${specialist.name}`);
    }
  }

  return (
    <FadeIn>
    <section>
      <div className="mb-5 rounded-lg border border-slate-200 bg-white p-4">
        <h2 className="text-lg font-semibold text-slate-800">Nearest Specialists</h2>
        <p className="text-sm text-slate-500">
          Refer patients directly to regional ophthalmology partners
          {activePatient ? ` for ${activePatient.name} (${activePatient.id})` : ""}
        </p>
      </div>

      <div>
        {specialists.map((specialist) => (
          <SpecialistCard key={specialist.id} specialist={specialist} onSend={handleSend} />
        ))}
        {specialists.length === 0 && <p className="text-sm text-slate-500">No specialists loaded yet.</p>}
      </div>
    </section>
    </FadeIn>
  );
}
