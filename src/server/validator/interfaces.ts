import type { z } from "zod";
import type { CalculateRequestSchema } from "./calculateSchema";

export type CalculateRequest = z.infer<typeof CalculateRequestSchema>;

export type Operators = "+" | "-" | "*" | "/" | "(" | ")";

export interface LexerType {
  type: Operators | "number";
  value: Operators | number;
}
