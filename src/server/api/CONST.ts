import type { Operators } from "../validator/interfaces";

export enum TokenName {
  AdditionOperator = "AdditionOperator",
  Plus = "+",
  Minus = "-",
  MultiplicationOperator = "MultiplicationOperator",
  Mul = "*",
  Div = "/",
  LParen = "(",
  RParen = ")",
  NumberLiteral = "NumberLiteral",
}

export const ALLOWED_OPERATORS: Operators[] = [
  TokenName.Plus,
  TokenName.Minus,
  TokenName.Mul,
  TokenName.Div,
  TokenName.LParen,
  TokenName.RParen,
];

export const ERRORS_LIST = [
  "Ошибка. В ведённой строке не обнаружены операторы или числа.",
  "В ведённой строке есть не закрытые скобки.",
] as const;

export const ERRORS = {
  notFoundOperatorsOrNumbers: ERRORS_LIST[0],
  brokenBrackets: ERRORS_LIST[1],
};
