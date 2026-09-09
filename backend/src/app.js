const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");

const config = require("./config/env");
const apiRoutes = require("./routes");
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(cors({ origin: config.clientOrigin }));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded/generated images (gradcam.png, enhanced.png, etc.)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api", apiRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
