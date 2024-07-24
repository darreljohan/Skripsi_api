import { PrismaClient as AssetClient } from "@prisma-asset-database/client";
import { PrismaClient as UserClient } from "@prisma-user-database/client";
import { PrismaClient as NewsClient } from "@prisma-news-database/client";

export const assetClient = new AssetClient({
  log: [
    {
      emit: "event",
      level: "query",
    },
    {
      emit: "event",
      level: "error",
    },
    {
      emit: "event",
      level: "info",
    },
    {
      emit: "event",
      level: "warn",
    },
  ],
});

export const userClient = new UserClient({
  log: [
    {
      emit: "event",
      level: "query",
    },
    {
      emit: "event",
      level: "error",
    },
    {
      emit: "event",
      level: "info",
    },
    {
      emit: "event",
      level: "warn",
    },
  ],
});

export const newsClient = new NewsClient({
  log: [
    {
      emit: "event",
      level: "query",
    },
    {
      emit: "event",
      level: "error",
    },
    {
      emit: "event",
      level: "info",
    },
    {
      emit: "event",
      level: "warn",
    },
  ],
});

/*
prismaClient.$on("error", (e) => {
  logger.error(e);
});
prismaClient.$on("query", (e) => {
  logger.info(e);
});
prismaClient.$on("info", (e) => {
  logger.info(e);
});
prismaClient.$on("warn", (e) => {
  logger.warn(e);
});
*/
