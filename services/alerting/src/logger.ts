import { createLogger, format, transports } from "winston";
import { SERVICE_NAME } from "./config";
const { combine, timestamp, printf } = format;

// Define custom log format
const customFormat = printf(({ level, message, timestamp }) => {
  return `${SERVICE_NAME}:${timestamp} [${level.toUpperCase()}]: ${message}`;
});

// Create the logger instance
const logger = createLogger({
  level: "info",
  format: combine(timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), customFormat),
  transports: [new transports.Console(), new transports.File({ filename: "combined.log" })],
});

export default logger;
