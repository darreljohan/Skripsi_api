import { NextFunction, Request, Response } from "express";
import { isElementAccessChain } from "typescript";
import { ZodError } from "zod";
import { ResponseError } from "../error/response.error";
import { Logger } from "winston";
import { MulterError } from "multer";
import { FileUploadError } from "../error/fileUpload.error";
import * as fs from "fs";
import path from "path";
import { logger } from "../application/logger";

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
    logger.error(
      "File Service | Error Middleware | Response Error :" + error.message
    );
  } else if (error instanceof ResponseError) {
    res.status(error.status).json({
      error: "Response Error",
      message: error.message,
    });
    logger.error(
      "File Service | Error Middleware | Response Error :" + error.message
    );
  } else if (error instanceof MulterError) {
    res.status(400).json({
      error: `Error from Multer`,
      message: JSON.stringify(error),
    });
    logger.error(
      "File Service | Error Middleware | Response Error :" + error.message
    );
  } else if (error instanceof FileUploadError) {
    const fileExpired = path.join(
      process.cwd(),
      `file/` + (await error.fileName)
    );
    logger.error(
      "File Service | Error Middleware | Response Error :" + error.message
    );
    fs.rm(fileExpired, { force: true }, (e) => {});
    res.status(400).json({ error: error.message });
  } else {
    res.status(500).json({ error: error.message });
    logger.error(
      "File Service | Error Middleware | Response Error :" + error.message
    );
  }
};
