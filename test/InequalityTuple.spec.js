import { expect } from 'chai';

import InequalityTuple from '../core/logic/InequalityTuple';



describe('InequalityTuple.add tests', () => {

  let a, b, c, d, e = null;

  beforeEach(function () {
    a = InequalityTuple.create(true, -3);
    b = InequalityTuple.create(true, 10);
    c = InequalityTuple.create(false, 0);
    d = InequalityTuple.create(false, 5);
    e = InequalityTuple.create(false, -100);
  });

  it('must return the same constraint if it is only one', () => {
    let result = InequalityTuple.add(a);
    expect(result.get('isStrictInequality')).to.be.true;
    expect(result.get('constant')).to.equal(-3);
    result = InequalityTuple.add(b);
    expect(result.get('isStrictInequality')).to.be.true;
    expect(result.get('constant')).to.equal(10);
    result = InequalityTuple.add(c);
    expect(result.get('isStrictInequality')).to.be.false;
    expect(result.get('constant')).to.equal(0);
    result = InequalityTuple.add(d);
    expect(result.get('isStrictInequality')).to.be.false;
    expect(result.get('constant')).to.equal(5);
    result = InequalityTuple.add(e);
    expect(result.get('isStrictInequality')).to.be.false;
    expect(result.get('constant')).to.equal(-100);
  });

  it('must preserve non-strict inequality if there are only non-strict inequalities', () => {
    let result = InequalityTuple.add(c, d, e);
    expect(result.get('isStrictInequality')).to.be.false;
  });

  it('must return strict inequality if there are at least one strict inequality', () => {
    let result = InequalityTuple.add(c, d, e, a);
    expect(result.get('isStrictInequality')).to.be.true;
    result = InequalityTuple.add(a, b);
    expect(result.get('isStrictInequality')).to.be.true;
  });

  it('must always add up constants', () => {
    let result = InequalityTuple.add(a, b);
    expect(result.get('constant')).to.equal(7);
    result = InequalityTuple.add(c, d, e);
    expect(result.get('constant')).to.equal(-95);
    result = InequalityTuple.add(c, d, e, a, b);
    expect(result.get('constant')).to.equal(-88);
    result = InequalityTuple.add(a);
    expect(result.get('constant')).to.equal(-3);
    result = InequalityTuple.add(b);
    expect(result.get('constant')).to.equal(10);
    result = InequalityTuple.add(c);
    expect(result.get('constant')).to.equal(0);
    result = InequalityTuple.add(d);
    expect(result.get('constant')).to.equal(5);
    result = InequalityTuple.add(e);
    expect(result.get('constant')).to.equal(-100);
  });

});



describe('InequalityTuple.compare tests', () => {

  let a1, b1, c1, d1, e1, f1 = null;
  let a2, b2, c2, d2, e2, f2 = null;

  beforeEach(function () {
    a1 = InequalityTuple.create(false, -3);
    a2 = InequalityTuple.create(false, -3);
    b1 = InequalityTuple.create(true, -3);
    b2 = InequalityTuple.create(true, -3);
    c1 = InequalityTuple.create(false, 0);
    c2 = InequalityTuple.create(false, 0);
    d1 = InequalityTuple.create(true, 0);
    d2 = InequalityTuple.create(true, 0);
    e1 = InequalityTuple.create(false, 15);
    e2 = InequalityTuple.create(false, 15);
    f1 = InequalityTuple.create(true, 15);
    f2 = InequalityTuple.create(true, 15);
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
