import axios, { AxiosError } from "axios";
import { ROUTES } from "../queries/routes";
import { User } from "../queries/user";

export class UnauthorizedError extends Error {}

export async function login(username: string, password: string): Promise<User> {
  try {
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
  } catch (e) {
    if ((e as AxiosError).response?.status === 401) throw new UnauthorizedError();
    throw e;
  }
}
