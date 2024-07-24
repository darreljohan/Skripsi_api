import { Asset, Prisma } from "@prisma-asset-database/client";
import { assetClient } from "./database/database";
import assetJSON from "./asset.test.mock.json";

export class assetTest {
  static async createSingleMock() {
    await assetClient.asset.create({
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
    const [deleteAsset, deleteCategory] = await assetClient.$transaction([
      assetClient.asset.deleteMany({
        where: {
          id: 10000,
        },
      }),
      assetClient.assetCategory.deleteMany({
        where: {
          id: 10000,
        },
      }),
    ]);
  }

  static async getDataById(paramsID: number): Promise<Asset[]> {
    return await assetClient.asset.findMany({
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
    return await assetClient.asset.deleteMany({
      where: {
        id: paramsID,
      },
    });
  }

  static async createMassMock() {
    await assetClient.assetCategory.createMany({
      data: [
        { id: 100001, name: "category_100001" },
        { id: 100002, name: "category_100002" },
        { id: 100003, name: "category_100003" },
      ],
    });

    assetJSON.map(
      async (productData) =>
        await assetClient.asset.create({
          data: productData,
        })
    );
  }

  static async deleteMassMock() {
    await assetClient.assetCategory.deleteMany({
      where: { id: { in: [100001, 100002, 100003] } },
    });

    assetJSON.map(
      async (productData) =>
        await assetClient.asset.delete({
          where: { id: productData.id },
        })
    );
  }

  static async emptyPictureTable() {
    await assetClient.assetPicture.deleteMany();
  }
}
