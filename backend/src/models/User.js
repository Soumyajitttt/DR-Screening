const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// A clinician account. clinicianId is the human-friendly login handle
// (e.g. "PHC-RAMPUR-102"); email is used for registration + password resets.
const userSchema = new mongoose.Schema(
  {
    clinicianId: { type: String, required: true, unique: true, trim: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    facility: { type: String, trim: true, default: "" },
    passwordHash: { type: String, required: true }
  },
  { timestamps: true }
);

userSchema.methods.comparePassword = function comparePassword(candidate) {
  return bcrypt.compare(candidate, this.passwordHash);
};

userSchema.statics.hashPassword = function hashPassword(plain) {
  return bcrypt.hash(plain, 10);
};

// Never leak the hash if a User document is ever sent to the client directly.
userSchema.set("toJSON", {
  transform: (_doc, ret) => {
    delete ret.passwordHash;
    delete ret.__v;
    return ret;
  }
});

module.exports = mongoose.model("User", userSchema);
