import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp, GRADE_LABELS } from "../context/AppContext";
import PatientTable from "../components/PatientTable";
import AddPatientModal from "../components/modals/AddPatientModal";
import FadeIn from "../components/FadeIn";

const GRADE_FILTERS = [
  { key: "all", label: "All Patients" },
  { key: "0", label: `Grade 0: Normal` },
  { key: "1", label: `Grade 1: Mild DR` },
  { key: "2", label: `Grade 2: Moderate DR` },
  { key: "3", label: `Grade 3: Severe DR` },
  { key: "4", label: `Grade 4: Proliferative DR` }
];

export default function DatabasePage() {
  const { patients, patientsLoading, patientsError, addPatient, setActivePatientId } = useApp();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [gradeFilter, setGradeFilter] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);

  const filteredPatients = useMemo(() => {
    let list = patients;

    if (gradeFilter !== "all") {
      list = list.filter((p) => p.grade === Number(gradeFilter));
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.id.toLowerCase().includes(q) ||
          p.village.toLowerCase().includes(q)
      );
    }

    return list;
  }, [patients, gradeFilter, search]);

  function handleViewReport(patientId) {
    setActivePatientId(patientId);
    navigate("/report");
  }

  async function handleAddPatient(form) {
    try {
      await addPatient({ name: form.name, age: Number(form.age), gender: form.gender });
      setModalOpen(false);
    } catch (err) {
      alert(err.message || "Failed to add patient");
    }
  }

  return (
    <FadeIn>
    <section className="space-y-4">
      <div className="rounded-2xl bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.04)]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-helvetica-neue text-lg font-medium text-[#010110]">Database / Patient Registry</h2>
            <p className="font-tight text-sm text-[#45545e]">Manage and search patient screening records</p>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search patient name, ID, or village..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-64 max-w-full rounded-xl border border-black/10 bg-white px-3 py-2 font-tight text-sm text-[#010110] placeholder:text-[#8a8f98] focus:border-[#010110] focus:outline-none focus:ring-1 focus:ring-[#010110]/15"
            />
            <button
              onClick={() => setModalOpen(true)}
              className="whitespace-nowrap rounded-full bg-[#111318] px-4 py-2 font-tight text-sm font-semibold text-white transition hover:bg-black"
            >
              Add New
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-[220px_1fr]">
        <div className="h-fit rounded-2xl bg-white p-3 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.04)]">
          <div className="mb-2 px-2 font-tight text-xs font-bold uppercase text-[#8a8f98]">Storage Drives</div>
          {GRADE_FILTERS.map((filter) => (
            <div
              key={filter.key}
              aria-selected={gradeFilter === filter.key}
              onClick={() => setGradeFilter(filter.key)}
              className={`cursor-pointer rounded-xl px-3 py-2 font-tight text-sm font-medium ${
                gradeFilter === filter.key ? "bg-[#efeff0] text-[#010110]" : "text-[#45545e] hover:bg-[#f5f5f5]"
              }`}
            >
              {filter.label}
            </div>
          ))}
        </div>

        <div>
          {patientsLoading && <p className="mb-3 font-tight text-sm text-[#45545e]">Loading patients...</p>}
          {patientsError && <p className="mb-3 font-tight text-sm font-medium text-red-600">{patientsError}</p>}
          <PatientTable patients={filteredPatients} onViewReport={handleViewReport} />
        </div>
      </div>

      <AddPatientModal open={modalOpen} onClose={() => setModalOpen(false)} onSubmit={handleAddPatient} />
    </section>
    </FadeIn>
  );
}

// Re-exported for reference elsewhere if needed.
export { GRADE_LABELS };
