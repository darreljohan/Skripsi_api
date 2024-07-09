import { NextFunction, Request, Response } from "express";
import { UserRequest } from "../model/user.model";
import { CreateAssetRequest } from "../model/asset.format.model";
import { searchNewsRequest, uploadNewsRequest } from "../model/news.model";
import { NewsService } from "../service/news.service";
import { logger } from "../application/logger";

export class NewsController {
  static async create(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: uploadNewsRequest = req.body as uploadNewsRequest;
      const response = await NewsService.upload(req.user!, request);
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }

  static async search(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: searchNewsRequest = req.body as searchNewsRequest;
      const response = await NewsService.search(req.user!, request);
      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  }

  static async delete(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const response = await NewsService.delete(req.user!, req.params.id);
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
}
