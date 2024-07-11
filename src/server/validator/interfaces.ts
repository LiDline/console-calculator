import type { z } from "zod";
import type {
  CalculateRequestSchema,
  CalculateResponseSchema,
} from "./calculateSchema";

export type CalculateRequest = z.infer<typeof CalculateRequestSchema>;

export type CalculateResponse = z.infer<typeof CalculateResponseSchema>;
