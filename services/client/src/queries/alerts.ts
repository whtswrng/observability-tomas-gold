import axios from "axios";
import { ROUTES } from "./routes";
import { useQuery } from "./query";

export interface Notification {
  type: "alert" | "recovery";
  message: string;
  timestamp: number;
  entity: {
    type: string;
    id: string;
    name: string;
  };
}

export interface Alerts {
  notifications: Array<Notification>
}

export function useGetAlerts() {
  return useQuery<Alerts>(() => axios.get(`${ROUTES.ALERTS}`));
}
