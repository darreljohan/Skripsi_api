import { z, ZodType } from "zod";

export class UserValidationService {
  static readonly REGISTER: ZodType = z.object({
    username: z.string().min(1).max(100),
    password: z.string().min(1).max(100),
    name: z.string().min(1).max(100),
  });

  static readonly LOGIN: ZodType = z.object({
    username: z.string().min(1).max(100),
    password: z.string().min(1).max(100),
  });

  static readonly UPDATE: ZodType = z.object({
    password: z.string().min(1).max(100).optional(),
    name: z.string().min(1).max(100).optional(),
  });

  static readonly AUTH: ZodType = z.object({
    token: z.string(),
  });

  static readonly USER: ZodType = z.object({
    username: z.string(),
    name: z.string(),
    password: z.string(),
    token: z.string(),
  });
}
