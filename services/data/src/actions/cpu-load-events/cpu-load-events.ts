import { getMetrics } from "../metrics";
import { LoadStateMachine } from "./load-state-machine";

export const getCpuLoadEvents = async (
  orgId: string,
  userId: string,
  hostId: string,
  fromTime: number,
  toTime: number
) => {
  try {
    const data = await getMetrics(orgId, userId, hostId, fromTime, toTime);
    const loadMachine = new LoadStateMachine();

    for (let i = 0; i < data.metrics.length; i++) {
      loadMachine.handle(data.metrics[i])
    }

    const events = loadMachine.getEvents().map((e) => ({
      ...e,
      hostId
    }));

    return { events };
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
