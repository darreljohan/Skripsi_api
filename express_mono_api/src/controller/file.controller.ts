import { NextFunction, Request, Response } from "express";
import { UserRequest } from "../model/user.model";
import { fileService } from "../service/file.service";
import { User } from "@prisma/client";
import { logger } from "../application/logger";
import { FileUploadError } from "../error/fileUpload.error";

export class fileController {
  static async upload(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const response = await fileService.upload(req.user!, req.file, req.body);
      res.status(200).send({ data: response });
    } catch (e) {
      if (e instanceof Error) {
        //handling all error in upload to be handled by FileUploadError
        const fileUploadError = new FileUploadError(
          400,
          e.message,
          req.file!.filename
        );
        next(fileUploadError);
      } else {
        next(new Error("Unknown error occurred"));
      }
    }
  }

  static async get(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const response = await fileService.get(req.user!, req.params.filename);
      res.status(200).sendFile(response);
    } catch (e) {
      next(e);
    }
  }

  static async delete(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const response = await fileService.delete(req.user!, req.body);
      res.status(200).send({ data: response });
    } catch (e) {
      next(e);
    }
  }
}
