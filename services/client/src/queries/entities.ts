import axios from "axios";
import { ROUTES } from "./routes";
import { useQuery } from "./query";

export interface Entity {
  type: string;
  name: string;
  id: string;
}

export function useGetHosts() {
  return useQuery<Array<Entity>>(() => axios.get(`${ROUTES.ENTITIES}?type=hosts`));
}
