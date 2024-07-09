import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { CalculateRequestSchema } from "~/server/validator/calculateSchema";

export const calculatorRouter = createTRPCRouter({
  calculate: publicProcedure
    .input(CalculateRequestSchema)
    // .output()
    .mutation(({ input }) => {
      const res = input;

      return res;
    }),
});
