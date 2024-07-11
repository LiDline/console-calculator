import { ALLOWED_OPERATORS } from "../../routers/calculator/CONST";

export default function generateRegex(): RegExp {
  const operators = ALLOWED_OPERATORS;

  const escapedOperators = operators.map((op) => `\\${op}`).join("");

  const regexString = `(\\d+(\\.\\d+)?|[${escapedOperators}])`;

  return new RegExp(regexString, "g");
}
