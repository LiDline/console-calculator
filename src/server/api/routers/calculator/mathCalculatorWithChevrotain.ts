import { Lexer } from "chevrotain";
import createTokens from "./func/createTokens";
import { Parser } from "./func/Parser";

export default function mathCalculatorWithChevrotain(input: string) {
  const { tokensByPriority, tokens } = createTokens();

  const CalculatorLexer = new Lexer(tokensByPriority, {
    ensureOptimizations: true,
  });

  const parser = new Parser(tokens);

  const BaseCstVisitor = parser.getBaseCstVisitorConstructor();

  return;
}
