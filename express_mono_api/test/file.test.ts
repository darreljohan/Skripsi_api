import { describe } from "@jest/globals";
import supertest from "supertest";
import { web } from "../src/application/web";
import { afterThis } from "jest-after-this";
import { assetTest } from "./asset.test.util";
import { UserTest } from "./user.test.util";
import { logger } from "../src/application/logger";
import path from "path";
import * as fs from "fs";
import { fileUploadResponse } from "../src/model/file.model";
import exp from "constants";
import { FileTest } from "./file.test.util";
const rootDirectory = process.cwd();
const testPictureDirectory = path.join(
  rootDirectory,
  "test/file.mock.picture.jpg"
);
const testNonPictureDirectory = path.join(
  rootDirectory,
  "test/file.mock.document.pdf"
);

const testPictureBuffer = fs.readFileSync(testPictureDirectory);

describe("POST /api/file", () => {
  beforeAll(async () => {
    await UserTest.create();
    await assetTest.createSingleMock();
  });

  afterAll(async () => {
    await UserTest.delete();
    await assetTest.deleteSingleMock();
  });

  it("should return error because file is not an image", async () => {
    const response = await supertest(web)
      .post("/api/file/")
      .set("X-API-TOKEN", "test")
      .attach("file", testNonPictureDirectory)
      .field("id", 10000);

    expect(response.status).toBe(500);
    expect(response.body.error).toBeDefined();
  });
  it("should return created asset", async () => {
    const response = await supertest(web)
      .post("/api/file/")
      .set("X-API-TOKEN", "test")
      .attach("file", testPictureDirectory)
      .field("id", 10000);

    logger.debug(response.body);
    const responsePictureBuffer = fs.readFileSync(
      path.join(rootDirectory, "file/" + response.body.data.pictures[0].url)
    );
    expect(response.status).toBe(200);
    expect(response.body.data.id).toBe(10000);
    expect(testPictureBuffer).toEqual(responsePictureBuffer);

    afterThis(async () => {
      await assetTest.deleteSingleMock();
      await FileTest.deleteFileByName(response.body.data.pictures[0].url);
      await assetTest.emptyPictureTable();
      await assetTest.createSingleMock();
    });
  });

  it("should return error because id not found", async () => {
    const response = await supertest(web)
      .post("/api/file/")
      .set("X-API-TOKEN", "test")
      .attach("file", testPictureDirectory)
      .field("id", 1000);

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
  });

  it("should return created asset", async () => {
    const response = await supertest(web)
      .post("/api/file/")
      .set("X-API-TOKEN", "test")
      .attach("file", testPictureDirectory)
      .field("id", 10000);

    logger.debug(response.body);
    const responsePictureBuffer = fs.readFileSync(
      path.join(rootDirectory, "file/" + response.body.data.pictures[0].url)
    );
    expect(response.status).toBe(200);
    expect(response.body.data.id).toBe(10000);
    expect(testPictureBuffer).toEqual(responsePictureBuffer);

    afterThis(async () => {
      await assetTest.deleteSingleMock();
      await FileTest.deleteFileByName(response.body.data.pictures[0].url);
      await assetTest.emptyPictureTable();
      await assetTest.createSingleMock();
    });
  });

  it("should return error because file is not an image", async () => {
    const response = await supertest(web)
      .post("/api/file/")
      .set("X-API-TOKEN", "test")
      .attach("file", testNonPictureDirectory)
      .field("id", 10000);

    expect(response.status).toBe(500);
    expect(response.body.error).toBeDefined();
  });

  it("should return error because invalid auth", async () => {
    logger.info("File NonPic Directory :" + testNonPictureDirectory);
    const response = await supertest(web)
      .post("/api/file/")
      .set("X-API-TOKEN", "wrongtoken")
      .attach("file", testPictureDirectory)
      .field("id", 10000);

    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.body.error).toBeDefined();
  });

  it("should return error because invalid id", async () => {
    const response = await supertest(web)
      .post("/api/file/")
      .set("X-API-TOKEN", "test")
      .attach("file", testPictureDirectory)
      .field("id", "invalid id");

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
  });
});

describe("GET /api/file/:filename", () => {
  let mockPicture: fileUploadResponse;
  beforeAll(async () => {
    await UserTest.create();
    mockPicture = await FileTest.createSingleMock();
  });

  afterAll(async () => {
    await UserTest.delete();
    await FileTest.deleteSingleMock(mockPicture.pictures);
  });

  it("Should return picture equals the test picture's buffer", async () => {
    const response = await supertest(web)
      .get("/api/file/" + mockPicture.pictures[0].url)
      .set("X-API-TOKEN", "test");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(testPictureBuffer);
  });

  it("Should return error because invalid url", async () => {
    const response = await supertest(web)
      .get("/api/file/" + "invalid url")
      .set("X-API-TOKEN", "test");

    expect(response.status).toBe(500);
    expect(response.body.error).toBeDefined();
  });
});

describe("DELETE /api/file/", () => {
  let mockPicture: fileUploadResponse;
  beforeAll(async () => {
    await UserTest.create();
    mockPicture = await FileTest.createSingleMock();
  });

  afterAll(async () => {
    await UserTest.delete();
    await FileTest.deleteSingleMock(mockPicture.pictures);
  });

  it("should delete picture based on id", async () => {
    const response = await supertest(web)
      .delete("/api/file")
      .set("X-API-TOKEN", "test")
      .send({
        id: 10000,
        picture: {
          id: mockPicture.pictures[0].id,
          url: mockPicture.pictures[0].url,
        },
      });

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data).toBeDefined();
  });

  it("should invalid request because invalid id", async () => {
    const response = await supertest(web)
      .delete("/api/file")
      .set("X-API-TOKEN", "test")
      .send({
        id: 9999,
        picture: {
          id: mockPicture.pictures[mockPicture.pictures.length - 1].id,
          url: mockPicture.pictures[mockPicture.pictures.length - 1].url,
        },
      });

    logger.debug(response.body);
    expect(response.status).toBe(500);
    expect(response.body.error).toBeDefined();
  });
});
