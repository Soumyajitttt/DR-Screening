const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { randomUUID } = require("crypto");

const UPLOAD_ROOT = path.join(__dirname, "..", "uploads");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Each upload gets its own job folder, mirroring the Flask app's
    // uploads/<job_id>/ structure so MATLAB has somewhere to write
    // result.json / gradcam.png / enhanced.png alongside the source image.
    const jobId = randomUUID();
    const jobDir = path.join(UPLOAD_ROOT, jobId);
    fs.mkdirSync(jobDir, { recursive: true });
    req.jobId = jobId;
    req.jobDir = jobDir;
    cb(null, jobDir);
  },
  filename: (req, file, cb) => cb(null, file.originalname)
});

const upload = multer({
  storage,
  limits: { fileSize: 15 * 1024 * 1024 }, // 15 MB
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image uploads are allowed"));
    }
    cb(null, true);
  }
});

module.exports = upload;
