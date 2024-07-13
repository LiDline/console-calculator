import type { z } from "zod";
import type {
  CalculateRequestSchema,
  CalculateResponseSchema,
} from "./calculateSchema";
import type { TokenName } from "../api/CONST";
import type { CstNode, IToken, TokenType } from "chevrotain";

export type FilteredTokens = {
  error?: string;
  result?: string;
};

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

export interface ExpressionNode extends CstNode {
  additionExpression: AdditionExpressionNode[];
}

export interface AdditionExpressionNode extends CstNode {
  lhs: MultiplicationExpressionNode[];
  rhs: MultiplicationExpressionNode[];
  AdditionOperator: IToken[];
}

export interface MultiplicationExpressionNode extends CstNode {
  lhs: AtomicExpressionNode[];
  rhs: AtomicExpressionNode[];
  MultiplicationOperator: IToken[];
}

export interface AtomicExpressionNode extends CstNode {
  parenthesisExpression?: ParenthesisExpressionNode[];
  NumberLiteral?: IToken[];
}

export interface ParenthesisExpressionNode extends CstNode {
  expression: ExpressionNode[];
}
