import supertest from "supertest";
import { assetClient as prismaClient } from "./database/database";
import { fileUploadResponse } from "./file_model/file.model";
import { web } from "../src/application/web";
import path from "path";
import { logger } from "../src/application/logger";
import { AssetPicture } from "@prisma-asset-database/client";
import * as fs from "fs";

const rootDirectory = process.cwd();
const testPictureDirectory = path.join(
  rootDirectory,
  "test/file.gateway.mock.picture.jpg"
);
const testNonPictureDirectory = path.join(
  rootDirectory,
  "test/file.gateway.mock.document.pdf"
);

export class FileTest {
  static async createSingleMock(): Promise<fileUploadResponse> {
    await prismaClient.asset.create({
      data: {
        id: 10000,
        name: "test_asset",
      },
    });

    const uploadPicture = await supertest(web)
      .post("/api/file/")
      .set("X-API-TOKEN", "test")
      .attach("file", testPictureDirectory)
      .field("id", 10000);

    return uploadPicture.body.data;
  }

  static async deleteSingleMock(picturesBatch: AssetPicture[]) {
    await prismaClient.asset.deleteMany({
      where: {
        id: 10000,
      },
    });
    picturesBatch.forEach(async (picture) => {
      await prismaClient.assetPicture.deleteMany({ where: { id: picture.id } });
    });
  }

  static async deleteFileByName(filename: string) {
    const deletePictureDirectory = path.join(process.cwd(), "file/" + filename);
    fs.rm(deletePictureDirectory, { force: true }, (e) => {});
  }
}
