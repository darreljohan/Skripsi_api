import { z, ZodNaN, ZodType } from "zod";

export class AssetValidationService {
  static readonly CREATE: ZodType = z.object({
    asset: z.object({
      name: z.string().min(1).max(100),
      date_owned: z.string().datetime().optional(),
      price_owned: z.number().min(1).max(100).optional(),
      location: z.string().min(1).max(500).optional(),
    }),
    categories: z
      .array(
        z
          .object({
            id: z.number(),
            name: z.string().min(1).max(100).optional(),
            description: z.string().min(1).max(100).optional(),
          })
          .optional()
      )
      .nullish(),
    pictures: z
      .array(
        z.object({
          id: z.number(),
          url: z.string().min(1).max(2083),
        })
      )
      .optional(),
  });

  static readonly UPDATE: ZodType = z.object({
    asset: z.object({
      id: z.number().positive(),
      name: z.string().min(1).max(100).optional(),
      date_owned: z.string().datetime().optional(),
      price_owned: z.number().min(1).max(100).optional(),
      location: z.string().min(1).max(500).optional(),
    }),
    categories: z
      .array(
        z
          .object({
            id: z.number(),
            name: z.string().min(1).max(100).optional(),
            description: z.string().min(1).max(100).optional(),
          })
          .optional()
      )
      .nullish(),
  });

  static readonly SEARCH: ZodType = z.object({
    name: z.string().min(1).max(100).optional(),
    date_owned_lower: z.string().datetime().optional(),
    date_owned_upper: z.string().datetime().optional(),
    price_owned_lower: z.number().min(1).optional(),
    price_owned_upper: z.number().min(1).optional(),
    categories: z.array(z.number().positive().optional()).nullish(),
    page: z.number().min(1).max(100).default(1),
    size: z.number().min(1).max(100).default(10),
  });

  static readonly ADD_PICTURE: ZodType = z.object({
    asset: z.object({
      id: z.string(),
    }),
    picture: z.object({
      url: z.string(),
    }),
  });

  static readonly DELETE_PICTURE: ZodType = z.object({
    asset: z.object({
      id: z.number().min(1),
    }),
    picture: z.object({
      id: z.number(),
      url: z.string().optional(),
    }),
  });
}
