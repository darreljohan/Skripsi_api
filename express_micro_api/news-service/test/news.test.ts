import {
  describe,
  expect,
  test,
  it,
  afterEach,
  beforeAll,
  afterAll,
  beforeEach,
} from "@jest/globals";
import { logger } from "../src/application/logger";
import supertest from "supertest";
import { web } from "../src/application/web";
import { afterThis } from "jest-after-this";
import { prismaClient } from "../src/application/database";
import { newsTest } from "./news.test.util";
import { News } from "@prisma/client";
//News in development bypass auth by changing middleware method to provide user token
//Invalid token test wont passed test because auth middleware provide user token
describe("POST /api/news", () => {
  beforeAll(async () => {});

  afterAll(async () => {});

  it("should return created news", async () => {
    const response = await supertest(web)
      .post("/api/news")
      .send({ title: "testnews" })
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.news.title).toBe("testnews");

    afterThis(() => {
      prismaClient.news.deleteMany({ where: { title: "testnews" } });
    });
  });

  it("should return created news with complete data", async () => {
    const response = await supertest(web)
      .post("/api/news")
      .send({
        title: "testnews",
        description: "This is test Desc",
        document_link: "empty",
      })
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.news.title).toBe("testnews");

    afterThis(() => {
      prismaClient.news.deleteMany({ where: { title: "testnews" } });
    });
  });

  it("should return error because empty data is sended", async () => {
    const response = await supertest(web)
      .post("/api/news")
      .send({})
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();

    afterThis(() => {
      prismaClient.news.deleteMany({ where: { title: "testnews" } });
    });
  });

  it("should return error because invalid auth token", async () => {
    const response = await supertest(web)
      .post("/api/news")
      .send({ title: "testnews" })
      .set("X-API-TOKEN", "invalidtest");

    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.body.error).toBeDefined();

    afterThis(async () => {
      await prismaClient.news.deleteMany({ where: { title: "testnews" } });
    });
  });
});

describe("GET /api/news/search", () => {
  beforeAll(async () => {
    await newsTest.createMassMock();
  });

  afterAll(async () => {
    await newsTest.deleteMassMock();
  });

  it("should return news older than 2021", async () => {
    const dateLimit = new Date(2021, 1, 1);
    const response = await supertest(web)
      .get("/api/news/search")
      .set("X-API-TOKEN", "test")
      .send({ upload_date_upper: dateLimit });

    logger.info(response.body);
    expect(response.status).toBe(200);

    response.body.data.forEach((record) => {
      const recordDate = new Date(record.news.uploadDate);
      expect(recordDate.getTime()).toBeLessThanOrEqual(dateLimit.getTime());
    });
  });

  it("should return news newer than 2021", async () => {
    const dateLimit = new Date(2021, 1, 1);
    const response = await supertest(web)
      .get("/api/news/search")
      .set("X-API-TOKEN", "test")
      .send({ upload_date_lower: dateLimit });

    logger.info(response.body);
    expect(response.status).toBe(200);

    response.body.data.forEach((record) => {
      const recordDate = new Date(record.news.uploadDate);
      expect(recordDate.getTime()).toBeGreaterThanOrEqual(dateLimit.getTime());
    });
  });

  it("should return news with title contains 604", async () => {
    const titleLimit = "604";
    const response = await supertest(web)
      .get("/api/news/search")
      .set("X-API-TOKEN", "test")
      .send({ title: titleLimit });

    logger.info(response.body);
    expect(response.status).toBe(200);

    response.body.data.forEach((record) => {
      expect(record.news.title).toContain(titleLimit);
    });
  });

  it("should return all because no filter provided", async () => {
    const response = await supertest(web)
      .get("/api/news/search")
      .set("X-API-TOKEN", "test");

    logger.info(response.body);
    expect(response.status).toBe(200);
  });

  it("should return error because no filter provided", async () => {
    const response = await supertest(web)
      .get("/api/news/search")
      .set("X-API-TOKEN", "test")
      .send({ title: "" });

    logger.info(response.body);
    expect(response.status).toBe(400);
    expect(response.error).toBeDefined();
  });
});

describe("DELETE /api/news/:id", () => {
  let singleMockData: News;
  beforeAll(async () => {
    singleMockData = await newsTest.createSingleMock();
  });

  afterAll(async () => {
    await newsTest.deleteSingleMock(singleMockData.id);
  });
  it("should return deleted news", async () => {
    const response = await supertest(web)
      .delete("/api/news/" + singleMockData.id)
      .set("X-API-TOKEN", "test");

    logger.info(response.body);
    expect(response.body.data.news.id).toBe(singleMockData.id);
    expect(response.status).toBe(200);
  });

  it("should return error because no id given", async () => {
    const response = await supertest(web)
      .delete("/api/news/")
      .set("X-API-TOKEN", "test");

    logger.info(response.error);
    expect(response.error).toBeDefined();
    expect(response.status).toBe(404);
  });

  it("should return error because id given is invalid", async () => {
    const response = await supertest(web)
      .delete("/api/news/invalidID")
      .set("X-API-TOKEN", "test");

    logger.info(response.error);
    expect(response.error).toBeDefined();
    expect(response.status).toBe(500);
  });
});
