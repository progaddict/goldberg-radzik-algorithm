const PRECISION = 1e-5;



class InequalityTuple {

  constructor(isStrictInequality, constant = Infinity) {
    this.isStrictInequality = isStrictInequality;
    this.constant = constant;
  }

  static add(...params) {
    let isStrictInequality = false;
    let constant = 0;
    for (let p of params) {
      isStrictInequality = isStrictInequality || p.isStrictInequality;
      constant += p.constant;
    }
    return new InequalityTuple(isStrictInequality, constant);
  }

  static compare(left, right) {
    if (Math.abs(left.constant - right.constant) < PRECISION) {
      if (left.isStrictInequality ^ right.isStrictInequality) {
        return left.isStrictInequality ? +1 : -1;
      }
      return 0;
    }
    return left.constant < right.constant ? -1 : +1;
  }

  addTo(that) {
    return InequalityTuple.add(this, that);
  }

  compareTo(that) {
    return InequalityTuple.compare(this, that);
  }

}



export default InequalityTuple;
