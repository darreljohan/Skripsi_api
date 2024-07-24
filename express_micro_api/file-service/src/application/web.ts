import express from "express";
import { errorMiddleware } from "../middleware/error.middleware";
import { apiRouter } from "../router/api";

export const web = express();
web.use(express.json());
web.use(apiRouter);
web.use(errorMiddleware);

var port = process.env.FILE_PORT;
web.listen(port, function () {
  console.log("Example app listening on port " + port + "!");
});
