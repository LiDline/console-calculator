import { useState } from "react";
import { ALLOWED_OPERATORS } from "~/server/api/CONST";

import { api } from "~/trpc/react";

export function CalculatorField() {
  // const utils = api.useUtils();

  const [mathString, setMathString] = useState("");
  const [result, setResult] = useState<string>("");

  const handleResult = (res: string) => setResult(res);

  // const calculate = api.calculator.calculate.useMutation({
  //   onSuccess: async (res) => {
  //     await utils.calculator.invalidate();
  //     handleResult(`Результат: ${res.result}`);
  //   },
  //   onError: (error) => handleResult(error.message),
  // });

  const calculateWithChevrotain =
    api.calculator.mathCalculatorWithChevrotain.useMutation({
      onSuccess: (res) => handleResult(`Результат: ${res.result}`),

      onError: (error) => {
        handleResult(error.message);
      },
    });

  return (
    <div className="w-full max-w-xs">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          calculateWithChevrotain.mutate(mathString);
        }}
        className="flex flex-col gap-2"
      >
        <div
          className="tooltip"
          data-tip={`Допустимые символы: "${ALLOWED_OPERATORS.join(" ")}" и любые числа. Строки, не входящие в допустимые, будут игнорироваться.`}
        >
          <>{result}</>

          <input
            type="text"
            placeholder="Введите выражение..."
            value={mathString}
            onChange={(e) => setMathString(e.target.value)}
            className="w-full rounded-full px-4 py-2 text-black"
          />
        </div>

        <button
          type="submit"
          className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
          disabled={calculateWithChevrotain.isPending}
        >
          {calculateWithChevrotain.isPending ? "Вычисление..." : "Вычислить"}
        </button>
      </form>
    </div>
  );
}
