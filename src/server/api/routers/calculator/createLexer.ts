import type {
  TokensTypeWithError,
  Operators,
  TokensType,
} from "~/server/validator/interfaces";
import { ERRORS } from "./CONST";
import checkTokensOnDoubleBracket from "./func/createLexer/checkTokensOnDoubleBracket";
import generateRegex from "./func/createLexer/generateRegex";

export default function createLexer(input: string): TokensTypeWithError {
  const regex = generateRegex();

  const clearTokens = input.match(regex);

  if (!clearTokens) {
    return {
      error: ERRORS.notFoundOperatorsOrNumbers,
    };
  }

  const filteredTokens = checkTokensOnDoubleBracket(clearTokens);

  if (!filteredTokens) {
    return {
      error: ERRORS.brokenBrackets,
    };
  }

  const tokens: TokensType[] = filteredTokens.map((t) => {
    return {
      categories: !isNaN(Number(t)) ? "NumberLiteral" : "AddOperator",
      type: (!isNaN(Number(t)) ? "number" : t) as Operators | "number",
      value: t as Operators | number,
    };
  });

  return { tokens } as TokensTypeWithError;
}
