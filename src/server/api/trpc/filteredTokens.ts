import type { FilteredTokens } from "~/server/validator/interfaces";
import { ERRORS } from "../CONST";
import checkTokensOnDoubleBracket from "./filteredTokens/checkTokensOnDoubleBracket";
import generateRegex from "./filteredTokens/generateRegex";

export default function filteredTokens(input: string): FilteredTokens {
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

  return {
    result: filteredTokens.join(""),
  };
}
