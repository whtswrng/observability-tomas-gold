import { isEventToday } from "../../utils";
import { CpuLoadEventType, getCpuLoadEvents } from "../cpu-load";
import { getEntities } from "../entities";

interface Notification {
  type: "alert" | "recovery";
  message: string;
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
    const lastEvent = cpuLoad.events[cpuLoad.events.length - 1];

    if (lastEvent) {
      if (lastEvent.type === CpuLoadEventType.HeavyLoad)
        result.notifications.push({
          type: "alert",
          message: `Host '${h.name}' is having troubles with CPU load!`,
          entity: {
            ...h,
          },
        });
      if (lastEvent.type === CpuLoadEventType.Recovered && isEventToday(lastEvent.startTimestamp))
        result.notifications.push({
          type: "recovery",
          message: `Host '${h.name}' is no longer having issues with CPU load!`,
          entity: {
            ...h,
          },
        });
    }
  }
  return result;
}