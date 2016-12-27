import { Map } from 'immutable';



const LESS_CHARACTER = '<';
const LESS_THAN_OR_EQUALS_CHARACTER = '\u2264';



class DlConstraint {

  static create(left, right, isStrictInequality = false, constant = 0, id) {
    const result = Map({
      left,
      right,
      isStrictInequality,
      constant,
      id
    });
    return result;
  }

  static toString(dlConstraint) {
    const left = dlConstraint.get('left');
    const right = dlConstraint.get('right');
    const sign = dlConstraint.get('isStrictInequality') ? LESS_CHARACTER : LESS_THAN_OR_EQUALS_CHARACTER;
    const constant = dlConstraint.get('constant');
    return `${left} - ${right} ${sign} ${constant}`;
  }
}

export default DlConstraint;
export {
  LESS_CHARACTER,
  LESS_THAN_OR_EQUALS_CHARACTER,
};
