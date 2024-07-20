import axios from "axios";
import { ROUTES } from "../queries/routes";
import { User } from "../queries/user";

export async function login(username: string, password: string): Promise<User> {
  const res = await axios.post(
    ROUTES.LOGIN,
    { username, password },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return res.data;
}
