import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { publicRouter } from "../route/public.api";
import { apiRouter } from "../route/api";
dotenv.config();

const port = process.env.GATEWAY_PORT;
export const web: Express = express();

web.use(cors());
web.use(publicRouter);
web.use(apiRouter);

web.listen(port, function () {
  console.log("Example app listening on port " + port + "!");
});
