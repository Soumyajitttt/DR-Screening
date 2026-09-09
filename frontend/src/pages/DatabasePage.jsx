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
      <div className="rounded-lg border border-slate-200 bg-white p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-slate-800">Database / Patient Registry</h2>
            <p className="text-sm text-slate-500">Manage and search patient screening records</p>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search patient name, ID, or village..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-64 max-w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
            />
            <button
              onClick={() => setModalOpen(true)}
              className="whitespace-nowrap rounded-md bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700"
            >
              Add New
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-[220px_1fr]">
        <div className="h-fit rounded-lg border border-slate-200 bg-white p-3">
          <div className="mb-2 px-2 text-xs font-bold uppercase text-slate-400">Storage Drives</div>
          {GRADE_FILTERS.map((filter) => (
            <div
              key={filter.key}
              aria-selected={gradeFilter === filter.key}
              onClick={() => setGradeFilter(filter.key)}
              className={`cursor-pointer rounded-md px-3 py-2 text-sm font-medium ${
                gradeFilter === filter.key ? "bg-sky-100 text-sky-800" : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {filter.label}
            </div>
          ))}
        </div>

        <div>
          {patientsLoading && <p className="mb-3 text-sm text-slate-500">Loading patients...</p>}
          {patientsError && <p className="mb-3 text-sm font-medium text-red-600">{patientsError}</p>}
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
