import { tokenMatcher } from "chevrotain";

import type { CustomParser } from "./customParser";
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

    expression(ctx: ExpressionNode): unknown {
      return this.visit(ctx.additionExpression, undefined);
    }

    additionExpression(ctx: AdditionExpressionNode): number | undefined {
      let result = this.visit(ctx.lhs, undefined) as number;

      if (!ctx.rhs) return result;

      for (let i = 0; i < ctx.rhs.length; i++) {
        const operator = ctx.AdditionOperator[i]!;

        const value = this.visit(ctx.rhs[i]!, undefined) as number;

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

    multiplicationExpression(ctx: MultiplicationExpressionNode): unknown {
      let result = this.visit(ctx.lhs, undefined) as number;

      if (!ctx.rhs) return result;

      for (let i = 0; i < ctx.rhs.length; i++) {
        const operator = ctx.MultiplicationOperator[i]!;

        const value = this.visit(ctx.rhs[i]!, undefined) as number;

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
    atomicExpression(ctx: AtomicExpressionNode): unknown {
      if (ctx.parenthesisExpression) {
        return this.visit(ctx.parenthesisExpression, undefined);
      }

      if (ctx.NumberLiteral?.length) {
        return Number.parseFloat(ctx.NumberLiteral?.[0]?.image ?? "");
      }
    }

    parenthesisExpression(ctx: ParenthesisExpressionNode): unknown {
      return this.visit(ctx.expression, undefined);
    }
  }

  return new InterpreterVisitor();
}
