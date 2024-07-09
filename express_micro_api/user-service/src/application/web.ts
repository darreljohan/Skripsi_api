import express from "express";
import { publicRouter } from "../router/public.api";
import { errorMiddleware } from "../middleware/error.middleware";
import { apiRouter } from "../router/api";

export const web = express();
web.use(express.json());

web.use(publicRouter);
web.use(apiRouter);

web.use(errorMiddleware);

let port = process.env.USER_PORT;

web.listen(port, function () {
  console.log("Example app listening on port " + port + "!");
});
