import { Asset, AssetCategory, AssetPicture, Prisma } from "@prisma/client";

export type CreateAssetRequest = {
  asset: Asset;
  categories: AssetCategory[];
};

export const assetWithCategories = Prisma.validator<Prisma.AssetDefaultArgs>()({
  include: { categories: true },
});
export type AssetWithCategories = Prisma.AssetGetPayload<
  typeof assetWithCategories
>;

export function assetAndCategoriesPrismaResultToAssetResponse(
  result: AssetWithCategories
): CreateAssetResponse {
  return {
    asset: {
      id: result.id,
      name: result.name,
      date_owned: result.date_owned,
      price_owned: result.price_owned,
      location: result.location,
    },
    categories: result.categories,
  };
}

export type CreateAssetResponse = {
  asset: Asset;
  categories: AssetCategory[];
};

export const assetWithCategoriesPictures =
  Prisma.validator<Prisma.AssetDefaultArgs>()({
    include: { categories: true, pictures: true },
  });
export type AssetWithCategoriesPictures = Prisma.AssetGetPayload<
  typeof assetWithCategoriesPictures
>;

export function assetAndCategoriesPicturesPrismaResultToAssetResponse(
  result: AssetWithCategoriesPictures
): GetAssetResponse {
  return {
    asset: {
      id: result.id,
      name: result.name,
      date_owned: result.date_owned,
      price_owned: result.price_owned,
      location: result.location,
    },
    categories: result.categories,
    pictures: result.pictures,
  };
}

export type GetAssetResponse = {
  asset: Asset;
  categories: AssetCategory[];
  pictures: AssetPicture[];
};

export type searchAssetRequest = {
  name?: string;
  date_owned_lower?: Date;
  date_owned_upper?: Date;
  price_owned_lower?: number;
  price_owned_upper?: number;
  categories?: number[];
  page: number;
  size: number;
};

export function searchAssetBuilder(request: searchAssetRequest): any {}

export type AddAssetPictureRequest = {
  asset: {
    id: string;
  };
  picture: {
    url: string;
  };
};

export type AddAssetPictureResponse = {
  id: number;
  pictures: AssetPicture[];
};

export type DeleteAssetPictureRequest = {
  asset: {
    id: number;
  };
  picture: {
    id: number;
    url?: string;
  };
};

export type DeleteAssetPictureResponse = {
  id: number;
  picture: AssetPicture[];
};

export const assetWithPictures = Prisma.validator<Prisma.AssetDefaultArgs>()({
  include: { pictures: true },
});
export type AssetWithPictures = Prisma.AssetGetPayload<
  typeof assetWithPictures
>;

export function DeleteAssetPictureConverter(
  result: AssetWithPictures
): DeleteAssetPictureResponse {
  return {
    id: result.id,
    picture: result.pictures,
  };
}
