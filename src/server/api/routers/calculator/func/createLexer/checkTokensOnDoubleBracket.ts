export default function checkTokensOnDoubleBracket(str: string[]) {
  const stack: string[] = [];

  for (const char of str) {
    if (char === "(") {
      stack.push(char);
    } else if (char === ")") {
      if (stack.length === 0) {
        return false;
      }

      stack.pop();
    }
  }

  return stack.length === 0 ? str : undefined;
}
