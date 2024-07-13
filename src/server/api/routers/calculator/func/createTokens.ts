import { createToken, Lexer } from "chevrotain";
import { TokenName } from "~/server/api/CONST";
import type { TokenTypeDict } from "~/server/validator/interfaces";

export default function createTokens() {
  const AdditionOperator = createToken({
    name: TokenName.AdditionOperator,
    pattern: Lexer.NA,
  });
  const Plus = createToken({
    name: TokenName.Plus,
    pattern: /\+/,
    categories: AdditionOperator,
  });
  const Minus = createToken({
    name: TokenName.Minus,
    pattern: /-/,
    categories: AdditionOperator,
  });

  const MultiplicationOperator = createToken({
    name: TokenName.MultiplicationOperator,
    pattern: Lexer.NA,
  });
  const Mul = createToken({
    name: TokenName.Mul,
    pattern: /\*/,
    categories: MultiplicationOperator,
  });
  const Div = createToken({
    name: TokenName.Div,
    pattern: /\//,
    categories: MultiplicationOperator,
  });

  const LParen = createToken({
    name: TokenName.LParen,
    pattern: /\(/,
  });
  const RParen = createToken({
    name: TokenName.RParen,
    pattern: /\)/,
  });

  const NumberLiteral = createToken({
    name: TokenName.NumberLiteral,
    pattern: /[0-9]+[.]?[0-9]*([eE][+\-][0-9]+)?/,
  });

  const WhiteSpace = createToken({
    name: "WhiteSpace",
    pattern: /\s+/,
    group: Lexer.SKIPPED,
  });

  const tokensByPriority = [
    WhiteSpace,
    Plus,
    Minus,
    Mul,
    Div,
    LParen,
    RParen,
    NumberLiteral,
    AdditionOperator,
    MultiplicationOperator,
  ];

  // For type in parser
  const tokens: TokenTypeDict = tokensByPriority.reduce((acc, tokenType) => {
    acc[tokenType.name as TokenName] = tokenType;

    return acc;
  }, {} as TokenTypeDict);

  return { tokensByPriority, tokens };
}
