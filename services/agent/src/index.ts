import axios from "axios";
import os from "os";
import logger from "./logger";
import { COLLECTOR_ENDPOINT, SCRAPE_INTERVAL } from "./config";

// Here we would use a token that would identify the customer and his org
// And then send it over "Authorization: Bearer $token" and omit the orgId and userId
const orgId = "150";
const userId = "12345";
const hostId = "111";

function getAverageCpuLoad(): string | undefined {
  try {
    const cpus = os.cpus().length;
    const loadAverage = os.loadavg()[0] / cpus;
    return loadAverage.toFixed(2);
  } catch (e) {
    logger.warn((e as Error).message ?? "Cannot get CPU information");
  }
}

async function logCpuLoad() {
  const load = getAverageCpuLoad();
  if (!load) return;
  // TODO switch to Bearer token and remove orgId and userId
  // How it works in real life scenario is that user will create token that is bound to his user withing an organization
  try {
    await axios.post(`${COLLECTOR_ENDPOINT}/v1/collect`, {
      timestamp: Date.now(),
      orgId,
      userId,
      cpuAvg: load,
      hostId,
    });
    logger.info(`CPU AVG succesfully sent to collector: "${load}"`);
  } catch (e) {
    // TODO gracefully handle errors
    logger.error((e as Error)?.message ?? "Something went wrong...");
  }
}

logCpuLoad();
setInterval(logCpuLoad, SCRAPE_INTERVAL);

logger.info(`Agent started. Sending CPU load every ${SCRAPE_INTERVAL / 1000} seconds...`);
