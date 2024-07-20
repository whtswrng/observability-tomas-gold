import { appendFile } from 'fs';
import { cpus } from 'os';
import { join } from 'path';
import axios from 'axios';
import os from 'os';

const scrapeInterval = 5000;
const COLLECTOR_ENDPOINT = process.env.COLLECTOR_ENDPOINT ?? 'http://localhost:3005';

// Here we would use a token that would identify the customer and his org
// And then send it over "Authorization: Bearer $token" and omit the orgId and userId
const orgId = '150';
const userId = '12345';

function getAverageCpuLoad(): string {
  const cpus = os.cpus().length;
  const loadAverage = os.loadavg()[0] / cpus;
  return loadAverage.toFixed(2);
}

async function logCpuLoad() {
  const load = getAverageCpuLoad();
  // TODO switch to Bearer token and remove orgId and userId
  try {
    await axios.post(`${COLLECTOR_ENDPOINT}/v1/collect`, {timestamp: Date.now(), orgId, userId, cpuAvg: load});
  } catch(e) {
    // TODO gracefully handle errors
    console.error(e);
  }
}

logCpuLoad();
setInterval(logCpuLoad, scrapeInterval);

console.log(`Agent started. Sending CPU load every ${scrapeInterval/1000} seconds...`);
