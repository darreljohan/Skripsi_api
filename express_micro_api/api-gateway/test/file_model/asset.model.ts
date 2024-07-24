export type AssetPicture = {
  id: number;
  url: string;
};

export type AddAssetPictureResponse = {
  id: number;
  pictures: AssetPicture[];
};

export type DeleteAssetPictureResponse = {
  id: number;
  pictures: AssetPicture[];
};
