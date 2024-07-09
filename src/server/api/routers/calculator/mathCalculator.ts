import createLexer from "./createLexer";

export default function mathCalculator(input: string) {
  const lexer = createLexer(input);
  console.log(lexer);

  return lexer;
}
