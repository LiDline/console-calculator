import type { TokensType } from "~/server/validator/interfaces";
import createLexer from "./createLexer";
// import { Parser } from "./func/parser";

export default function mathCalculator(input: string) {
  const tokens = createLexer(input);

  if (tokens.error) {
    return tokens;
  }

  // console.log(tokens);

  function consume(tokens: TokensType[]) {
    const res = tokens.map((t, id) => {
      if (t.categories === "AddOperator") {
        const branch: { expr: { left: any; right: any; op: any } } = {
          expr: {
            left: tokens.slice(0, id),
            op: t,
            right: tokens.slice(id + 1, tokens.length),
          },
        };

        return branch;
      }
    });

    return res;
  }

  const res = consume(tokens.tokens!);

  console.log(JSON.stringify(res, null, 2));
  console.log("-----------------------------------------");

  // const parser = new Parser();

  // const program = "42";

  // const ast = parser.parse(program);

  // console.log(JSON.stringify(ast, null, 2));

  return;
}
