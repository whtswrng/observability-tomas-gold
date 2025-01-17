import { User } from "../queries/user";

export function assertUserLoggedIn(user: any): asserts user is User {
  if(typeof user.id !== 'string') {
    throw new Error('User is not properly defined or is not of type User');
  }
}

export function assertHostDefined(data: any): asserts data is string {
  if(typeof data !== 'string') {
    throw new Error('User is not properly defined or is not of type User');
  }
}