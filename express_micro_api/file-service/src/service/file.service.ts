import { Prisma } from "@prisma/client";
import {
  fileDeleteRequest,
  fileUploadRequest,
  fileUploadResponse,
  fileUploadServicerResponse,
} from "../model/file.model";
import { UserRequest } from "../model/user.model";
import path from "path";
import { logger } from "../application/logger";
import { stringToNumberChanger } from "../utility/numberChecker";
import * as fs from "fs";
import { User } from "../model/user.model";
import { producerClient } from "../application/producer";
import axios from "axios";
import {
  AddAssetPictureResponse,
  DeleteAssetPictureResponse,
} from "../model/asset.model";
export class fileService {
  static async upload(
    user: User,
    metadata: Express.Multer.File | undefined,
    req: fileUploadRequest
  ): Promise<AddAssetPictureResponse> {
    //Check id is available on database
    const checkedID = stringToNumberChanger(req.id);

    logger.info("Passe check id");
    const gatewayUrl = process.env.GATEWAY_URL + "/api/assets/photo";
    const result = await axios.post<any>(
      gatewayUrl,
      {
        asset: {
          id: req.id,
        },
        picture: {
          url: metadata!.filename,
        },
      },
      {
        headers: {
          "X-API-TOKEN": user.token,
        },
      }
    );

    logger.info("Passe axios ");
    logger.info(result.data);

    return {
      id: result.data.data.asset.id,
      pictures: result.data.data.pictures,
    };

    /* contact message broker
    const directory = metadata!.filename;
    await producerClient({
      id: checkedID,
      url: directory,
    });
    */

    //revised return type
    //return { id: result.id, pictures: result.pictures };

    //return { id: checkedID, pictures: directory };
  }

  //send picture to preview route
  static async get(user: User, params: String) {
    const rootDirectory = process.cwd();
    const responseDirectory = path.join(rootDirectory, `/file/` + params);
    return responseDirectory;
  }

  static async delete(
    user: User,
    request: fileDeleteRequest
  ): Promise<DeleteAssetPictureResponse> {
    //Transaction for disconnect and delete relation between asset and picture
    /* Moved into asset service
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
    */

    const gatewayUrl = process.env.GATEWAY_URL + "/api/assets/photo";
    const result = await axios.delete<DeleteAssetPictureResponse>(gatewayUrl, {
      headers: {
        "X-API-TOKEN": user.token,
      },
      data: {
        asset: {
          id: request.id,
        },
        picture: {
          id: request.picture.id,
        },
      },
    });
    logger.info("finish sending delete command to asset service");
    //delete file in directory
    const rootDirectory = process.cwd();
    const responseDirectory = path.join(
      rootDirectory,
      `/file/` + request.picture.url
    );
    fs.rm(responseDirectory, { force: true }, (e) => {});

    return { id: result.data.id, pictures: result.data.pictures };
  }
}
