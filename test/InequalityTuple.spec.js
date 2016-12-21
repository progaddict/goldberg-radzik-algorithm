import { expect } from 'chai';

import { InequalityTuple } from '../core/logic/ConstraintGraph';

describe('InequalityTuple.add tests', () => {

  let a, b, c, d, e = null;

  beforeEach(function () {
    a = new InequalityTuple(true, -3);
    b = new InequalityTuple(true, 10);
    c = new InequalityTuple(false, 0);
    d = new InequalityTuple(false, 5);
    e = new InequalityTuple(false, -100);
  });

  it('must return the same constraint if it is only one', () => {
    let result = InequalityTuple.add(a);
    expect(result).to.deep.equal({
      isStrictInequality: true,
      constant: -3,
    });
    result = InequalityTuple.add(c);
    expect(result).to.deep.equal({
      isStrictInequality: false,
      constant: 0,
    });
    result = InequalityTuple.add(e);
    expect(result).to.deep.equal({
      isStrictInequality: false,
      constant: -100,
    });
  });

  it('must preserve non-strict inequality if there are only non-strict inequalities', () => {
    let result = InequalityTuple.add(c, d, e);
    expect(result).to.have.deep.property('isStrictInequality', false);
  });

  it('must return strict inequality if there are at least one strict inequality', () => {
    let result = InequalityTuple.add(c, d, e, a);
    expect(result).to.have.deep.property('isStrictInequality', true);
    result = InequalityTuple.add(a, b);
    expect(result).to.have.deep.property('isStrictInequality', true);
  });

  it('must always add up constants', () => {
    let result = InequalityTuple.add(a, b);
    expect(result).to.have.deep.property('constant', 7);
    result = InequalityTuple.add(c, d, e);
    expect(result).to.have.deep.property('constant', -95);
    result = InequalityTuple.add(c, d, e, a, b);
    expect(result).to.have.deep.property('constant', -88);
    result = InequalityTuple.add(a);
    expect(result).to.have.deep.property('constant', -3);
    result = InequalityTuple.add(b);
    expect(result).to.have.deep.property('constant', 10);
    result = InequalityTuple.add(c);
    expect(result).to.have.deep.property('constant', 0);
    result = InequalityTuple.add(d);
    expect(result).to.have.deep.property('constant', 5);
    result = InequalityTuple.add(e);
    expect(result).to.have.deep.property('constant', -100);
  });

});



describe('InequalityTuple.compare tests', () => {

  let a1, b1, c1, d1, e1, f1 = null;
  let a2, b2, c2, d2, e2, f2 = null;

  beforeEach(function () {
    a1 = new InequalityTuple(false, -3);
    a2 = new InequalityTuple(false, -3);
    b1 = new InequalityTuple(true, -3);
    b2 = new InequalityTuple(true, -3);
    c1 = new InequalityTuple(false, 0);
    c2 = new InequalityTuple(false, 0);
    d1 = new InequalityTuple(true, 0);
    d2 = new InequalityTuple(true, 0);
    e1 = new InequalityTuple(false, 15);
    e2 = new InequalityTuple(false, 15);
    f1 = new InequalityTuple(true, 15);
    f2 = new InequalityTuple(true, 15);
  });

  it('must compare signs when constants are equal', () => {
    let result = InequalityTuple.compare(a1, b1);
    expect(result).to.equal(-1);
    result = InequalityTuple.compare(c1, d1);
    expect(result).to.equal(-1);
    result = InequalityTuple.compare(e1, f1);
    expect(result).to.equal(-1);
  });

  it('must compare constants first', () => {
    let result = InequalityTuple.compare(a1, c1);
    expect(result).to.equal(-1);
    result = InequalityTuple.compare(c1, e1);
    expect(result).to.equal(-1);
  });

  it('must return 0 when tuples are completely equal', () => {
    let result = InequalityTuple.compare(a1, a2);
    expect(result).to.equal(0);
    result = InequalityTuple.compare(a2, a1);
    expect(result).to.equal(0);
    result = InequalityTuple.compare(b1, b2);
    expect(result).to.equal(0);
    result = InequalityTuple.compare(b2, b1);
    expect(result).to.equal(0);
    result = InequalityTuple.compare(c1, c2);
    expect(result).to.equal(0);
    result = InequalityTuple.compare(c2, c1);
    expect(result).to.equal(0);
    result = InequalityTuple.compare(d1, d2);
    expect(result).to.equal(0);
    result = InequalityTuple.compare(d2, d1);
    expect(result).to.equal(0);
    result = InequalityTuple.compare(e1, e2);
    expect(result).to.equal(0);
    result = InequalityTuple.compare(e2, e1);
    expect(result).to.equal(0);
    result = InequalityTuple.compare(f1, f2);
    expect(result).to.equal(0);
    result = InequalityTuple.compare(f2, f1);
    expect(result).to.equal(0);
  });

  it('must honor triangle inequality', () => {
    expect(InequalityTuple.compare(a1, b1)).to.equal(-1);
    expect(InequalityTuple.compare(b1, c1)).to.equal(-1);
    expect(InequalityTuple.compare(a1, c1)).to.equal(-1);

    expect(InequalityTuple.compare(b1, c1)).to.equal(-1);
    expect(InequalityTuple.compare(c1, d1)).to.equal(-1);
    expect(InequalityTuple.compare(b1, d1)).to.equal(-1);

    expect(InequalityTuple.compare(c1, d1)).to.equal(-1);
    expect(InequalityTuple.compare(d1, e1)).to.equal(-1);
    expect(InequalityTuple.compare(c1, e1)).to.equal(-1);

    expect(InequalityTuple.compare(a2, b2)).to.equal(-1);
    expect(InequalityTuple.compare(b2, c2)).to.equal(-1);
    expect(InequalityTuple.compare(c2, d2)).to.equal(-1);
    expect(InequalityTuple.compare(d2, e2)).to.equal(-1);
    expect(InequalityTuple.compare(e2, f2)).to.equal(-1);
    expect(InequalityTuple.compare(a2, f2)).to.equal(-1);
  });

  it('must return reverse number when arguments are reversed', () => {
    expect(InequalityTuple.compare(a1, b1)).to.equal(-1);
    expect(InequalityTuple.compare(b2, a2)).to.equal(+1);

    expect(InequalityTuple.compare(b1, c1)).to.equal(-1);
    expect(InequalityTuple.compare(c2, b2)).to.equal(+1);

    expect(InequalityTuple.compare(c1, d1)).to.equal(-1);
    expect(InequalityTuple.compare(d2, c2)).to.equal(+1);

    expect(InequalityTuple.compare(d1, e1)).to.equal(-1);
    expect(InequalityTuple.compare(e2, d2)).to.equal(+1);

    expect(InequalityTuple.compare(e1, f1)).to.equal(-1);
    expect(InequalityTuple.compare(f2, e2)).to.equal(+1);
  });

});
