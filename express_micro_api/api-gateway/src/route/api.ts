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
        logger.info("Api Gateway | Api Route | Proxy Routing to " + req.url);
        proxyReq.setHeader("user", JSON.stringify(req.user));
      },
      error: (err, req, res) => {
        logger.error("Api Gateway | Api Route | Proxy error: " + err.message);
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
        logger.info("Api Gateway | Api Route | Proxy Routing to " + req.url);
      },
      error: (err, req, res) => {
        logger.error("Api Gateway | Api Route | Proxy error: " + err.message);
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
        proxyReq.setHeader("user", JSON.stringify(req.user));
        logger.info("Api Gateway | Api Route | Proxy Routing to " + req.url);
      },
      error: (err, req, res) => {
        logger.error("Api Gateway | Api Route | Proxy error: " + err.message);
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
        logger.info("Api Gateway | Api Route | Proxy Routing to " + req.url);
      },
      error: (err, req, res) => {
        logger.error("Api Gateway | Api Route | Proxy error: " + err.message);
      },
    },
  })
);
