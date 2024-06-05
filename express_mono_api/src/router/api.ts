import express from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { UserController } from "../controller/user.controller";
import { AssetController } from "../controller/asset.controller";
import { AssetFormatController } from "../controller/asset.format.controller";
import { upload } from "../application/multer";
import { fileController } from "../controller/file.controller";

export const apiRouter = express.Router();

apiRouter.use(authMiddleware);

apiRouter.get("/api/users/current", UserController.get);
apiRouter.patch("/api/users/current", UserController.update);
apiRouter.delete("/api/users/current", UserController.logout);

apiRouter.post("/api/assets/format", AssetFormatController.create);
apiRouter.get("/api/assets/format/:asset", AssetFormatController.get);
apiRouter.patch("/api/assets/format", AssetFormatController.update);
apiRouter.delete("/api/assets/format/:asset", AssetFormatController.delete);
apiRouter.get("/api/search", AssetFormatController.search);

apiRouter.post("/api/file", upload.single("file"), fileController.upload);
apiRouter.get("/api/file/:filename", fileController.get);
apiRouter.delete("/api/file", fileController.delete);
