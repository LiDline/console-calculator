"use client";

import { useState } from "react";

import { api } from "~/trpc/react";

export function LatestPost() {
  const utils = api.useUtils();

  const [mathString, setMathString] = useState("");

  const calculate = api.calculator.calculate.useMutation({
    onSuccess: async () => {
      await utils.calculator.invalidate();
      setMathString("");
    },
  });

  return (
    <div className="w-full max-w-xs">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          calculate.mutate(mathString);
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
