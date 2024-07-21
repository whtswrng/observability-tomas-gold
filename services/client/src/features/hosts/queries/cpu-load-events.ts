import axios from "axios";
import { ROUTES } from "../../../queries/routes";
import { useQuery } from "../../../queries/query";

export interface CpuLoadEvent {
  type: string;
  startTimestamp: number;
  hostId: string;
}

export interface CpuLoadEvents {
  events: Array<CpuLoadEvent>;
}

export function useGetCpuLoadEvents(hostId: string, fromTime: number | null) {
  return useQuery<CpuLoadEvents>(() => axios.get(`${ROUTES.CPU_LOAD_EVENTS}?hostId=${hostId}&fromTime=${fromTime}`));
}
