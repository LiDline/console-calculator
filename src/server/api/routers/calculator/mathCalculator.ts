import type { CalculateResponse } from "~/server/validator/interfaces";

export default function mathCalculator(input: string): CalculateResponse {
  type SymbolType =
    | "additionExpr"
    | "multiplicationExpr"
    | "atomicExpr"
    | "NUMBER";

  const symbols = {
    additionExpr: [["multiplicationExpr", "additionExpr'"]],
    "additionExpr'": [
      ["+", "multiplicationExpr", "additionExpr'"],
      ["-", "multiplicationExpr", "additionExpr'"],
      [],
    ],
    multiplicationExpr: [["atomicExpr", "multiplicationExpr'"]],
    "multiplicationExpr'": [
      ["*", "atomicExpr", "multiplicationExpr'"],
      ["/", "atomicExpr", "multiplicationExpr'"],
      [],
    ],
    atomicExpr: [["NUMBER"], ["(", "additionExpr", ")"]],
    NUMBER: [["0"], ["1"], ["2"], ["3"], ["4"], ["5"]],
  };

  type Tree = {
    [key in SymbolType]?: unknown[];
  };

  function consume(
    text: string,
    symbol: SymbolType,
  ): { remainder: string; tree: Tree } | undefined {
    const matches: { remainder: string; tree: Tree }[] = [];

    symbols[symbol].forEach((alternative) => {
      const tree: Tree = { [symbol]: [] };

      let remainder = text.trim();

      const matchOk = alternative.every((part) => {
        if (symbols[part as SymbolType]) {
          const result = consume(remainder, part as SymbolType);

          if (result) {
            remainder = result.remainder.trim();

            tree[symbol]?.push(result.tree);

            return true;
          } else {
            return false;
          }
        } else if (remainder.startsWith(part)) {
          remainder = remainder.substr(part.length).trim();

          tree[symbol]?.push(part);

          return true;
        } else {
          return false;
        }
      });
      if (matchOk) {
        matches.push({ remainder, tree });
      }
    });

    if (matches.length) {
      return matches.sort(
        (r1, r2) => r1.remainder.length - r2.remainder.length,
      )[0];
    }
  }

  consume(input, "additionExpr");

  // console.log(JSON.stringify(res));

  return { result: 1 };
}
