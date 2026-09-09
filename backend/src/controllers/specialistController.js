const Specialist = require("../models/Specialist");
const Patient = require("../models/Patient");
const asyncHandler = require("../utils/asyncHandler");

// GET /api/specialists
const getSpecialists = asyncHandler(async (req, res) => {
  const specialists = await Specialist.find().sort({ distanceKm: 1 });
  res.json(specialists);
});

// POST /api/specialists/:id/send  { patientId }
// Placeholder referral action - just echoes confirmation for now.
const sendReferral = asyncHandler(async (req, res) => {
  const specialist = await Specialist.findOne({ specialistId: req.params.id });
  if (!specialist) {
    return res.status(404).json({ error: `Specialist ${req.params.id} not found` });
  }

  const { patientId } = req.body;
  const patient = patientId ? await Patient.findOne({ patientId }) : null;

  // TODO: wire this up to a real notification/email/SMS service.
  res.json({
    message: patient
      ? `Report for ${patient.name} (${patient.patientId}) transmitted to ${specialist.name}.`
      : `Referral transmitted to ${specialist.name}.`
  });
});

module.exports = { getSpecialists, sendReferral };
