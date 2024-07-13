import { e2eCallerInit, type AppCaller } from "./e2eCallerInit";

let app: AppCaller;

describe("calculator", () => {
  beforeAll(async () => {
    app = e2eCallerInit();
  });

  test("e2e. 1", async () => {
    const input = "1 + 1";

    const res = await app.calculator.mathCalculatorWithChevrotain(input);

    expect(res.result).toBe(2);
  });

  test("e2e. 2", async () => {
    const input = "1 + 1.5 * as(2+23)*12 - (23 + 1.22)wdfs2";

    const expected = 1 + 1.5 * (2 + 23) * 12 - (23 + 1.22);

    const res = await app.calculator.mathCalculatorWithChevrotain(input);

    expect(expected).toBe(res.result);
  });
});
