import pino from "pino";

const level = process.env.LOG_LEVEL ?? "silent";

/** Logs go to stderr so stdout stays a single JSON payload for agents. */
export const logger = pino(
  { level, base: undefined, timestamp: false },
  pino.destination({ fd: 2, sync: true }),
);
