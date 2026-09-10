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
      <div className="mb-5 rounded-2xl bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.04)]">
        <h2 className="font-helvetica-neue text-lg font-medium text-[#010110]">Nearest Specialists</h2>
        <p className="font-tight text-sm text-[#45545e]">
          Refer patients directly to regional ophthalmology partners
          {activePatient ? ` for ${activePatient.name} (${activePatient.id})` : ""}
        </p>
      </div>

      <div>
        {specialists.map((specialist) => (
          <SpecialistCard key={specialist.id} specialist={specialist} onSend={handleSend} />
        ))}
        {specialists.length === 0 && <p className="font-tight text-sm text-[#45545e]">No specialists loaded yet.</p>}
      </div>
    </section>
    </FadeIn>
  );
}
