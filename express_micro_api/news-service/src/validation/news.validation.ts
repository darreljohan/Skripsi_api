import { title } from "process";
import { z, ZodNaN, ZodType } from "zod";

export class NewsValidationService {
  static readonly CREATE: ZodType = z.object({
    title: z.string().min(1).max(100),
    description: z.string().optional(),
    tags: z.array(z.object({ id: z.number() })).optional(),
  });

  static readonly SEARCH: ZodType = z.object({
    title: z.string().min(1).max(100).optional(),
    upload_date_lower: z.string().datetime().optional(),
    upload_date_upper: z.string().datetime().optional(),
    tags: z.array(z.number().positive().optional()).nullish(),
    page: z.number().min(1).max(100).default(1),
    size: z.number().min(1).max(100).default(10),
  });

  static readonly DELETE: ZodType = z.number();
}
