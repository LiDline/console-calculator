import createLexer from "./createLexer";

export default function mathCalculator(input: string) {
  const tokens = createLexer(input);

  if (tokens.error) {
    return tokens;
  }

  return;
}
