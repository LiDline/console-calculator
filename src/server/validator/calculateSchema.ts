import { z } from "zod";
import { ERRORS_LIST } from "../api/routers/calculator/CONST";

export const CalculateRequestSchema = z.string().min(1);

export const CalculateResponseSchema = z.object({
  error: z.enum(ERRORS_LIST).optional(),
});
