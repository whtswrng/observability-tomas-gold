import axios from "axios";
import { ROUTES } from "./routes";
import { useQuery } from "./query";

export interface User {
  id: string;
  username: string;
  orgId: string;
}

export function useGetUser() {
  return useQuery<User>(() => axios.get(ROUTES.USER));
}
