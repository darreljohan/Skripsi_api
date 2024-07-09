import { Asset, Prisma } from "@prisma/client";
import { prismaClient } from "../src/application/database";
import assetJSON from "./asset.test.mock.json";

export class assetTest {
  static async createSingleMock() {
    await prismaClient.asset.create({
      data: {
        id: 10000,
        name: "test_asset",
        categories: {
          connectOrCreate: {
            create: {
              id: 10000,
              name: "test_category",
              description: "test_desc",
            },
            where: {
              id: 10000,
            },
          },
        },
      },
    });
  }

  static async deleteSingleMock() {
    const [deleteAsset, deleteCategory] = await prismaClient.$transaction([
      prismaClient.asset.deleteMany({
        where: {
          id: 10000,
        },
      }),
      prismaClient.assetCategory.deleteMany({
        where: {
          id: 10000,
        },
      }),
    ]);
  }

  static async getDataById(paramsID: number): Promise<Asset[]> {
    return await prismaClient.asset.findMany({
      where: {
        id: paramsID,
      },
      include: {
        categories: true,
        pictures: true,
      },
    });
  }

  static async deleteDataById(paramsID: number): Promise<Prisma.BatchPayload> {
    return await prismaClient.asset.deleteMany({
      where: {
        id: paramsID,
      },
    });
  }

  static async createMassMock() {
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

  static async deleteMassMock() {
    await prismaClient.assetCategory.deleteMany({
      where: { id: { in: [100001, 100002, 100003] } },
    });

    assetJSON.map(
      async (productData) =>
        await prismaClient.asset.delete({
          where: { id: productData.id },
        })
    );
  }

  static async emptyPictureTable() {
    await prismaClient.assetPicture.deleteMany();
  }
}
