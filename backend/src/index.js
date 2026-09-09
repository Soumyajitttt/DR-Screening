const app = require("./app");
const config = require("./config/env");
const { connectDB } = require("./config/db");

async function start() {
  await connectDB();
  app.listen(config.port, () => {
    console.log(`DR Screening backend listening on http://localhost:${config.port}`);
  });
}

start();
