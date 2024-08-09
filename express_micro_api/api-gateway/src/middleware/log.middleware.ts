import { NextFunction, Request, Response } from "express";
import { logger } from "../application/logger";
import axios from "axios";

export const logMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info(
    "Api Gateway | Log Middleware | Receive request to route " + req.originalUrl
  );
  next();
};
