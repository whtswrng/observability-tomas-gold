import express from 'express';
import { appendFile, mkdir } from 'fs';
import { join } from 'path';
import { promisify } from 'util';

const app = express();
const port = process.env.PORT || 3005;

app.use(express.json());

const appendFileAsync = promisify(appendFile);
const mkdirAsync = promisify(mkdir);

app.post('/v1/collect', async (req, res) => {
  const { userId, orgId, cpuAvg, timestamp } = req.body;

  if (!userId || !orgId || !timestamp || cpuAvg === undefined) {
    return res.status(400).send('Missing on of the required fields: userId, orgId, cpuAvg, timestamp');
  }

  try {
    const orgDir = join(__dirname, '..', '..', 'db', orgId);
    const filePath = join(orgDir, `cpu_avg_${userId}`);

    await mkdirAsync(orgDir, { recursive: true });

    const logEntry = `${timestamp};${cpuAvg}\n`;
    await appendFileAsync(filePath, logEntry);

    res.status(200).send();
  } catch (error) {
    console.error('Error recording CPU average:', error);
    res.status(500).send('Internal server error');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
