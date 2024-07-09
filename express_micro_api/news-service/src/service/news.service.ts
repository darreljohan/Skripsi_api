import { Prisma } from "@prisma/client";
import {
  deleteNewsResponse,
  searchNewsRequest,
  searchNewsResponse,
  toUploadNewsResponse,
  uploadNewsRequest,
  uploadNewsResponse,
} from "../model/news.model";
import { prismaClient } from "../application/database";
import { Validation } from "../validation/validation";
import { NewsValidationService } from "../validation/news.validation";
import { Pageable } from "../model/page.model";
import { stringToNumberChanger } from "../utility/numberChecker";
import { User } from "../model/user.model";

export class NewsService {
  static async upload(
    user: User,
    request: uploadNewsRequest
  ): Promise<uploadNewsResponse> {
    //Validating request body
    const validate = Validation.validate(NewsValidationService.CREATE, request);

    //Insert query to database
    const result = await prismaClient.news.create({
      data: {
        title: validate.title,
        description: validate.description,
        author: user.name,
        uploadDate: new Date(),
      },
      include: {
        tags: true,
      },
    });

    //Formatting query result to response model
    const formatted = toUploadNewsResponse(result);

    return formatted;
  }

  static async search(
    user: User,
    request: searchNewsRequest
  ): Promise<Pageable<uploadNewsResponse>> {
    const searchRequest = Validation.validate(
      NewsValidationService.SEARCH,
      request
    );

    //Building Array of Filter for Prisma
    const skip = (searchRequest.page - 1) * searchRequest.size;
    const filter = [{}];
    if (searchRequest.title) {
      filter.push({ title: { contains: searchRequest.title } });
    }

    if (searchRequest.tags) {
      filter.push({
        tags: {
          some: {
            id: { in: searchRequest.tags },
          },
        },
      });
    }

    if (searchRequest.upload_date_lower && searchRequest.upload_date_upper) {
      filter.push({
        uploadDate: {
          gte: new Date(searchRequest.upload_date_lower),
          lte: new Date(searchRequest.upload_date_upper),
        },
      });
    } else if (searchRequest.upload_date_lower) {
      filter.push({
        uploadDate: {
          gte: searchRequest.upload_date_lower,
        },
      });
    } else if (searchRequest.upload_date_upper) {
      filter.push({
        uploadDate: {
          lte: searchRequest.upload_date_upper,
        },
      });
    }

    const result = await prismaClient.news.findMany({
      where: { AND: filter },
      take: searchRequest.size,
      skip: skip,
      include: { tags: true },
    });

    const total = await prismaClient.news.count({
      where: { AND: filter },
    });

    return {
      data: result.map((news) => toUploadNewsResponse(news)),
      paging: {
        size: searchRequest.size,
        totalPage: Math.ceil(total / searchRequest.size),
        currentPage: skip,
      },
    };
  }

  static async delete(
    user: User,
    request: string
  ): Promise<uploadNewsResponse> {
    //change params request from string to number
    const params = stringToNumberChanger(request);

    //Check if params is provided
    const validate = Validation.validate(NewsValidationService.DELETE, params);

    //Query database to delete
    const checker = await prismaClient.news.delete({
      where: { id: validate },
      include: { tags: true },
    });

    if (!checker) {
      throw new Error("Asset not found");
    }

    return toUploadNewsResponse(checker);
  }
}
