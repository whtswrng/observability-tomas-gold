import axios from "axios";
import { ROUTES } from "./routes";
import { useQuery } from "./query";

export interface User {
  id: string;
  fullName: string;
  orgId: string;
  orgName: string;
}

export function useGetUser() {
  return useQuery<User>(() => axios.get(ROUTES.USER));
}
