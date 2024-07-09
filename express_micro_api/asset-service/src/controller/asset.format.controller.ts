import { NextFunction, Request, Response } from "express";
import { UserRequest } from "../model/user.model";
import {
  CreateAssetRequest,
  searchAssetRequest,
} from "../model/asset.format.model";
import { AssetFormattedService } from "../service/asset.format.service";

export class AssetFormatController {
  static async create(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: CreateAssetRequest = req.body as CreateAssetRequest;
      const response = await AssetFormattedService.create(req.user!, request);
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }

  static async get(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const response = await AssetFormattedService.get(
        req.user!,
        req.params.asset
      );
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }

  static async update(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: CreateAssetRequest = req.body as CreateAssetRequest;
      const response = await AssetFormattedService.update(req.user!, request);
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }

  static async delete(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const response = await AssetFormattedService.remove(
        req.user!,
        req.params.asset
      );
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }

  static async search(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: searchAssetRequest = req.body as searchAssetRequest;
      const response = await AssetFormattedService.search(req.user!, request);
      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  }
}
