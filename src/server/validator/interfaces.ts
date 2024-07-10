import type { z } from "zod";
import type {
  CalculateRequestSchema,
  CalculateResponseSchema,
} from "./calculateSchema";

export type CalculateRequest = z.infer<typeof CalculateRequestSchema>;

export type CalculateResponse = z.infer<typeof CalculateResponseSchema>;

export type Operators = "+" | "-" | "*" | "/" | "(" | ")";

export type Categories = "AddOperator" | "NumberLiteral";

export interface TokensType {
  type: Operators | "number";
  value: Operators | number;
  categories: Categories;
}

export interface TokensTypeWithError {
  tokens?: TokensType[];
  error?: string;
}
