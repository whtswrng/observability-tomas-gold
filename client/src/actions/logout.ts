import axios from "axios";
import { ROUTES } from "../queries/routes";

export async function logout(): Promise<void> {
  return axios.post(
    ROUTES.LOGOUT,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
