import { Asset } from "@prisma/client";
import { prismaClient } from "../src/application/database";
import assetJSON from "./asset.format.mock.json";

export class AssetTest {
  static async create() {
    await prismaClient.asset.create({
      data: {
        id: 10000,
        name: "test_asset",
        categories: {
          create: {
            id: 10000,
            name: "test_category",
            description: "test_desc",
          },
        },
      },
    });
  }

  static async delete() {
    await prismaClient.asset.deleteMany({ where: { id: 10000 } });
    await prismaClient.asset.deleteMany({ where: { id: 10001 } });
    await prismaClient.asset.deleteMany({ where: { name: "test_asset" } });
    await prismaClient.assetCategory.deleteMany({
      where: { id: 10000 },
    });
    await prismaClient.assetCategory.deleteMany({
      where: { id: 10001 },
    });
    await prismaClient.assetPicture.deleteMany({ where: { id: 10000 } });
  }

  static async deleteExceptAsset() {
    await prismaClient.assetCategory.deleteMany({
      where: { id: 10000 },
    });
    await prismaClient.assetPicture.deleteMany({ where: { id: 10000 } });
  }

  static async get(): Promise<any> {
    const result = await prismaClient.asset.findMany({
      include: { categories: true, pictures: true },
    });
    return result;
  }

  static async buildSearchData() {
    await prismaClient.assetCategory.createMany({
      data: [
        { id: 100001, name: "category_100001" },
        { id: 100002, name: "category_100002" },
        { id: 100003, name: "category_100003" },
      ],
    });

    assetJSON.map(
      async (productData) =>
        await prismaClient.asset.create({
          data: productData,
        })
    );
  }

  static async deleteSearchData() {
    await prismaClient.asset.deleteMany({});
    await prismaClient.assetCategory.deleteMany({});
  }

  static async createAssetwithMockPicture() {
    await prismaClient.asset.create({
      data: {
        id: 10001,
        name: "test_asset",
        categories: {
          create: {
            id: 10001,
            name: "test_category",
            description: "test_desc",
          },
        },
        pictures: {
          create: {
            id: 10001,
            url: "test_picture",
          },
        },
      },
    });
  }

  static async deleteAllPicture() {
    await prismaClient.assetPicture.deleteMany();
  }
}
