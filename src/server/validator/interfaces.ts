import type { z } from "zod";
import type {
  CalculateRequestSchema,
  CalculateResponseSchema,
} from "./calculateSchema";
import type { TokenName } from "../api/CONST";
import type { TokenType } from "chevrotain";

export type CalculateRequest = z.infer<typeof CalculateRequestSchema>;

export type CalculateResponse = z.infer<typeof CalculateResponseSchema>;

export type Operators =
  | TokenName.Plus
  | TokenName.Minus
  | TokenName.Mul
  | TokenName.Div
  | TokenName.LParen
  | TokenName.RParen;

export type TokenTypeDict = { [key in TokenName]: TokenType };
