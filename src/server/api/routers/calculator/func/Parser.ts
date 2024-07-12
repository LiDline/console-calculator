import { CstParser } from "chevrotain";
import type { CstNode, ParserMethod } from "chevrotain";
import type { TokenTypeDict } from "~/server/validator/interfaces";

export class CustomParser extends CstParser {
  private allTokens: TokenTypeDict;
  expression: ParserMethod<[], CstNode>;
  additionExpression: ParserMethod<[], CstNode>;
  multiplicationExpression: ParserMethod<[], CstNode>;
  atomicExpression: ParserMethod<[], CstNode>;
  parenthesisExpression: ParserMethod<[], CstNode>;

  constructor(allTokens: TokenTypeDict) {
    super(allTokens, {
      maxLookahead: 1,
    });

    this.allTokens = allTokens;

    this.expression = this.RULE("expression", () => {
      this.SUBRULE(this.additionExpression);
    });

    this.additionExpression = this.RULE("additionExpression", () => {
      this.SUBRULE(this.multiplicationExpression, { LABEL: "lhs" });
      this.MANY(() => {
        this.CONSUME(this.allTokens.AdditionOperator);
        this.SUBRULE1(this.multiplicationExpression, { LABEL: "rhs" });
      });
    });

    this.multiplicationExpression = this.RULE(
      "multiplicationExpression",
      () => {
        this.SUBRULE(this.atomicExpression, { LABEL: "lhs" });
        this.MANY(() => {
          this.CONSUME(this.allTokens.MultiplicationOperator);
          this.SUBRULE1(this.atomicExpression, { LABEL: "rhs" });
        });
      },
    );

    this.atomicExpression = this.RULE("atomicExpression", () => {
      this.OR([
        { ALT: () => this.SUBRULE(this.parenthesisExpression) },
        { ALT: () => this.CONSUME(this.allTokens.NumberLiteral) },
      ]);
    });

    this.parenthesisExpression = this.RULE("parenthesisExpression", () => {
      this.CONSUME(this.allTokens["("]);
      this.SUBRULE(this.expression);
      this.CONSUME(this.allTokens[")"]);
    });

    this.performSelfAnalysis();
  }
}
