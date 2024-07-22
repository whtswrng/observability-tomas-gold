import { User } from "src";

export function assertUserAuthorized(user: any): asserts user is User {
  if (typeof user.id !== "string") {
    throw new Error("User is not properly defined or is not of type User");
  }
}
