// One-time demo-data seed, run after MongoDB connects. Only inserts data
// into collections that are completely empty, so it's safe to leave this
// wired up permanently - it never overwrites real data.
const User = require("../models/User");
const Patient = require("../models/Patient");
const AnalysisResult = require("../models/AnalysisResult");
const Specialist = require("../models/Specialist");
const { labelForGrade } = require("./gradeLabels");

const DEMO_PATIENTS = [
  { patientId: "P-1024", name: "Ramesh Kumar", age: 54, gender: "Male", village: "Rampur PHC Center", screenDate: "07 Sep 2026", grade: 3 },
  { patientId: "P-1025", name: "Sunita Devi", age: 48, gender: "Female", village: "Barnala PHC Center", screenDate: "06 Sep 2026", grade: 0 },
  { patientId: "P-1026", name: "Lakshmi Narayanan", age: 61, gender: "Male", village: "Kollam PHC Center", screenDate: "05 Sep 2026", grade: 2 },
  { patientId: "P-1027", name: "Rajesh Patel", age: 52, gender: "Male", village: "Anand PHC Center", screenDate: "04 Sep 2026", grade: 1 },
  { patientId: "P-1028", name: "Ananya Sharma", age: 45, gender: "Female", village: "Rampur PHC Center", screenDate: "03 Sep 2026", grade: 4 }
];

const DEMO_ANALYSIS = {
  "P-1024": { status: "enhanced", grade: 3, confidence: 0.964, maCount: 14, hemCount: 4, exudateCount: 1, quality: { fieldQualityScore: 94, illumination: "Acceptable", macularCentering: "Valid" }, recommendation: "Immediate referral to District Hospital Retinal Specialist for evaluation within 14 days." },
  "P-1025": { status: "enhanced", grade: 0, confidence: 0.988, maCount: 0, hemCount: 0, exudateCount: 0, quality: { fieldQualityScore: 97, illumination: "Acceptable", macularCentering: "Valid" }, recommendation: "No signs of retinopathy detected. Routine annual screening recommended." },
  "P-1026": { status: "enhanced", grade: 2, confidence: 0.912, maCount: 8, hemCount: 2, exudateCount: 3, quality: { fieldQualityScore: 89, illumination: "Acceptable", macularCentering: "Valid" }, recommendation: "Follow-up screening recommended within 6 months." },
  "P-1027": { status: "enhanced", grade: 1, confidence: 0.874, maCount: 3, hemCount: 0, exudateCount: 0, quality: { fieldQualityScore: 91, illumination: "Acceptable", macularCentering: "Valid" }, recommendation: "Routine annual screening recommended." },
  "P-1028": { status: "enhanced", grade: 4, confidence: 0.979, maCount: 21, hemCount: 6, exudateCount: 5, quality: { fieldQualityScore: 92, illumination: "Acceptable", macularCentering: "Valid" }, recommendation: "Urgent referral required. Risk of severe vision loss without immediate intervention." }
};

const DEMO_SPECIALISTS = [
  { specialistId: "SP-01", name: "Dr. Amit Sharma", role: "Ophthalmologist", facility: "District Civil Hospital", distanceKm: 12 },
  { specialistId: "SP-02", name: "Dr. Priya Roy", role: "Vitreoretinal Specialist", facility: "Apex Eye Institute", distanceKm: 28 },
  { specialistId: "SP-03", name: "Dr. V. K. Murthy", role: "Retina Surgeon", facility: "AIIMS Tele-Retina Hub", distanceKm: 45 }
];

const DEMO_USER = {
  clinicianId: "PHC-RAMPUR-102",
  name: "Dr. Kavita Singh",
  email: "kavita.singh@rampur-phc.example.in",
  facility: "Rampur PHC Center",
  password: "password123"
};

async function seedIfEmpty() {
  if ((await User.countDocuments()) === 0) {
    await User.create({
      clinicianId: DEMO_USER.clinicianId,
      name: DEMO_USER.name,
      email: DEMO_USER.email,
      facility: DEMO_USER.facility,
      passwordHash: await User.hashPassword(DEMO_USER.password)
    });
    console.log(
      `[seed] Created demo clinician account ${DEMO_USER.clinicianId} / ${DEMO_USER.password}`
    );
  }

  if ((await Patient.countDocuments()) === 0) {
    await Patient.insertMany(
      DEMO_PATIENTS.map((p) => ({ ...p, gradeText: labelForGrade(p.grade) }))
    );
    console.log(`[seed] Inserted ${DEMO_PATIENTS.length} demo patients`);
  }

  if ((await AnalysisResult.countDocuments()) === 0) {
    await AnalysisResult.insertMany(
      Object.entries(DEMO_ANALYSIS).map(([patientId, result]) => ({
        patientId,
        ...result,
        gradeText: labelForGrade(result.grade)
      }))
    );
    console.log(`[seed] Inserted ${Object.keys(DEMO_ANALYSIS).length} demo analysis results`);
  }

  if ((await Specialist.countDocuments()) === 0) {
    await Specialist.insertMany(DEMO_SPECIALISTS);
    console.log(`[seed] Inserted ${DEMO_SPECIALISTS.length} demo specialists`);
  }
}

module.exports = { seedIfEmpty };
