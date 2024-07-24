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
import supertest from "supertest";
import { web } from "../src/application/web";
import { afterThis } from "jest-after-this";
import { logger } from "../src/application/logger";
import { UserTest } from "./user.gateway.util.test";

describe("POST /api/users", () => {
  afterEach(async () => {
    await UserTest.delete();
  });

  it("should reject new user if request is not valid", async () => {
    const response = await supertest(web)
      .post("/api/users")
      .send({ username: "", password: "", name: "" });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.message).toBeDefined();
  });

  it("should accept register request response & delete Response", async () => {
    const response = await supertest(web).post("/api/users").send({
      username: "test",
      password: "test",
      name: "Tester",
    });
    logger.info(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.username).toBe("test");
  });
});

describe("GET /api/users/current", () => {
  beforeAll(async () => {
    await UserTest.create();
  });

  afterAll(async () => {
    await UserTest.delete();
  });

  it("should return current login user", async () => {
    const response = await supertest(web)
      .get("/api/users/current")
      .set("X-API-TOKEN", "test");

    logger.debug(response);
    expect(response.status).toBe(200);
    expect(response.body.data.username).toBe("test");
  });

  it("should reject request because invalid token", async () => {
    const response = await supertest(web)
      .get("/api/users/current")
      .set("X-API-TOKEN", "wrong_token");

    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.body.error).toBeDefined();
  });
});
