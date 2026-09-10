// Save as: backend/src/controllers/publicAnalysisController.js
//
// Standalone "image in, JSON out" endpoint. No patientId, no DB lookup.
// Reuses your existing runMatlabPipeline.js as-is. Good for letting another
// team (frontend, or a friend's project) integrate directly against the
// MATLAB pipeline for testing.

const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const { runMatlabPipeline } = require("../utils/runMatlabPipeline");
const { labelForGrade } = require("../utils/gradeLabels");
const asyncHandler = require("../utils/asyncHandler");

// POST /api/analyze  (multipart/form-data, field name "image")
const analyzePublic = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No image uploaded (field name must be 'image')" });
  }

  const imagePath = req.file.path;

  // Each request gets its own output folder under uploads/jobs/<jobId>
  const jobId = uuidv4();
  const jobDir = path.join(__dirname, "..", "uploads", "jobs", jobId);
  fs.mkdirSync(jobDir, { recursive: true });

  try {
    const raw = await runMatlabPipeline(imagePath, jobDir);

    const result = {
      jobId,
      ...raw,
      gradeText: raw.grade != null ? labelForGrade(raw.grade) : "Awaiting analysis"
    };

    for (const [fname, key] of [
      ["gradcam.png", "gradcam_url"],
      ["enhanced.png", "enhanced_url"]
    ]) {
      const filePath = path.join(jobDir, fname);
      if (fs.existsSync(filePath)) {
        result[key] = `/uploads/jobs/${jobId}/${fname}`;
      }
    }

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message || "MATLAB pipeline failed" });
  }
});

module.exports = { analyzePublic };
