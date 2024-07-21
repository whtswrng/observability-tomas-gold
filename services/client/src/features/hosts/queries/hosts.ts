import axios from "axios";
import { Entity } from "../../../queries/entities";
import { useQuery } from "../../../queries/query";
import { ROUTES } from "../../../queries/routes";

export function useGetHosts() {
  return useQuery<Array<Entity>>(() => axios.get(`${ROUTES.ENTITIES}?type=hosts`));
}
