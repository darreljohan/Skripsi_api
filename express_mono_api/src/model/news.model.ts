import { News, NewsCategory, Prisma } from "@prisma/client";
import { Paging } from "./page.model";

export type uploadNewsRequest = {
  title: string;
  description: string;
  tags: NewsCategory[];
  upload_date: Date;
  document_link: string;
};

export const validNewsWithTags = Prisma.validator<Prisma.NewsDefaultArgs>()({
  include: { tags: true },
});

export type NewsWithTags = Prisma.NewsGetPayload<typeof validNewsWithTags>;

export function toUploadNewsResponse(result: NewsWithTags): uploadNewsResponse {
  return {
    news: {
      id: result.id,
      title: result.title,
      author: result.author,
      description: result.description,
      documentLink: result.documentLink,
      uploadDate: result.uploadDate,
    },
    tags: result.tags,
  };
}

export type uploadNewsResponse = {
  news: News;
  tags: NewsCategory[];
};

export type searchNewsRequest = {
  title: string;
  upload_date_lower: Date;
  upload_date_upper: Date;
  tags: number[];
  page: number;
  size: number;
};

export type searchNewsResponse = {
  news: News[];
  paging: Paging;
};

export type deleteNewsResponse = {
  news: News;
  tags: NewsCategory;
};
