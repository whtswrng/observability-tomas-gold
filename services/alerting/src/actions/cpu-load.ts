import axios from "axios";
import { DATA_SERVICE_ENDPOINT } from "../config";

interface CpuLoad {
  events: Array<CpuLoadEvent>;
}

interface CpuLoadEvent {
  type: CpuLoadEventType;
  startTimestamp: number;
}

export enum CpuLoadEventType {
  Idle = "IDLE",
  HeavyLoad = "HEAVY_LOAD",
  Recovered = "RECOVERED",
}

export const getCpuLoadEvents = async (jwt, host, fromTime, toTime): Promise<CpuLoad> => {
  const r = await axios.get(
    `${DATA_SERVICE_ENDPOINT}/api/data/v1/cpu-load-events?hostId=${host}&fromTime=${fromTime}&toTime=${toTime}`,
    {
      headers: {
        // In production, we'd use Authorization header
        Cookie: "token=" + jwt,
      },
    }
  );
  return r.data;
};
