import { Prisma } from "@prisma/client";
import {
  fileDeleteRequest,
  fileUploadRequest,
  fileUploadResponse,
} from "../model/file.model";
import { UserRequest } from "../model/user.model";
import { prismaClient } from "../application/database";
import path from "path";
import { logger } from "../application/logger";
import { stringToNumberChanger } from "../utility/numberChecker";
import * as fs from "fs";
import { User } from "../model/user.model";

export class fileService {
  static async upload(
    user: User,
    metadata: Express.Multer.File | undefined,
    req: fileUploadRequest
  ): Promise<fileUploadResponse> {
    //Check id is available on database
    const checkedID = stringToNumberChanger(req.id);
    const checker = await prismaClient.asset.findUnique({
      where: { id: checkedID },
      include: { categories: true, pictures: true },
    });

    if (!checker) {
      throw new Error("Asset not found");
    }

    //Query to the database to record the filename
    const directory = metadata!.filename;
    const result = await prismaClient.asset.update({
      where: { id: checkedID },
      data: {
        pictures: {
          create: {
            url: directory,
          },
        },
      },
      include: {
        pictures: true,
      },
    });

    if (!result) {
      throw new Error("Asset not found");
    }
    return { id: result.id, pictures: result.pictures };
  }

  //send picture to preview route
  static async get(user: User, params: String) {
    const rootDirectory = process.cwd();
    const responseDirectory = path.join(rootDirectory, `/file/` + params);
    return responseDirectory;
  }

  static async delete(user: User, request: fileDeleteRequest): Promise<string> {
    //Transaction for disconnect and delete relation between asset and picture
    const [deleteRelation, deleteRecord] = await prismaClient.$transaction([
      prismaClient.asset.update({
        where: { id: request.id },
        data: {
          pictures: {
            disconnect: { id: request.picture.id },
          },
        },
      }),
      prismaClient.assetPicture.delete({
        where: { id: request.picture.id },
      }),
    ]);

    //delete file in directory
    const rootDirectory = process.cwd();
    const responseDirectory = path.join(
      rootDirectory,
      `/file/` + request.picture.url
    );
    fs.rm(responseDirectory, { force: true }, (e) => {});

    return "Success";
  }
}
