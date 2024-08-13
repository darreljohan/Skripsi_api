import winston from "winston";

export const logger = winston.createLogger({
  level: "debug",
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({
      silent: process.argv.indexOf("--silent") >= 0,
    }),
  ],
});
