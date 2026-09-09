const { execFile } = require("child_process");
const fs = require("fs");
const path = require("path");
const config = require("../config/env");

/**
 * Runs the MATLAB DR-screening pipeline on an uploaded image, mirroring what
 * webapp/app.py does in the Python/Flask backend (see runPipelineForWeb.m).
 *
 * If MATLAB_EXE / MATLAB_PROJECT_ROOT aren't configured (e.g. during frontend
 * development, or before MATLAB is installed), this falls back to a mock
 * result so the rest of the app keeps working end-to-end.
 *
 * @param {string} imagePath - absolute path to the uploaded image
 * @param {string} jobDir - absolute path to the per-job output directory
 * @returns {Promise<object>} parsed result.json contents
 */
function runMatlabPipeline(imagePath, jobDir) {
  const { exePath, projectRoot } = config.matlab;

  if (!exePath || !projectRoot) {
    console.warn(
      "[runMatlabPipeline] MATLAB_EXE / MATLAB_PROJECT_ROOT not set - returning mock result. " +
        "Set these in .env once MATLAB is installed and configured."
    );
    return Promise.resolve(mockResult());
  }

  const srcDir = path.join(projectRoot, "src");
  const subfolders = ["quality", "segmentation", "classification", "explainability"];
  const addPaths = subfolders.map((s) => `addpath('${path.join(srcDir, s)}')`).join("; ");

  const matlabExpr =
    `cd('${projectRoot}'); ${addPaths}; addpath('${projectRoot}'); ` +
    `runPipelineForWeb('${imagePath}', '${jobDir}')`;

  return new Promise((resolve, reject) => {
    execFile(exePath, ["-batch", matlabExpr], { timeout: 180000 }, (error, stdout, stderr) => {
      if (error) {
        if (error.code === "ENOENT") {
          return reject(
            new Error(`'${exePath}' not found - is MATLAB desktop installed and on PATH?`)
          );
        }
        if (error.killed) {
          return reject(new Error("MATLAB timed out"));
        }
        return reject(new Error(stderr?.trim() || stdout?.trim() || "MATLAB processing failed"));
      }

      const resultPath = path.join(jobDir, "result.json");
      if (!fs.existsSync(resultPath)) {
        return reject(new Error("No result.json produced - check MATLAB output for errors"));
      }

      try {
        const result = JSON.parse(fs.readFileSync(resultPath, "utf-8"));
        resolve(result);
      } catch (parseErr) {
        reject(new Error("Failed to parse result.json from MATLAB pipeline"));
      }
    });
  });
}

function mockResult() {
  return {
    status: "enhanced",
    score: 3,
    grade: 2,
    confidence: 0.91,
    maCount: 6,
    hemCount: 2,
    exudateCount: 1
  };
}

module.exports = { runMatlabPipeline };
