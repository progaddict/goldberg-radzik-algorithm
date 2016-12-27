import { expect } from 'chai';

import ConstraintGraph from '../core/logic/ConstraintGraph';
import DlConstraint from '../core/logic/DlConstraint';
import InequalityTuple from '../core/logic/InequalityTuple';



describe('ConstraintGraph.create tests', () => {

  it('must add two nodes for one inequality', () => {
    const g = ConstraintGraph.create(
      DlConstraint.create('x', 'y'),
    );
    const nodes = ConstraintGraph.nodes(g);
    const adjacencyLists = g.get('adjacencyLists');
    const source = g.get('source');
    const distanceEstimates = g.get('distanceEstimates');
    expect(nodes).to.have.lengthOf(2);
    for (let n of ['x', 'y']) {
      expect(nodes).to.include(n);
    }
    expect(source).to.be.null;
    expect(distanceEstimates.keySeq().toArray()).to.be.empty;
  });

  it('must not add the same node twice', () => {
    const g = ConstraintGraph.create(
      DlConstraint.create('x', 'y'),
      DlConstraint.create('y', 'z'),
    );
    const nodes = ConstraintGraph.nodes(g);
    const adjacencyLists = g.get('adjacencyLists');
    const source = g.get('source');
    const distanceEstimates = g.get('distanceEstimates');
    expect(nodes).to.have.lengthOf(3);
    for (let n of ['x', 'y', 'z']) {
      expect(nodes).to.include(n);
    }
    expect(source).to.be.null;
    expect(distanceEstimates.keySeq().toArray()).to.be.empty;
  });

});



describe('ConstraintGraph.edges tests', () => {

  it('must add one edge for one inequality', () => {
    const g = ConstraintGraph.create(
      DlConstraint.create('x', 'y', true, -10),
    );
    const edges = ConstraintGraph.edges(g);
    expect(edges).to.have.lengthOf(1);
    const e = edges[0];
    expect(e.get('from'), 'x');
    expect(e.get('to'), 'y');
    expect(e.getIn(['weight', 'isStrictInequality']), true);
    expect(e.getIn(['weight', 'constant']), -10);
  });

});



describe('ConstraintGraph.isAdmissibleArc tests', () => {

  it('must create admissible right after the creation', () => {
    let g = ConstraintGraph.create(
      DlConstraint.create('x', 'y', true, -10),
      DlConstraint.create('u', 'w', false, 10),
      DlConstraint.create('x', 'u', false, 0),
    );
    g = ConstraintGraph.initSingleSource(g, 'x');
    expect(ConstraintGraph.isAdmissibleArc(g, 'x', 'y')).to.be.true;
    expect(ConstraintGraph.isAdmissibleArc(g, 'u', 'w')).to.be.false;
    expect(ConstraintGraph.isAdmissibleArc(g, 'x', 'u')).to.be.true;
    expect(ConstraintGraph.isAdmissibleArc(g, 'a', 'b')).to.be.false;
    expect(ConstraintGraph.isAdmissibleArc(g, 'y', 'x')).to.be.false;
    expect(ConstraintGraph.isAdmissibleArc(g, 'x', 'a')).to.be.false;
  });

});
