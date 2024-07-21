import { isEventToday } from "../../utils";
import { CpuLoadEventType, getCpuLoadEvents } from "../cpu-load";
import { getEntities } from "../entities";

interface Notification {
  type: "alert" | "recovery";
  message: string;
  timestamp: number;
  entity: {
    type: string;
    id: string;
    name: string;
  };
}

export async function getActiveAlerts(jwt) {
  const toTime = Date.now();
  // fetches all entities from data service
  const allEntities = await getEntities(jwt);
  const hosts = allEntities.filter((e) => e.type === "host");
  const result = {
    notifications: [] as Array<Notification>,
  };

  for (const h of hosts) {
    const cpuLoad = await getCpuLoadEvents(jwt, h.id, 0, toTime);
    const firstEvent = cpuLoad.events[0];

    if (firstEvent) {
      if (firstEvent.type === CpuLoadEventType.HeavyLoad)
        result.notifications.push({
          type: "alert",
          timestamp: firstEvent.startTimestamp,
          message: `Host '${h.name}' is having troubles with CPU load!`,
          entity: {
            ...h,
          },
        });
      if (firstEvent.type === CpuLoadEventType.Recovered && isEventToday(firstEvent.startTimestamp))
        result.notifications.push({
          type: "recovery",
          timestamp: firstEvent.startTimestamp,
          message: `Host '${h.name}' is no longer having issues with CPU load!`,
          entity: {
            ...h,
          },
        });
    }
  }
  return result;
}