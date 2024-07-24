import { NextFunction, Request, Response } from "express";
import { prismaClient } from "../application/database";
import { UserRequest } from "../model/user.model";
import { logger } from "../application/logger";
import { Validation } from "../validation/validation";
import { UserValidationService } from "../validation/user.validation";

/*
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
*/

//Middleware for converting header to User in UserRequest

export const authMiddleware = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    logger.info("Enter Auth Middleware");
    logger.info(req);
    const userKey = req.get("user");
    const userData = JSON.parse(userKey!);
    const userValidation = Validation.validate(
      UserValidationService.USER,
      userData
    );
    req.user = userData;

    next();
  } catch (error) {
    res.status(401).json({
      error: "Authorization Failed",
      message: error,
    });
  }
};
