import { Map } from 'immutable';



const PRECISION = 1e-5;



class InequalityTuple {

  static create(isStrictInequality = false, constant = Infinity) {
    const result = Map({
      isStrictInequality,
      constant
    });
    return result;
  }

  static add(...params) {
    let isStrictInequality = false;
    let constant = 0;
    for (let p of params) {
      isStrictInequality = isStrictInequality || p.get('isStrictInequality');
      constant += p.get('constant');
    }
    return InequalityTuple.create(isStrictInequality, constant);
  }

  static compare(left, right) {
    const lc = left.get('constant');
    const rc = right.get('constant');
    if (Math.abs(lc - rc) < PRECISION) {
      if (left.get('isStrictInequality') ^ right.get('isStrictInequality')) {
        return left.get('isStrictInequality') ? +1 : -1;
      }
      return 0;
    }
    return lc < rc ? -1 : +1;
  }

}



export default InequalityTuple;
