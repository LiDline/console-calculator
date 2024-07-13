import { tokenMatcher } from "chevrotain";

import type { CustomParser } from "./Parser";
import type {
  AdditionExpressionNode,
  AtomicExpressionNode,
  ExpressionNode,
  MultiplicationExpressionNode,
  ParenthesisExpressionNode,
  TokenTypeDict,
} from "~/server/validator/interfaces";

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

    expression(ctx: ExpressionNode, state): any {
      console.log(state);

      return this.visit(ctx.additionExpression, state);
    }

    additionExpression(ctx: AdditionExpressionNode, state): any {
      let result = this.visit(ctx.lhs, state);

      if (!ctx.rhs) return result;

      for (let i = 0; i < ctx.rhs.length; i++) {
        const operator = ctx.AdditionOperator[i]!;

        const value = this.visit(ctx.rhs[i], state);

        if (tokenMatcher(operator, tokens["+"])) {
          result += value;
        } else if (tokenMatcher(operator, tokens["-"])) {
          result -= value;
        } else {
          throw new Error(
            `Unknown operator: ${operator.image} at ${operator.startOffset}`,
          );
        }
      }
      return result;
    }

    multiplicationExpression(ctx: MultiplicationExpressionNode, state): any {
      let result = this.visit(ctx.lhs, state);

      if (!ctx.rhs) return result;

      for (let i = 0; i < ctx.rhs.length; i++) {
        const operator = ctx.MultiplicationOperator[i]!;

        const value = this.visit(ctx.rhs[i], state);
        if (tokenMatcher(operator, tokens["*"])) {
          result *= value;
        } else if (tokenMatcher(operator, tokens["/"])) {
          result /= value;
        } else {
          throw new Error(
            `Unknown operator: ${operator.image} at ${operator.startOffset}`,
          );
        }
      }
      return result;
    }
    atomicExpression(ctx: AtomicExpressionNode, state): any {
      if (ctx.parenthesisExpression) {
        return this.visit(ctx.parenthesisExpression, state);
      }
      if (ctx.NumberLiteral?.length) {
        return Number.parseFloat(ctx.NumberLiteral?.[0]?.image ?? "");
      }
    }

    parenthesisExpression(ctx: ParenthesisExpressionNode, state): any {
      return this.visit(ctx.expression, state);
    }
  }

  return new InterpreterVisitor();
}
