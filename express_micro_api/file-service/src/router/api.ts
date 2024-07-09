import express from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { upload } from "../application/multer";
import { fileController } from "../controller/file.controller";

export const apiRouter = express.Router();

apiRouter.use(authMiddleware);

apiRouter.post("/api/file", upload.single("file"), fileController.upload);
apiRouter.get("/api/file/:filename", fileController.get);
apiRouter.delete("/api/file", fileController.delete);
