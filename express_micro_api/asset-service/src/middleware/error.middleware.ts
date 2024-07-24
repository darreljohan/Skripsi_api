import { NextFunction, Request, Response } from "express";
import { isElementAccessChain } from "typescript";
import { ZodError } from "zod";
import { Logger } from "winston";
import { ResponseError } from "../error/response.error";
import * as fs from "fs";
import path from "path";
import { logger } from "../application/logger";
import { AuthError } from "../error/auth.error";

export const errorMiddleware = async (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof ZodError) {
    res.status(400).json({
      error: `Validation Error from Zod`,
      message: JSON.stringify(error),
    });
  } else if (error instanceof ResponseError) {
    res.status(error.status).json({
      error: "Response Error",
      message: error.message,
    });
  } else if (error instanceof AuthError) {
    res.status(401).json({
      error: "Response Error",
      message: error.message,
    });
  } else {
    logger.info("Asset service- " + error.message);
    res.status(500).json({ error: error.message });
  }
};
