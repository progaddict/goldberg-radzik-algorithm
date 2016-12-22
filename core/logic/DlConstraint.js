const LESS_CHARACTER = '<';
const LESS_THAN_OR_EQUALS_CHARACTER = '\u2264';


class DlConstraint {
  constructor(left, right, isStrictInequality = false, constant = 0, id) {
    this.id = id;
    this.left = left;
    this.right = right;
    this.isStrictInequality = isStrictInequality;
    this.constant = constant;
  }

  toString() {
    const sign = this.isStrictInequality ? LESS_CHARACTER : LESS_THAN_OR_EQUALS_CHARACTER;
    return `${this.left} - ${this.right} ${sign} ${this.constant}`;
  }
}

export default DlConstraint;
export {
  LESS_CHARACTER,
  LESS_THAN_OR_EQUALS_CHARACTER,
};
