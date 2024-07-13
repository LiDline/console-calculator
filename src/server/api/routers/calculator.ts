import {
  CalculateRequestSchema,
  CalculateResponseSchema,
} from "src/server/validator/calculateSchema";
import { createTRPCRouter, customProcedure } from "../../../server/api/trpc";

// import mathCalculator from "./calculator/mathCalculator";
import mathCalculatorWithChevrotain from "./calculator/mathCalculatorWithChevrotain";

export const calculatorRouter = createTRPCRouter({
  // calculate: customProcedure
  //   .input(CalculateRequestSchema)
  //   .output(CalculateResponseSchema)
  //   .mutation(({ input }) => {
  //     const res = mathCalculator(input);

  //     return res;
  //   }),

  mathCalculatorWithChevrotain: customProcedure
    .input(CalculateRequestSchema)
    .output(CalculateResponseSchema)
    .mutation(({ input }) => {
      console.log(input);

      const res = mathCalculatorWithChevrotain(input);

      return res;
    }),
});
