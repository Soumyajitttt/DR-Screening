// Save as: backend/src/routes/publicAnalysisRoutes.js

const express = require("express");
const upload = require("../middlewares/upload");
const { analyzePublic } = require("../controllers/publicAnalysisController");

const router = express.Router();

router.post("/", upload.single("image"), analyzePublic);

module.exports = router;
