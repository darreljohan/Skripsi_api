import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
export const publicRouter = express.Router();

publicRouter.post(
  "/api/users",
  createProxyMiddleware({
    target: "http://localhost:3001",
    changeOrigin: true,
  })
);

publicRouter.post(
  "/api/users/login",
  createProxyMiddleware({
    target: "http://localhost:3001",
    changeOrigin: true,
  })
);
