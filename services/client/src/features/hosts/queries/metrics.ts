import axios from "axios";
import { ROUTES } from "../../../queries/routes";
import { useQuery } from "../../../queries/query";

export interface CpuLoadMetric {
  timestamp: number;
  load: number;
}

export interface CpuLoadMetrics {
  metrics: Array<CpuLoadMetric>;
  avg: string;
}

export function useGetCpuLoadMetrics(hostId: string, fromTime: number | null) {
  return useQuery<CpuLoadMetrics>(() => axios.get(`${ROUTES.METRICS}?hostId=${hostId}&fromTime=${fromTime}`));
}
