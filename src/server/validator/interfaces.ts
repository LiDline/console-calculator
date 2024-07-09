import type { z } from "zod";
import type {
  CalculateRequestSchema,
  CalculateResponseSchema,
} from "./calculateSchema";

export type CalculateRequest = z.infer<typeof CalculateRequestSchema>;

export type CalculateResponse = z.infer<typeof CalculateResponseSchema>;

export type Operators = "+" | "-" | "*" | "/" | "(" | ")";

export interface TokensType {
  tokens?: { type: Operators | "number"; value: Operators | number }[];
  error?: string;
}
