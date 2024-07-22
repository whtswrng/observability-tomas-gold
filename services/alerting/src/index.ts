import cookieParser from "cookie-parser";
import express from "express";
import { getActiveAlerts } from "./actions/active-alerts/active-alerts";
import { ALERTING_INTERVAL, PORT } from "./config";
import logger from "./logger";
import { authorized } from "./middlewares/auth";

export interface User {
  id: string;
  fullName: string;
  orgId: string;
  orgName: string;
}

// TODO move this to separate types file
declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

const app = express();

app.use(express.json());
app.use(cookieParser());

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

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
