const path = require("path");
const fs = require("fs");
const AnalysisResult = require("../models/AnalysisResult");
const Patient = require("../models/Patient");
const { labelForGrade } = require("../utils/gradeLabels");
const { runMatlabPipeline } = require("../utils/runMatlabPipeline");
const asyncHandler = require("../utils/asyncHandler");

// GET /api/analysis/:patientId
const getAnalysisForPatient = asyncHandler(async (req, res) => {
  const result = await AnalysisResult.findOne({ patientId: req.params.patientId });
  if (!result) {
    return res.status(404).json({ error: `No analysis found for patient ${req.params.patientId}` });
  }
  res.json(result);
});

// POST /api/analysis/:patientId/upload  (multipart/form-data, field name "image")
// Mirrors the Flask /analyze endpoint: saves the upload, runs the MATLAB
// pipeline (or falls back to a mock result), stores + returns the result.
const uploadAndAnalyze = asyncHandler(async (req, res) => {
  const { patientId } = req.params;

  const patient = await Patient.findOne({ patientId });
  if (!patient) {
    return res.status(404).json({ error: `Patient ${patientId} not found` });
  }

  if (!req.file) {
    return res.status(400).json({ error: "No image uploaded" });
  }

  const imagePath = req.file.path;
  const jobDir = req.jobDir;
  const jobId = req.jobId;

  const raw = await runMatlabPipeline(imagePath, jobDir);

  const resultDoc = {
    ...raw,
    gradeText: raw.grade != null ? labelForGrade(raw.grade) : "Awaiting analysis"
  };

  for (const [fname, key] of [
    ["gradcam.png", "gradcam_url"],
    ["enhanced.png", "enhanced_url"]
  ]) {
    if (!resultDoc[key]) {
      const filePath = path.join(jobDir, fname);
      try {
        fs.accessSync(filePath);
        resultDoc[key] = `/uploads/${jobId}/${fname}`;
      } catch {
        // file doesn't exist, leave as-is
      }
    }
  }

  const saved = await AnalysisResult.findOneAndUpdate(
    { patientId },
    { patientId, ...resultDoc },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  res.json(saved);
});

module.exports = { getAnalysisForPatient, uploadAndAnalyze };
