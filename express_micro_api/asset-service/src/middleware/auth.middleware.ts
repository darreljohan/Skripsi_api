import { NextFunction, Request, Response } from "express";
import { prismaClient } from "../application/database";
import { UserRequest } from "../model/user.model";
import { logger } from "../application/logger";
import { Validation } from "../validation/validation";
import { UserValidationService } from "../validation/user.validation";

//Middleware for converting header to User in UserRequest

export const authMiddleware = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  try {
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

//Middleware to bypass auth
/*
export const authMiddleware = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  req.user = {
    username: "tester",
    name: "tester",
    password: "test",
    token: "tester",
  };
  next();
};
*/
