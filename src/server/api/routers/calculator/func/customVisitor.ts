import { tokenMatcher } from "chevrotain";

import type { CustomParser } from "./Parser";
import type { TokenTypeDict } from "~/server/validator/interfaces";

export default function customVisitor(
  parser: CustomParser,
  tokens: TokenTypeDict,
) {
  const BaseCstVisitor = parser.getBaseCstVisitorConstructor();

  class InterpreterVisitor extends BaseCstVisitor {
    constructor() {
      super();
      this.validateVisitor();
    }

    expression(ctx, state): any {
      return this.visit(ctx.additionExpression, state);
    }

    additionExpression(ctx, state): any {
      let result = this.visit(ctx.lhs, state);
      if (!ctx.rhs) return result;
      for (let i = 0; i < ctx.rhs.length; i++) {
        const operator = ctx.AdditionOperator[i];
        const value = this.visit(ctx.rhs[i], state);
        if (tokenMatcher(operator, tokens.Plus)) {
          result += value;
        } else if (tokenMatcher(operator, tokens.Minus)) {
          result -= value;
        } else {
          throw new Error(
            `Unknown operator: ${operator.image} at ${operator.startOffset}`,
          );
        }
      }
      return result;
    }

    multiplicationExpression(ctx, state): any {
      let result = this.visit(ctx.lhs, state);
      if (!ctx.rhs) return result;
      for (let i = 0; i < ctx.rhs.length; i++) {
        const operator = ctx.MultiplicationOperator[i];
        const value = this.visit(ctx.rhs[i], state);
        if (tokenMatcher(operator, tokens.Mul)) {
          result *= value;
        } else if (tokenMatcher(operator, tokens.Div)) {
          result /= value;
        } else {
          throw new Error(
            `Unknown operator: ${operator.image} at ${operator.startOffset}`,
          );
        }
      }
      return result;
    }
    atomicExpression(ctx, state): any {
      if (ctx.parenthesisExpression) {
        return this.visit(ctx.parenthesisExpression, state);
      }
      if (ctx.NumberLiteral) {
        return Number.parseFloat(ctx.NumberLiteral[0].image);
      }
    }

    parenthesisExpression(ctx, state): any {
      return this.visit(ctx.expression, state);
    }
  }

  return new InterpreterVisitor();
}
