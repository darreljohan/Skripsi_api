import multer, { FileFilterCallback } from "multer";
import { fileController } from "../controller/file.controller";
import path from "path";
import { logger } from "./logger";
import { Request } from "express";

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

const fileStorage = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    cb: DestinationCallback
  ) => {
    const rootDirectory = process.cwd();
    const directory = path.join(rootDirectory, `/file/`);
    cb(null, directory);
  },
  filename: function (
    req: Request,
    file: Express.Multer.File,
    cb: FileNameCallback
  ) {
    cb(null, "file_" + Date.now() + `_` + file.originalname);
  },
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  callback: FileFilterCallback
) => {
  logger.info("file filter entry");
  var ext = path.extname(file.originalname);
  if (ext !== ".png" && ext !== ".jpg" && ext !== ".gif" && ext !== ".jpeg") {
    return callback(new Error("Only images are allowed"));
  }
  logger.info("File filter pass, upload success");
  callback(null, true);
};

export const upload = multer({ storage: fileStorage, fileFilter: fileFilter });
