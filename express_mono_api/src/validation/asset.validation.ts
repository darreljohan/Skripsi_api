import { z, ZodType } from "zod";

export class AssetValidationService {
  static readonly CREATE: ZodType = z.object({
    name: z.string().min(1).max(100),
    date_owned: z.string().datetime().optional(),
    price_owned: z.number().min(1).max(100).optional(),
    location: z.string().min(1).max(500).optional(),
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

  static readonly PATCH: ZodType = z.object({
    id: z.number().positive(),
    name: z.string().min(1).max(100).optional(),
    date_owned: z.string().datetime().optional(),
    price_owned: z.number().min(1).max(100).optional(),
    location: z.string().min(1).max(500).optional(),
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
}
