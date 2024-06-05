import { NextFunction, Request, Response } from "express";
import { AssetService } from "../service/asset.service";
import { AssetRequest } from "../model/asset.model";
import { UserRequest } from "../model/user.model";
import { logger } from "../application/logger";

export class AssetController {
  static async create(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: AssetRequest = req.body as AssetRequest;
      const response = await AssetService.create(req.user!, request);
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }

  static async get(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const response = await AssetService.get(req.user!, req.params.asset);
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }

  static async update(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: AssetRequest = req.body as AssetRequest;
      const response = await AssetService.create(req.user!, request);
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
}
