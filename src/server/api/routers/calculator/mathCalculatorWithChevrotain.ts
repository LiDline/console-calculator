import { Lexer } from "chevrotain";
import createTokens from "./func/createTokens";
import { CustomParser } from "./func/Parser";
import type { CalculateResponse } from "~/server/validator/interfaces";

export default function mathCalculatorWithChevrotain(
  input: string,
): CalculateResponse {
  const { tokensByPriority, tokens } = createTokens();

  const CalculatorLexer = new Lexer(tokensByPriority, {
    ensureOptimizations: true,
  });

  const lexingResult = CalculatorLexer.tokenize(input);

  const parser = new CustomParser(tokens);
  parser.reset();
  parser.input = lexingResult.tokens;

  const cst = parser.expression();

  const BaseCstVisitor = parser.getBaseCstVisitorConstructor();

  return {
    result: "1",
  };
}
