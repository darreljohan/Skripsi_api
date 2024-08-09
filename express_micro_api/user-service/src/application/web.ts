import express from "express";
import { publicRouter } from "../router/public.api";
import { errorMiddleware } from "../middleware/error.middleware";
import { apiRouter } from "../router/api";
import { logMiddleware } from "../middleware/log.middleware";

export const web = express();
web.use(express.json());

web.use(logMiddleware);

web.use(publicRouter);
web.use(apiRouter);

web.use(errorMiddleware);

let port = process.env.USER_PORT;

web.listen(port, function () {
  console.log("User service listening on port " + port + "!");
});
