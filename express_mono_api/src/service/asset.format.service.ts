import { Prisma, PrismaClient, User } from "@prisma/client";
import { prismaClient } from "../application/database";
import { Validation } from "../validation/validation";
import { AssetValidationService } from "../validation/asset.format.validation";
import { connect } from "http2";
import { logger } from "../application/logger";
import { stringToNumberChanger } from "../utility/numberChecker";
import {
  CreateAssetRequest,
  CreateAssetResponse,
  GetAssetResponse,
  assetAndCategoriesPicturesPrismaResultToAssetResponse,
  assetAndCategoriesPrismaResultToAssetResponse,
  searchAssetRequest,
} from "../model/asset.format.model";
import { Pageable } from "../model/page.model";

export class AssetFormattedService {
  static async create(
    user: User,
    request: CreateAssetRequest
  ): Promise<CreateAssetResponse> {
    //Request body validation with ZOD
    const assetRequest = Validation.validate(
      AssetValidationService.CREATE,
      request
    );

    //Create asset record, check if categories is provided then connect to existing category. Category Must Exist!
    const result = await prismaClient.asset.create({
      data: {
        name: assetRequest.asset.name,
        date_owned: assetRequest.asset.date_owned,
        price_owned: assetRequest.asset.price_owned,
        location: assetRequest.asset.location,
        categories: {
          connect:
            assetRequest.categories && Array.isArray(assetRequest.categories)
              ? assetRequest.categories.map((category) => {
                  return { id: category.id };
                })
              : [],
        },
      },
      include: { categories: true, pictures: true },
    });

    return assetAndCategoriesPrismaResultToAssetResponse(result);
  }

  static async get(user: User, id: string): Promise<CreateAssetResponse> {
    const checkedID = stringToNumberChanger(id);
    const result = await prismaClient.asset.findUnique({
      where: { id: checkedID },
      include: { categories: true, pictures: true },
    });

    if (!result) {
      throw new Error("Asset not found");
    }

    return assetAndCategoriesPicturesPrismaResultToAssetResponse(result);
  }

  static async update(
    user: User,
    request: CreateAssetRequest
  ): Promise<CreateAssetResponse> {
    const assetRequest = Validation.validate(
      AssetValidationService.UPDATE,
      request
    );

    try {
      if (assetRequest.categories && Array.isArray(assetRequest.categories)) {
        for (const category of assetRequest.categories) {
          const result = await prismaClient.assetCategory.findUniqueOrThrow({
            where: { id: category.id },
          });
        }
      } else {
        logger.info("categories is not defined");
      }
    } catch (error) {
      throw new Error("Invalid category id");
    }

    const result = await prismaClient.asset.update({
      where: {
        id: assetRequest.asset.id,
      },
      data: {
        name: assetRequest.asset.name,
        date_owned: assetRequest.asset.date_owned,
        price_owned: assetRequest.asset.price_owned,
        location: assetRequest.asset.location,
        categories: {
          set: assetRequest.categories,
        },
      },
      include: {
        categories: true,
      },
    });
    return assetAndCategoriesPrismaResultToAssetResponse(result);
  }

  static async remove(user: User, id: string): Promise<CreateAssetResponse> {
    //Change asset id string received from params to number type
    const checkedID = stringToNumberChanger(id);

    //Deleting Asset based on id. Automatically delete asset & category relation due to implicit scheme
    const result = await prismaClient.asset.delete({
      where: { id: checkedID },
      include: { categories: true, pictures: true },
    });

    if (!result) {
      throw new Error("Asset not found");
    }

    return assetAndCategoriesPicturesPrismaResultToAssetResponse(result);
  }

  static async search(
    user: User,
    request: searchAssetRequest
  ): Promise<Pageable<CreateAssetResponse>> {
    const searchRequest = Validation.validate(
      AssetValidationService.SEARCH,
      request
    );
    const skip = (searchRequest.page - 1) * searchRequest.size;

    const filter = [{}];
    if (searchRequest.name) {
      filter.push({ name: { contains: searchRequest.name } });
    }

    if (searchRequest.categories) {
      filter.push({
        categories: {
          some: {
            id: { in: searchRequest.categories },
          },
        },
      });
    }

    if (searchRequest.date_owned_lower && searchRequest.date_owned_upper) {
      filter.push({
        date_owned: {
          gte: new Date(searchRequest.date_owned_lower),
          lte: new Date(searchRequest.date_owned_upper),
        },
      });
    } else if (searchRequest.date_owned_lower) {
      filter.push({
        date_owned: {
          gte: searchRequest.date_owned_lower,
        },
      });
    } else if (searchRequest.date_owned_upper) {
      filter.push({
        date_owned: {
          lte: searchRequest.date_owned_upper,
        },
      });
    }

    if (searchRequest.price_owned_lower && searchRequest.price_owned_upper) {
      filter.push({
        price_owned: {
          gte: new Date(searchRequest.price_owned_lower),
          lte: new Date(searchRequest.price_owned_upper),
        },
      });
    } else if (searchRequest.price_owned_lower) {
      filter.push({
        price_owned: {
          gte: searchRequest.price_owned_lower,
        },
      });
    } else if (searchRequest.price_owned_upper) {
      filter.push({
        price_owned: {
          lte: searchRequest.price_owned_upper,
        },
      });
    }

    const result = await prismaClient.asset.findMany({
      where: { AND: filter },
      take: searchRequest.size,
      skip: skip,
      include: { categories: true },
    });

    const total = await prismaClient.asset.count({
      where: { AND: filter },
    });

    return {
      data: result.map((asset) =>
        assetAndCategoriesPrismaResultToAssetResponse(asset)
      ),
      paging: {
        size: searchRequest.size,
        totalPage: Math.ceil(total / searchRequest.size),
        currentPage: skip,
      },
    };
  }
}
