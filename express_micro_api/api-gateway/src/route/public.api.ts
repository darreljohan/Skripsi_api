import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
export const publicRouter = express.Router();

const USER_SERVICE_URL = "http://localhost:3001";

publicRouter.post(
  "/api/users",
  createProxyMiddleware({
    target: USER_SERVICE_URL,
    changeOrigin: true,
  })
);

publicRouter.post(
  "/api/users/login",
  createProxyMiddleware({
    target: USER_SERVICE_URL,
    changeOrigin: true,
  })
);
