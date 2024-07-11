"use client";

import React from "react";

import { CalculatorField } from "~/app/_components/CalculatorField";

export default function Home() {
  const [isChecked, setIsChecked] = React.useState(true);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          <span className="text-[hsl(280,100%,70%)]">Консольный</span>{" "}
          калькулятор
        </h1>

        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">Использовать Chevrotain? </span>
            <input
              type="checkbox"
              className="toggle"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
          </label>
        </div>

        <div className="flex flex-col items-center gap-2"></div>
      </div>
      <CalculatorField chevrotain={isChecked} />
    </main>
  );
}
