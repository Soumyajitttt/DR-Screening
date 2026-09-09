require("dotenv").config();

module.exports = {
  port: process.env.PORT || 5000,
  clientOrigin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
  mongodbUri: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/dr-screening",
  jwt: {
    secret: process.env.JWT_SECRET || "dev-secret-change-me",
    expiresIn: process.env.JWT_EXPIRES_IN || "8h"
  },
  matlab: {
    exePath: process.env.MATLAB_EXE || "",
    projectRoot: process.env.MATLAB_PROJECT_ROOT || ""
  }
};
