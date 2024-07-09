import { appRouter } from "../../../root";

export type AppCaller = Awaited<ReturnType<typeof e2eCallerInit>>;

export function e2eCallerInit() {
  const caller = appRouter.createCaller({});

  return caller;
}
