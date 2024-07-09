import express from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { NewsController } from "../controller/news.controller";

export const apiRouter = express.Router();

apiRouter.use(authMiddleware);

apiRouter.post("/api/news", NewsController.create);
apiRouter.get("/api/news/search", NewsController.search);
apiRouter.delete("/api/news/:id", NewsController.delete);
