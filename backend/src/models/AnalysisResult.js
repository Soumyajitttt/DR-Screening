const mongoose = require("mongoose");

const analysisResultSchema = new mongoose.Schema(
  {
    patientId: { type: String, required: true, unique: true, index: true },
    status: { type: String, default: "pending" },
    grade: { type: Number },
    gradeText: { type: String },
    confidence: { type: Number },
    maCount: { type: Number },
    hemCount: { type: Number },
    exudateCount: { type: Number },
    gradcam_url: { type: String, default: null },
    enhanced_url: { type: String, default: null },
    quality: {
      fieldQualityScore: Number,
      illumination: String,
      macularCentering: String
    },
    recommendation: { type: String }
  },
  { timestamps: true }
);

analysisResultSchema.set("toJSON", {
  transform: (_doc, ret) => {
    delete ret._id;
    delete ret.__v;
    delete ret.patientId;
    return ret;
  }
});

module.exports = mongoose.model("AnalysisResult", analysisResultSchema);
