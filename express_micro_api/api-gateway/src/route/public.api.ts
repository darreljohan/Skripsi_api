import express, { NextFunction, Request, Response } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import { logger } from "../application/logger";

export const publicRouter = express.Router();

const USER_SERVICE_URL = "http://host.docker.internal:3001";

publicRouter.post(
  "/api/users",
  createProxyMiddleware({
    target: USER_SERVICE_URL,
    changeOrigin: true,
    on: {
      proxyReq: (proxyReq, req: Request, res) => {
        logger.info("Api Gateway | Api Route | Proxy Routing to " + req.url);
      },
      error: (err, req, res) => {
        logger.error("Api Gateway | Api Route | Proxy error: " + err.message);
      },
    },
  })
);

publicRouter.post(
  "/api/users/login",
  createProxyMiddleware({
    target: USER_SERVICE_URL,
    changeOrigin: true,
    on: {
      proxyReq: (proxyReq, req: Request, res) => {
        logger.info("Api Gateway | Api Route | Proxy Routing to " + req.url);
      },
      error: (err, req, res) => {
        logger.error("Api Gateway | Api Route | Proxy error: " + err.message);
      },
    },
  })
);
