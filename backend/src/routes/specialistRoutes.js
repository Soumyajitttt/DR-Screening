const express = require("express");
const { getSpecialists, sendReferral } = require("../controllers/specialistController");

const router = express.Router();

router.get("/", getSpecialists);
router.post("/:id/send", sendReferral);

module.exports = router;
