const Patient = require("../models/Patient");
const asyncHandler = require("../utils/asyncHandler");

// GET /api/patients?search=&grade=
const getPatients = asyncHandler(async (req, res) => {
  const { search = "", grade } = req.query;
  const filter = {};

  if (grade !== undefined && grade !== "all") {
    filter.grade = Number(grade);
  }

  if (search.trim()) {
    const q = search.trim();
    filter.$or = [
      { name: { $regex: q, $options: "i" } },
      { patientId: { $regex: q, $options: "i" } },
      { village: { $regex: q, $options: "i" } }
    ];
  }

  const patients = await Patient.find(filter).sort({ createdAt: -1 });
  res.json(patients);
});

// GET /api/patients/:id
const getPatientById = asyncHandler(async (req, res) => {
  const patient = await Patient.findOne({ patientId: req.params.id });
  if (!patient) {
    return res.status(404).json({ error: `Patient ${req.params.id} not found` });
  }
  res.json(patient);
});

// POST /api/patients
const createPatient = asyncHandler(async (req, res) => {
  const { name, age, gender, village, grade } = req.body;
  if (!name || !age || !gender) {
    return res.status(400).json({ error: "name, age and gender are required" });
  }

  const count = await Patient.countDocuments();
  const patientId = `P-${1024 + count}`;

  const patient = await Patient.create({
    patientId,
    name,
    age: Number(age),
    gender,
    village: village || "Unassigned PHC Center",
    screenDate: new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    }),
    grade: grade != null ? Number(grade) : 1
  });

  res.status(201).json(patient);
});

module.exports = { getPatients, getPatientById, createPatient };
