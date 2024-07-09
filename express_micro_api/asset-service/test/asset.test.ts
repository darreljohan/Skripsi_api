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
import { UserTest } from "./user.test.util";
import { assetTest } from "./asset.test.util";
import { afterThis } from "jest-after-this";
import { userInfo } from "os";
import { date } from "zod";

describe("POST /api/assets/format", () => {
  beforeAll(async () => {
    await assetTest.createSingleMock();
  });

  afterAll(async () => {
    await assetTest.deleteSingleMock();
  });
  it("should return asset", async () => {
    const response = await supertest(web)
      .post("/api/assets/format")
      .send({ asset: { name: "test_asset" } })
      .set("user", "ssn");

    logger.debug(response);
    expect(response.status).toBe(200);
    expect(response.body.data.asset.name).toBe("test_asset");

    afterThis(() => {
      assetTest.deleteDataById(response.body.data.asset.id);
    });
  });

  it("should return created asset with mapped categories", async () => {
    const response = await supertest(web)
      .post("/api/assets/format")
      .send({
        asset: {
          name: "test_asset",
        },
        categories: [
          { id: 10000, name: "test_category", description: "test_desc" },
        ],
      })
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.asset.name).toBe("test_asset");
    expect(response.body.data.categories).toEqual([
      {
        id: 10000,
        name: "test_category",
        description: "test_desc",
      },
    ]);
    afterThis(() => {
      assetTest.deleteDataById(response.body.data.asset.id);
    });
  });

  it("should not accept because invalid category id", async () => {
    const response = await supertest(web)
      .post("/api/assets/format")
      .send({
        asset: {
          name: "test_asset",
        },
        categories: [
          { id: 9000, name: "test_category", description: "test_desc" },
        ],
      })
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(500);
    expect(response.error).toBeDefined();
  });

  it("should not accept because asset name are invalid", async () => {
    const response = await supertest(web)
      .post("/api/assets/format")
      .send({
        asset: {},
        categories: [
          { id: 9000, name: "test_category", description: "test_desc" },
        ],
      })
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.error).toBeDefined();
  });

  it("should not accept because token are invalid", async () => {
    const response = await supertest(web)
      .post("/api/assets/format")
      .send({
        asset: { name: "test_asset" },
        categories: [
          { id: 9000, name: "test_category", description: "test_desc" },
        ],
      })
      .set("X-API-TOKEN", "wrong token");

    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.error).toBeDefined();
  });
});

describe("GET /api/assets/format", () => {
  beforeAll(async () => {
    await UserTest.create();
    await assetTest.createSingleMock();
  });

  afterAll(async () => {
    await UserTest.delete();
    await assetTest.deleteSingleMock();
  });

  it("should return test asset", async () => {
    const response = await supertest(web)
      .get("/api/assets/format/10000")
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.asset.name).toBe("test_asset");
    expect(response.body.data.categories[0].name).toBe("test_category");
  });

  it("should return error because id not found", async () => {
    const response = await supertest(web)
      .get("/api/assets/format/9797979")
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(500);
    expect(response.error).toBeDefined();
  });

  it("should return error because id is NaN", async () => {
    const response = await supertest(web)
      .get("/api/assets/format/wrongID")
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(500);
    expect(response.error).toBeDefined();
  });
});

describe("PATCH /api/assets/format", () => {
  beforeAll(async () => {
    await UserTest.create();
  });

  afterAll(async () => {
    await UserTest.delete();
  });

  beforeEach(async () => {
    await assetTest.createSingleMock();
  });

  afterEach(async () => {
    await assetTest.deleteSingleMock();
  });

  it("should patch test asset, no category included", async () => {
    const response = await supertest(web)
      .patch("/api/assets/format")
      .set("X-API-TOKEN", "test")
      .send({
        asset: {
          id: 10000,
          name: "test_asset_patched",
        },
      });

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.asset.name).toBe("test_asset_patched");
  });

  it("should patch test asset with category", async () => {
    const response = await supertest(web)
      .patch("/api/assets/format")
      .set("X-API-TOKEN", "test")
      .send({
        asset: {
          id: 10000,
          name: "test_asset_patched",
        },
        categories: [],
      });

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.asset.name).toBe("test_asset_patched");
    expect(response.body.data.categories).toStrictEqual([]);
  });

  it("should reject because invalid category id", async () => {
    const response = await supertest(web)
      .patch("/api/assets/format")
      .set("X-API-TOKEN", "test")
      .send({
        asset: {
          id: 10000,
          name: "test_asset_patched",
        },
        categories: [{ id: 10000 }, { id: 373737 }],
      });

    logger.debug(response.body);
    expect(response.status).toBe(500);
    expect(response.error).toBeDefined();
  });

  it("should reject because invalid categories data", async () => {
    const response = await supertest(web)
      .patch("/api/assets/format")
      .set("X-API-TOKEN", "test")
      .send({
        asset: {
          id: 10000,
          name: "test_asset_patched",
        },
        categories: "invalid data",
      });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.error).toBeDefined();
  });
});

describe("DELETE /api/assets/format", () => {
  beforeAll(async () => {
    await UserTest.create();
  });

  afterAll(async () => {
    await UserTest.delete();
  });

  beforeEach(async () => {
    await assetTest.createSingleMock();
  });

  afterEach(async () => {
    await assetTest.deleteSingleMock();
  });

  it("should delete asset based on parameter", async () => {
    const response = await supertest(web)
      .delete("/api/assets/format/10000")
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.asset.id).toBe(10000);
  });

  it("should reject delete asset because invalid id", async () => {
    const response = await supertest(web)
      .delete("/api/assets/format/invalidID")
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(500);
    expect(response.error).toBeDefined();
  });

  it("should reject delete asset because id not found", async () => {
    const response = await supertest(web)
      .delete("/api/assets/format/373737")
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(500);
    expect(response.error).toBeDefined();
  });
});

describe("SEARCH /api/assets/format", () => {
  beforeAll(async () => {
    await UserTest.create();
    await assetTest.createMassMock();
  });

  afterAll(async () => {
    await UserTest.delete();
    await assetTest.deleteMassMock();
  });

  it("Should return asset price more than 3000", async () => {
    const response = await supertest(web)
      .get("/api/search")
      .set("X-API-TOKEN", "test")
      .send({ price_owned_lower: 3000, page: 1, size: 10 });

    logger.info(response.body);
    expect(response.status).toBe(200);

    response.body.data.forEach((record) => {
      expect(record.asset.price_owned).toBeGreaterThanOrEqual(3000);
    });
  });

  it("Should return asset price less than 4000", async () => {
    const response = await supertest(web)
      .get("/api/search")
      .set("X-API-TOKEN", "test")
      .send({ price_owned_upper: 4000, page: 1, size: 10 });

    logger.info(response.body);
    expect(response.status).toBe(200);

    response.body.data.forEach((record) => {
      expect(record.asset.price_owned).toBeLessThanOrEqual(4000);
    });
  });

  it("Should return asset date owned older than 2020", async () => {
    const dateLimit = new Date(2020, 1, 1);
    const response = await supertest(web)
      .get("/api/search")
      .set("X-API-TOKEN", "test")
      .send({ date_owned_upper: dateLimit, page: 1, size: 10 });

    logger.info(response.body);
    expect(response.status).toBe(200);

    response.body.data.forEach((record) => {
      const recordDate = new Date(record.asset.date_owned);
      expect(recordDate.getTime()).toBeLessThanOrEqual(dateLimit.getTime());
    });
  });

  it("Should return asset date owned newer than 2020", async () => {
    const dateLimit = new Date(2020, 1, 1);
    const response = await supertest(web)
      .get("/api/search")
      .set("X-API-TOKEN", "test")
      .send({ date_owned_lower: dateLimit, page: 1, size: 10 });

    logger.info(response.body);
    expect(response.status).toBe(200);
    response.body.data.forEach((record) => {
      const recordDate = new Date(record.asset.date_owned);
      expect(recordDate.getTime()).toBeGreaterThanOrEqual(dateLimit.getTime());
    });
  });

  it("Should return asset with 1000001 category id", async () => {
    const response = await supertest(web)
      .get("/api/search")
      .set("X-API-TOKEN", "test")
      .send({ categories: [100001], page: 1, size: 10 });

    logger.info(response.body);
    expect(response.status).toBe(200);
    response.body.data.forEach((record) => {
      expect(record.categories).toContainEqual(
        expect.objectContaining({ id: 100001 })
      );
    });
  });

  it("Should not return asset because invalid categories", async () => {
    const response = await supertest(web)
      .get("/api/search")
      .set("X-API-TOKEN", "test")
      .send({ categories: ["invalidInput"], page: 1, size: 10 });

    logger.info(response.body);
    expect(response.status).toBe(400);
  });

  it("Should not return asset because invalid date", async () => {
    const response = await supertest(web)
      .get("/api/search")
      .set("X-API-TOKEN", "test")
      .send({ date_owned_lower: "invalidDate", page: 1, size: 10 });

    logger.info(response.body);
    expect(response.status).toBe(400);
  });

  it("Should not return asset because invalid price", async () => {
    const response = await supertest(web)
      .get("/api/search")
      .set("X-API-TOKEN", "test")
      .send({ price_owned_lower: "invalidPrice", page: 1, size: 10 });

    logger.info(response.body);
    expect(response.status).toBe(400);
  });
});
