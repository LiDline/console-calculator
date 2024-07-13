import { e2eCallerInit, type AppCaller } from "./e2eCallerInit";

let app: AppCaller;

describe("activityDefinition.create", () => {
  beforeAll(async () => {
    app = e2eCallerInit();
  });

  test("e2e. 1 Верный возврат", async () => {
    const input = "1 + 1";

    const res = app.calculator.mathCalculatorWithChevrotain(input);

    expect(res).toBe(2);
  });
});
