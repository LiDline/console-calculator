import type { LexerType, Operators } from "~/server/validator/interfaces";
import { ERRORS } from "./CONST";
import checkTokensOnDoubleBracket from "./func/createLexer/checkTokensOnDoubleBracket";
import generateRegex from "./func/createLexer/generateRegex";

export default function createLexer(input: string) {
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

  const tokens: LexerType[] = filteredTokens.map((t) => {
    return {
      type: (!isNaN(Number(t)) ? "number" : t) as Operators | "number",
      value: t as Operators | number,
    };
  });

  return tokens;
}
