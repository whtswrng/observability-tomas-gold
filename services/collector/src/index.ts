import express from 'express';
import { appendFile, mkdir } from 'fs';
import { join } from 'path';
import { promisify } from 'util';
import logger from './logger';
import { PORT } from './config';

const app = express();

app.use(express.json());

const appendFileAsync = promisify(appendFile);
const mkdirAsync = promisify(mkdir);

app.post('/v1/collect', async (req, res) => {
  const { userId, orgId, cpuAvg, timestamp, hostId } = req.body;

  if (!userId || !orgId || !timestamp || !hostId || cpuAvg === undefined) {
    return res.status(400).send('Missing on of the required fields: userId, orgId, cpuAvg, timestamp, hostId');
  }

  try {
    // here we would call our big data DB
    // for the purposes of POC, we will just store it in the file
    const orgDir = join(__dirname, '..', '..', 'db', orgId);
    const filePath = join(orgDir, `cpu_avg_${hostId}`);

    await mkdirAsync(orgDir, { recursive: true });

    const logEntry = `${timestamp};${cpuAvg}\n`;
    await appendFileAsync(filePath, logEntry);

    res.status(200).send();
  } catch (error) {
    logger.error('Error recording CPU average:', error);
    res.status(500).send('Internal server error');
  }
});

app.listen(PORT, () => {
  logger.info(`Server is running at http://localhost:${PORT}`);
});
