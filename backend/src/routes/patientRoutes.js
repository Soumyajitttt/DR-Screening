const express = require("express");
const { getPatients, getPatientById, createPatient } = require("../controllers/patientController");

const router = express.Router();

router.get("/", getPatients);
router.get("/:id", getPatientById);
router.post("/", createPatient);

module.exports = router;
