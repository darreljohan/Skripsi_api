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
import { logger } from "../src/application/logger";
import { UserTest } from "./user.test.util";
import { after } from "node:test";

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

  it("should accept register request response", async () => {
    const response = await supertest(web).post("/api/users").send({
      username: "test",
      password: "test",
      name: "Tester",
    });

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.username).toBe("test");
  });
});

describe("POST /api/users/login", () => {
  beforeAll(async () => {
    await UserTest.create();
  });

  afterAll(async () => {
    await UserTest.delete();
  });

  it("should be able to login", async () => {
    const response = await supertest(web)
      .post("/api/users/login")
      .send({ username: "test", password: "test" });

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.username).toBe("test");
    expect(response.body.data.name).toBe("Tester");
    expect(response.body.data.token).toBeDefined();
  });

  it("should reject login because username is wrong", async () => {
    const response = await supertest(web)
      .post("/api/users/login")
      .send({ username: "tester", password: "test" });

    logger.debug(response.body);
    expect(response.status).toBe(401);
  });

  it("should reject login because password is wrong", async () => {
    const response = await supertest(web)
      .post("/api/users/login")
      .send({ username: "test", password: "tester" });

    logger.debug(response.body);
    expect(response.status).toBe(401);
  });
});

describe("GET /api/users/current", () => {
  beforeAll(async () => {
    await UserTest.create();
  });

  afterAll(async () => {
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

  it("should return current login user", async () => {
    const response = await supertest(web)
      .get("/api/users/current")
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);
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

describe("PATCH /api/users/current", () => {
  beforeEach(async () => {
    await UserTest.create();
  });

  afterEach(async () => {
    await UserTest.delete();
  });

  it("should reject update if request invalid", async () => {
    const response = await supertest(web)
      .patch("/api/users/current")
      .set("X-API-TOKEN", "test")
      .send({
        username: "",
        password: "",
      });

    logger.debug(response.body);
    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
  });

  it("should reject update if user token invalid", async () => {
    const response = await supertest(web)
      .patch("/api/users/current")
      .set("X-API-TOKEN", "invalid token")
      .send({
        username: "",
        password: "",
      });

    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.body.error).toBeDefined();
  });

  it("should accept update if request valid", async () => {
    const response = await supertest(web)
      .patch("/api/users/current")
      .set("X-API-TOKEN", "test")
      .send({
        name: "correct",
      });

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.name).toBe("correct");
  });
});

describe("DELETE /api/users/current", () => {
  beforeEach(async () => {
    await UserTest.create();
  });

  afterEach(async () => {
    await UserTest.delete();
  });

  it("should reject log out because invalid token", async () => {
    const response = await supertest(web)
      .delete("/api/users/current")
      .set("X-API-TOKEN", "wrong");

    logger.debug(response.body);
    expect(response.status).toBe(401);
    expect(response.body.error).toBeDefined();
  });

  it("should accept log out", async () => {
    const response = await supertest(web)
      .delete("/api/users/current")
      .set("X-API-TOKEN", "test");

    logger.debug(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data).toBe("ok");

    const user = await UserTest.get();
    expect(user.token).toBeNull();
  });
});

describe("GET /api/user/auth", () => {
  beforeAll(async () => {
    await UserTest.create();
  });

  afterAll(async () => {
    await UserTest.delete();
  });

  it("should return user data", async () => {
    const response = await supertest(web)
      .get("/api/users/auth")
      .send({ token: "test" });

    logger.info(response.text);
    expect(response.status).toBe(200);
    expect(response.body.user.name).toEqual("Tester");
  });

  it("should return unauthorized access because wrong token", async () => {
    const response = await supertest(web)
      .get("/api/users/auth")
      .send({ token: "wrongtoken" });

    logger.info(response);
    expect(response.status).toBe(401);
    expect(response.error).toBeDefined();
  });

  it("should return zod error because token is not provided", async () => {
    const response = await supertest(web)
      .get("/api/users/auth")
      .send({ token: null });

    logger.info(response);
    expect(response.status).toBe(400);
    expect(response.error).toBeDefined();
  });
});
