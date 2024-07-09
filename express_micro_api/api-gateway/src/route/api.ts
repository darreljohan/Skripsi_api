import express from "express";
import { createProxyMiddleware, RequestHandler } from "http-proxy-middleware";
import { authMiddleware } from "../middleware/auth.middleware";
import { UserRequest } from "../model/user.model";
import { logger } from "../application/logger";

export const apiRouter = express.Router();

apiRouter.use(authMiddleware);

apiRouter.get(
  "/api/users/current",
  createProxyMiddleware({
    target: "http://localhost:3001",
    changeOrigin: true,
    on: {
      proxyReq: (proxyReq, req: UserRequest, res) => {
        logger.info(`Proxying request to ${req.url}`);
        proxyReq.setHeader("user", JSON.stringify(req.user));
        logger.info(`Request headers:`, proxyReq);
      },
    },
  })
);
