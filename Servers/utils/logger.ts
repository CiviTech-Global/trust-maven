/**
 * Production-ready Logger using Winston
 *
 * Features:
 * - Console output with colorization in development
 * - Daily rotating file logs in production
 * - Structured JSON format for log aggregation
 * - Configurable log levels via LOG_LEVEL env var
 */

import { createLogger, format, transports } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import path from "path";

const { combine, timestamp, printf, colorize, json } = format;
const isDev = process.env.NODE_ENV !== "production";
const logLevel = process.env.LOG_LEVEL || (isDev ? "debug" : "info");

const consoleFormat = printf(({ level, message, timestamp: ts }) => {
  return `[${ts}] ${level}: ${message}`;
});

const logDir = path.resolve(process.cwd(), "logs");

// File transport with daily rotation (production)
const fileTransport = new DailyRotateFile({
  filename: path.join(logDir, "app-%DATE%.log"),
  datePattern: "YYYY-MM-DD",
  maxSize: "20m",
  maxFiles: "14d",
  level: "info",
  format: combine(timestamp(), json()),
});

// Error-specific file transport
const errorFileTransport = new DailyRotateFile({
  filename: path.join(logDir, "error-%DATE%.log"),
  datePattern: "YYYY-MM-DD",
  maxSize: "20m",
  maxFiles: "30d",
  level: "error",
  format: combine(timestamp(), json()),
});

// Console transport
const consoleTransport = new transports.Console({
  level: logLevel,
  format: isDev
    ? combine(colorize(), timestamp({ format: "HH:mm:ss" }), consoleFormat)
    : combine(timestamp(), json()),
});

export const logger = createLogger({
  level: logLevel,
  defaultMeta: { service: "trust-maven" },
  transports: isDev
    ? [consoleTransport]
    : [consoleTransport, fileTransport, errorFileTransport],
});
