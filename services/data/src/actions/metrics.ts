import fs from "fs";
import path from "path";


export interface CpuLoadMetrics {
  metrics: Array<{timestamp: number, load: number}>;
  avg: string | null
}

export interface CpuLoadMetric {
  timestamp: number;
  load: number;
}

export const getMetrics = async (orgId: string, userId: string, hostId: string, fromTime: number, toTime: number): Promise<CpuLoadMetrics> => {
  // Here we would query the DB (clickhouse, ...) and fetch the results
  try {
    const filePath = path.resolve(__dirname, "..", "..", "..", "db", orgId, "cpu_avg_" + hostId);
    let data: string = "";

    try {
      data = await fs.promises.readFile(filePath, "utf-8");
    } catch (e) {
      return {metrics: [], avg: null};
    }

    // Split the data into lines
    const lines = data.split("\n");

    // Parse and filter the data
    const metrics = lines
      .map((line) => {
        const [timestampStr, loadStr] = line.split(";");
        const timestamp = parseInt(timestampStr, 10);
        const load = parseFloat(loadStr);
        return { timestamp, load };
      })
      .filter((record) => record.timestamp >= fromTime && record.timestamp <= toTime);

    return { metrics, avg: getAvg(metrics) };
  } catch (err) {
    console.error("Error retrieve the metrics:", err);
    throw new Error("Could not retrieve metrics");
  }
};

function getAvg(metrics) {
  const total = metrics.reduce((acum, item) => {
    return acum + item.load;
  }, 0);
  return (total / metrics.length).toFixed(2);
}
