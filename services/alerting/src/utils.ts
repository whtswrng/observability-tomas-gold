import { isToday } from "date-fns";

// Function to check if the timestamp is today
export function isEventToday(timestamp: number): boolean {
  // Convert the timestamp to a Date object
  const date = new Date(timestamp);

  // Check if the date is today
  return isToday(date);
}
