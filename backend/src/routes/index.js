const express = require("express");
const requireAuth = require("../middlewares/auth");
const authRoutes = require("./authRoutes");
const patientRoutes = require("./patientRoutes");
const analysisRoutes = require("./analysisRoutes");
const specialistRoutes = require("./specialistRoutes");
const publicAnalysisRoutes = require("./publicAnalysisRoutes");

const router = express.Router();

router.get("/health", (req, res) => res.json({ status: "ok" }));

// Public
router.use("/auth", authRoutes);

// Everything below requires a valid "Authorization: Bearer <token>" header.
router.use("/patients", requireAuth, patientRoutes);
router.use("/analysis", requireAuth, analysisRoutes);
router.use("/specialists", requireAuth, specialistRoutes);
router.use("/analyze", publicAnalysisRoutes);

module.exports = router;
