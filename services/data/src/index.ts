import express from "express";
import logger from "./logger";
import { PORT } from "./config";
import cookieParser from "cookie-parser";
import { authorized } from "./middlewares/auth";
import { getEntities } from "./actions/entities";
import { getMetrics } from "./actions/metrics";
import { getCpuLoadEvents } from "./actions/cpu-load-events/cpu-load-events";

// Create the Express application
const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Get user endpoint
app.get("/api/data/v1/metrics", authorized, async (req, res) => {
  try {
    const hostId = req.query?.hostId;
    const fromTime = req.query?.fromTime ? parseInt(req.query?.fromTime.toString()) : Date.now();
    const toTime = req.query?.toTime ? parseInt(req.query?.toTime.toString()) : Date.now();

    // @ts-ignore
    const data = await getMetrics(req.user.orgId, req.user.id, hostId, fromTime, toTime);

    setTimeout(() => {
      res.send(data);
    }, 500);
  } catch (e) {
    res.status(500).send("Something went wrong");
  }
});

app.get("/api/data/v1/cpu-load-events", authorized, async (req, res) => {
  try {
    const hostId = req.query?.hostId;
    const fromTime = req.query?.fromTime ? parseInt(req.query?.fromTime.toString()) : Date.now();
    const toTime = req.query?.toTime ? parseInt(req.query?.toTime.toString()) : Date.now();

    // @ts-ignore
    const data = await getCpuLoadEvents(req.user.orgId, req.user.id, hostId, fromTime, toTime);

    setTimeout(() => {
      res.send(data);
    }, 500);
  } catch (e) {
    res.status(500).send("Something went wrong");
  }
});

app.get("/api/data/v1/entities", authorized, async (req, res) => {
  try {
    // @ts-ignore
    const data = await getEntities(req.user.orgId, req.user.id);
    res.send(data);
  } catch (e) {
    res.status(500).send("Something went wrong");
  }
});

// Start the server
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
