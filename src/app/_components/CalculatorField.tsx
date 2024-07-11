import { useState } from "react";

import { api } from "~/trpc/react";

interface CalculatorFieldProps {
  chevrotain: boolean;
}

export function CalculatorField({ chevrotain }: CalculatorFieldProps) {
  const utils = api.useUtils();

  const [mathString, setMathString] = useState("");
  const [result, setResult] = useState<string>("");

  const handleError = (error: string) => setResult(`Ошибка. ${error}`);

  const calculate = api.calculator.calculate.useMutation({
    onSuccess: async () => {
      await utils.calculator.invalidate();
    },
    onError: (error) => handleError(error.message),
  });

  const calculateWithChevrotain =
    api.calculator.mathCalculatorWithChevrotain.useMutation({
      onSuccess: async () => {
        // await utils.mathCalculatorWithChevrotain.invalidate();
      },
      onError: (error) => handleError(error.message),
    });

  return (
    <div className="w-full max-w-xs">
      <>{result}</>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const res = chevrotain
            ? calculateWithChevrotain.mutate(mathString)
            : calculate.mutate(mathString);

          setResult(res);
        }}
        className="flex flex-col gap-2"
      >
        <input
          type="text"
          placeholder="Введите выражение..."
          value={mathString}
          onChange={(e) => setMathString(e.target.value)}
          className="w-full rounded-full px-4 py-2 text-black"
        />
        <button
          type="submit"
          className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
          disabled={calculate.isPending}
        >
          {calculate.isPending ? "Вычисление..." : "Вычислить"}
        </button>
      </form>
    </div>
  );
}
