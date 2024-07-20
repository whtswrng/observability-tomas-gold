import express from "express";
import logger from "./logger";
import { PORT } from "./config";
import cookieParser from "cookie-parser";
import { authorized } from "./middlewares/auth";
import { getMetrics } from "./actions/metrics";

// Create the Express application
const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Get user endpoint
app.get("/api/alerting/v1/active-alerts", authorized, async (req, res) => {
  try {
    res.send([]);
  } catch (e) {
    res.status(500).send("Something went wrong");
  }
});

// Start the server
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
