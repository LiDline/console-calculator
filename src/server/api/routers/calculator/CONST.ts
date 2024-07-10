import type { Operators } from "../../../../server/validator/interfaces";

// export const ALLOWED_OPERATORS: Operators[] = ["+", "-", "*", "/", "(", ")"];

export const ALLOWED_OPERATORS: Operators[] = ["+", "-"];

export const ERRORS_LIST = [
  "Ошибка. В ведённой строке не обнаружены операторы или числа.",
  "В ведённой строке есть не закрытые скобки.",
] as const;

export const ERRORS = {
  notFoundOperatorsOrNumbers: ERRORS_LIST[0],
  brokenBrackets: ERRORS_LIST[1],
};
