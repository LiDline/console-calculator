import { CalculateRequestSchema } from "src/server/validator/calculateSchema";
import { createTRPCRouter, publicProcedure } from "../../../server/api/trpc";

import mathCalculator from "./calculator/mathCalculator";

export const calculatorRouter = createTRPCRouter({
  calculate: publicProcedure
    .input(CalculateRequestSchema)
    // .output()
    .mutation(({ input }) => {
      const res = mathCalculator(input);

      return res;
    }),
});
