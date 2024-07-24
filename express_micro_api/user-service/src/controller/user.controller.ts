import { NextFunction, Request, Response } from "express";
import {
  AuthUserRequest,
  LoginUserRequest,
  RegisterUserRequest,
  UpdateUserRequest,
  UserRequest,
} from "../model/user.model";
import { UserService } from "../service/user.service";
import { logger } from "../application/logger";

export class UserController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const request: RegisterUserRequest = req.body as RegisterUserRequest;
      const response = await UserService.register(request);
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const request: LoginUserRequest = req.body as RegisterUserRequest;
      const response = await UserService.login(request);
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }

  static async get(req: UserRequest, res: Response, next: NextFunction) {
    try {
      logger.info("Receiving request! = ", req);
      const response = await UserService.get(req.user!);
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }

  static async update(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request = req.body as UpdateUserRequest;
      const response = await UserService.update(req.user!, request);
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }

  static async logout(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const response = await UserService.logout(req.user!);
      res.status(200).json({ data: "ok" });
    } catch (e) {
      next(e);
    }
  }

  static async verifyToken(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await UserService.verifyToken(
        req.body as AuthUserRequest
      );
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
}
