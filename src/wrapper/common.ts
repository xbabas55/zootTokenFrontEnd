import { z } from "zod";

export const CommonResponse = z.object({
  code: z.number(),
  success: z.boolean(),
  err: z.string().optional(),   // usually optional
  data: z.string(),
});

export type Response = z.infer<typeof CommonResponse>;