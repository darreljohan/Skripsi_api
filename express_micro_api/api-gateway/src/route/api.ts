import express from "express";
import { createProxyMiddleware, RequestHandler } from "http-proxy-middleware";
import { authMiddleware } from "../middleware/auth.middleware";
import { UserRequest } from "../model/user.model";
import { logger } from "../application/logger";

export const apiRouter = express.Router();

const USER_SERVICE_URL = process.env.USER_SERVICE_URL;
const ASSET_SERVICE_URL = process.env.ASSET_SERVICE_URL;
const FILE_SERVICE_URL = process.env.FILE_SERVICE_URL;
const NEWS_SERVICE_URL = process.env.NEWS_SERVICE_URL;

apiRouter.use(authMiddleware);

apiRouter.use(
  "/api/users",
  createProxyMiddleware({
    target: USER_SERVICE_URL,
    changeOrigin: true,
    on: {
      proxyReq: (proxyReq, req: UserRequest, res) => {
        proxyReq.setHeader("user", JSON.stringify(req.user));
      },
      error: (err, req, res) => {
        logger.error("Proxy error:", err);
      },
    },
  })
);

apiRouter.use(
  "/api/assets",
  createProxyMiddleware({
    target: ASSET_SERVICE_URL,
    changeOrigin: true,
    timeout: 60000,
    on: {
      proxyReq: (proxyReq, req: UserRequest, res) => {
        proxyReq.setHeader("user", JSON.stringify(req.user));
        logger.info("enter proxy assets");
      },
    },
  })
);

apiRouter.use(
  "/api/file",
  createProxyMiddleware({
    target: FILE_SERVICE_URL,
    changeOrigin: true,
    on: {
      proxyReq: (proxyReq, req: UserRequest, res) => {
        logger.info("Enter Proxy set header success");
        proxyReq.setHeader("user", JSON.stringify(req.user));
        logger.info("Proxy set header success");
      },
    },
  })
);

apiRouter.get(
  "api/news",
  createProxyMiddleware({
    target: NEWS_SERVICE_URL,
    changeOrigin: true,
    on: {
      proxyReq: (proxyReq, req: UserRequest, res) => {
        proxyReq.setHeader("user", JSON.stringify(req.user));
      },
    },
  })
);
