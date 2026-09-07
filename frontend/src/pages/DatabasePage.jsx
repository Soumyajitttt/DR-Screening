import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp, GRADE_LABELS } from "../context/AppContext";
import PatientTable from "../components/PatientTable";
import AddPatientModal from "../components/modals/AddPatientModal";

const GRADE_FILTERS = [
  { key: "all", label: "All Patients" },
  { key: "0", label: `Grade 0: Normal` },
  { key: "1", label: `Grade 1: Mild DR` },
  { key: "2", label: `Grade 2: Moderate DR` },
  { key: "3", label: `Grade 3: Severe DR` },
  { key: "4", label: `Grade 4: Proliferative DR` }
];

export default function DatabasePage() {
  const { patients, addPatient, setActivePatientId } = useApp();
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

  function handleAddPatient(form) {
    addPatient({ name: form.name, age: Number(form.age), gender: form.gender });
    setModalOpen(false);
  }

  return (
    <section>
      <div>
        <div>
          <h2>Database / Patient Registry</h2>
          <p>Manage and search patient screening records</p>
        </div>

        <div>
          <input
            type="text"
            placeholder="Search patient name, ID, or village..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={() => setModalOpen(true)}>Add New</button>
        </div>
      </div>

      <div>
        <div>
          <div>Storage Drives</div>
          {GRADE_FILTERS.map((filter) => (
            <div
              key={filter.key}
              aria-selected={gradeFilter === filter.key}
              onClick={() => setGradeFilter(filter.key)}
            >
              {filter.label}
            </div>
          ))}
        </div>

        <div>
          <PatientTable patients={filteredPatients} onViewReport={handleViewReport} />
        </div>
      </div>

      <AddPatientModal open={modalOpen} onClose={() => setModalOpen(false)} onSubmit={handleAddPatient} />
    </section>
  );
}

// Re-exported for reference elsewhere if needed.
export { GRADE_LABELS };
