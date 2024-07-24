import express from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { AssetFormatController } from "../controller/asset.format.controller";

export const apiRouter = express.Router();

apiRouter.use(authMiddleware);

apiRouter.post("/api/assets/format", AssetFormatController.create);
apiRouter.get("/api/assets/format/:asset", AssetFormatController.get);
apiRouter.patch("/api/assets/format", AssetFormatController.update);
apiRouter.delete("/api/assets/format/:asset", AssetFormatController.delete);
apiRouter.get("/api/search", AssetFormatController.search);

apiRouter.post("/api/assets/photo", AssetFormatController.addPicture);
apiRouter.delete("/api/assets/photo", AssetFormatController.deletePicture);
