import cookieParser from "cookie-parser";
import express from "express";
import { getActiveAlerts } from "./actions/active-alerts/active-alerts";
import { ALERTING_INTERVAL, PORT } from "./config";
import logger from "./logger";
import { authorized } from "./middlewares/auth";

// Create the Express application
const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Get user endpoint
app.get("/api/alerting/v1/active-alerts", authorized, async (req, res) => {
  // connect to multiple services for data, gather information from them
  try {
    const jwt = req.cookies.token;
    const result = await getActiveAlerts(jwt);
    res.send(result);
  } catch (e) {
    logger.error(e);
    res.status(500).send("Something went wrong");
  }
});

setInterval(() => handleAlerting(), ALERTING_INTERVAL);

function handleAlerting() {
  // Periodically checks for problems and sends alerts on slack/email...
}

// Start the server
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
