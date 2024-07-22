import express from "express";
import logger from "./logger";
import { PORT } from "./config";
import cookieParser from "cookie-parser";
import { authorized } from "./middlewares/auth";
import { getEntities } from "./actions/entities";
import { getMetrics } from "./actions/metrics";
import { getCpuLoadEvents } from "./actions/cpu-load-events/cpu-load-events";
import { assertUserAuthorized } from "./utils/assert-user-authorized";

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

app.get("/api/data/v1/metrics", authorized, async (req, res) => {
  try {
    assertUserAuthorized(req.user);
    const hostId = req.query?.hostId;
    const fromTime = req.query?.fromTime ? parseInt(req.query?.fromTime.toString()) : Date.now();
    const toTime = req.query?.toTime ? parseInt(req.query?.toTime.toString()) : Date.now();

    if(!hostId) return res.status(400).send("Missing hostId");

    const data = await getMetrics(req.user?.orgId, req.user.id, hostId.toString(), fromTime, toTime);

    setTimeout(() => {
      res.send(data);
    }, 500);
  } catch (e) {
    res.status(500).send("Something went wrong");
  }
});

app.get("/api/data/v1/cpu-load-events", authorized, async (req, res) => {
  try {
    assertUserAuthorized(req.user);
    const hostId = req.query?.hostId;
    const fromTime = req.query?.fromTime ? parseInt(req.query?.fromTime.toString()) : Date.now();
    const toTime = req.query?.toTime ? parseInt(req.query?.toTime.toString()) : Date.now();

    if(!hostId) return res.status(400).send("Missing hostId");

    const data = await getCpuLoadEvents(req.user.orgId, req.user.id, hostId?.toString(), fromTime, toTime);

    setTimeout(() => {
      res.send(data);
    }, 500);
  } catch (e) {
    res.status(500).send("Something went wrong");
  }
});

app.get("/api/data/v1/entities", authorized, async (req, res) => {
  try {
    assertUserAuthorized(req.user);
    const data = await getEntities(req.user.orgId, req.user.id);
    res.send(data);
  } catch (e) {
    res.status(500).send("Something went wrong");
  }
});

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
