const jwt = require("jsonwebtoken");
const User = require("../models/User");
const config = require("../config/env");
const asyncHandler = require("../utils/asyncHandler");

function issueToken(user) {
  return jwt.sign({ sub: user.clinicianId, name: user.name }, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn
  });
}

// POST /api/auth/register  { clinicianId, name, email, password, facility? }
const register = asyncHandler(async (req, res) => {
  const { clinicianId, name, email, password, facility } = req.body;

  if (!clinicianId || !name || !email || !password) {
    return res
      .status(400)
      .json({ error: "clinicianId, name, email and password are required" });
  }
  if (password.length < 8) {
    return res.status(400).json({ error: "Password must be at least 8 characters" });
  }

  const existing = await User.findOne({
    $or: [{ clinicianId }, { email: email.toLowerCase() }]
  });
  if (existing) {
    return res
      .status(409)
      .json({ error: "An account with that clinician ID or email already exists" });
  }

  const user = await User.create({
    clinicianId,
    name,
    email,
    facility: facility || "",
    passwordHash: await User.hashPassword(password)
  });

  const token = issueToken(user);
  res.status(201).json({ token, user: { id: user.clinicianId, name: user.name } });
});

// POST /api/auth/login  { clinicianId, password }
const login = asyncHandler(async (req, res) => {
  const { clinicianId, password } = req.body;

  if (!clinicianId || !password) {
    return res.status(400).json({ error: "clinicianId and password are required" });
  }

  const user = await User.findOne({ clinicianId });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ error: "Invalid clinician ID or password" });
  }

  const token = issueToken(user);
  res.json({ token, user: { id: user.clinicianId, name: user.name } });
});

// GET /api/auth/me  (requires Authorization header)
const me = asyncHandler(async (req, res) => {
  res.json({ user: req.user });
});

module.exports = { register, login, me };
