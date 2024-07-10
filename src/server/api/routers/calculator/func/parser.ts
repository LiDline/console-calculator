export class CalculatorRule {
  this.rule("expression", () => {
    this.subRule(this.additionExpression);
    });
}
