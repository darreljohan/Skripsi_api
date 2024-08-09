import { NextFunction, Request, Response } from "express";
import { logger } from "../application/logger";

export const logMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info(
    "User Service | Log Middleware | Receive request to route " +
      req.originalUrl
  );
  next();
};
