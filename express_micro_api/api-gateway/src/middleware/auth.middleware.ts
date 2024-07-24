import { NextFunction, Request, Response } from "express";
import { logger } from "../application/logger";
import { authResponse, UserRequest } from "../model/user.model";
import axios from "axios";

export const authMiddleware = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  // Provided token here
  const token = req.get("X-API-TOKEN");

  // Check if token is provided
  if (!token) {
    res
      .status(401)
      .json({
        error: "Unauthorized access",
        message: "token is not provided",
      })
      .end();
  }

  // Declare fetch configuration here - Fetch Auth API from user service
  const authServiceUrl = process.env.USER_SERVICE_URL + "/auth";
  //Fetch auth from user service
  axios
    .get<authResponse>(authServiceUrl, {
      data: {
        token: token,
      },
    })
    .then((result) => {
      req.user = result.data.data.user;
      logger.info("pass auth");
      next();
      return;
    })
    .catch((error) => {
      logger.info("GATEWAY MIDDLEWARE ERROR - REQ");
      res
        .status(401)
        .json({
          error: "Unauthorized access",
          message: error,
        })
        .end();
    });
};
