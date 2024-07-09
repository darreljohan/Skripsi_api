import express from "express";
import { errorMiddleware } from "../middleware/error.middleware";
import { apiRouter } from "../router/api";

export const web = express();
web.use(express.json());

web.use(apiRouter);
web.use(errorMiddleware);

let port = process.env.ASSET_PORT;

web.listen(port, function () {
  console.log("Asset Service listening to the port " + port + "!");
});
