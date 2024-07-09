import newsJSON from "./news.test.mock.json";
import { Asset, News, Prisma } from "@prisma/client";
import { prismaClient } from "../src/application/database";

export class newsTest {
  static async createMassMock() {
    await prismaClient.newsCategory.createMany({
      data: [
        { id: 100001, name: "category_100001" },
        { id: 100002, name: "category_100002" },
        { id: 100003, name: "category_100003" },
      ],
    });

    newsJSON.map(
      async (productData) =>
        await prismaClient.news.create({
          data: productData,
        })
    );
  }

  static async deleteMassMock() {
    await prismaClient.newsCategory.deleteMany({
      where: { id: { in: [100001, 100002, 100003] } },
    });

    newsJSON.map(
      async (productData) =>
        await prismaClient.news.delete({
          where: { id: productData.id },
        })
    );
  }

  static async createSingleMock(): Promise<News> {
    const result = await prismaClient.news.create({
      data: {
        title: "SingleMockTitle",
        author: "SingleMockAuthor",
      },
    });
    return result;
  }

  static async deleteSingleMock(id: number) {
    const result = await prismaClient.news.deleteMany({
      where: {
        id: id,
      },
    });
  }
}
