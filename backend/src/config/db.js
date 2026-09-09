const mongoose = require("mongoose");
const config = require("./env");

// Connects to MongoDB (local or Atlas) using MONGODB_URI from .env.
// On first successful connection, kicks off a one-time seed of demo data
// so the app has something to show against a brand-new, empty database.
async function connectDB() {
  mongoose.set("strictQuery", true);

  try {
    await mongoose.connect(config.mongodbUri, { serverSelectionTimeoutMS: 5000 });
    console.log(`[config/db] MongoDB connected -> ${mongoose.connection.name}`);

    const { seedIfEmpty } = require("../utils/seed");
    await seedIfEmpty();
  } catch (err) {
    console.error("[config/db] MongoDB connection failed:", err.message);
    console.error(
      "[config/db] Set MONGODB_URI in backend/.env (see .env.example). " +
        "The server will keep running, but data routes will fail until MongoDB is reachable."
    );
  }
}

module.exports = { connectDB };
