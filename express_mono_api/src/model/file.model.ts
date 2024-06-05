import { Multer } from "multer";
import { Request } from "express";
import { AssetPicture } from "@prisma/client";

export type fileUploadRequest = {
  id: string; //Asset ID to be pushed with picture
};

export type fileUploadResponse = {
  id: number;
  pictures: AssetPicture[];
};

export type filePreviewRequest = {
  url: string;
};

export type fileDeleteRequest = {
  id: number;
  picture: AssetPicture;
};
