class DlConstraint {
  constructor(id, left, right, isStrictInequality = false, constant = 0) {
    this.id = id;
    this.left = left;
    this.right = right;
    this.isStrictInequality = isStrictInequality;
    this.constant = constant;
  }

  toString() {
    const sign = this.isStrictInequality ? '<' : '\u{2264}';
    return `${this.left} - ${this.right} ${sign} ${this.constant}`;
  }
}

export default DlConstraint;
