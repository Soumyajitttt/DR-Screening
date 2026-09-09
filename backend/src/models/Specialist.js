const mongoose = require("mongoose");

const specialistSchema = new mongoose.Schema(
  {
    specialistId: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    role: { type: String, required: true },
    facility: { type: String, required: true },
    distanceKm: { type: Number, default: 0 }
  },
  { timestamps: true }
);

specialistSchema.set("toJSON", {
  transform: (_doc, ret) => {
    ret.id = ret.specialistId;
    delete ret._id;
    delete ret.specialistId;
    delete ret.__v;
    return ret;
  }
});

module.exports = mongoose.model("Specialist", specialistSchema);
