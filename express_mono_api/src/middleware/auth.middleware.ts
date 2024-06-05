import { NextFunction, Request, Response } from "express";
import { prismaClient } from "../application/database";
import { UserRequest } from "../model/user.model";
import { logger } from "../application/logger";

export const authMiddleware = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.get("X-API-TOKEN");

  if (token) {
    const user = await prismaClient.user.findFirst({ where: { token: token } });

    if (user) {
      logger.info("auth success");
      req.user = user;
      next();
      return;
    }
  }

  res
    .status(401)
    .json({
      error: "Unauthorized access",
    })
    .end();
};
