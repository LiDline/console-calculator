import { z } from "zod";

export const CalculateRequestSchema = z.string().regex(/^[\d()+\-*/. ]*$/, {
  message: "Invalid characters found in the expression",
});
