import { isToday } from "date-fns";

export function isEventToday(timestamp: number): boolean {
  const date = new Date(timestamp);
  return isToday(date);
}
