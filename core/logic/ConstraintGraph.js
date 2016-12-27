import { Map, List } from 'immutable';

import DlConstraint from './DlConstraint';
import InequalityTuple from './InequalityTuple';



class ConstraintGraph {

  static create(...constraints) {
    let result = Map({
      adjacencyLists: Map(),
      source: null,
      distanceEstimates: Map(),
    });
    if (!constraints || constraints.length === 0) {
      return result;
    }
    for (let c of constraints) {
      result = ConstraintGraph.addEdgeFromDlConstraint(result, c);
    }
    return result;
  }

  // private API

  static _initAdjacencyList(g, v) {
    if (g.hasIn(['adjacencyLists', v])) {
      return g;
    }
    return g.setIn(['adjacencyLists', v], List());
  }

  // public API

  static initSingleSource(g, sourceVertex) {
    const source = sourceVertex || ConstraintGraph.nodes(g)[0];
    g = g.set('source', source);
    const distanceEstimates = Map({
      [source]: InequalityTuple.create(false, 0),
    });
    g = g.set('distanceEstimates', distanceEstimates);
    return g;
  }

  static addEdgeFromDlConstraint(g, dlConstraint) {
    const from = dlConstraint.get('left');
    const to = dlConstraint.get('right');
    const isStrictInequality = dlConstraint.get('isStrictInequality');
    const constant = dlConstraint.get('constant');
    const weight = InequalityTuple.create(isStrictInequality, constant);
    g = ConstraintGraph._initAdjacencyList(g, from);
    g = ConstraintGraph._initAdjacencyList(g, to);
    const edge = Map({ from, to, weight });
    g = g.updateIn(['adjacencyLists', from], val => val.push(edge));
    return g;
  }

  static getDistanceEstimate(g, v) {
    return g.getIn(['distanceEstimates', v]) || InequalityTuple.create(true, Infinity);
  }

  static isSourceVertex(g, v) {
    return v === g.get('source');
  }

  static isAdmissibleArc(g, from, to) {
    const edges = g.getIn(['adjacencyLists', from]);
    if (!edges) {
      return false;
    }
    const edge = edges.find(e => e.get('to') === to);
    if (!edge) {
      return false;
    }
    return ConstraintGraph.isAdmissibleEdge(g, edge);
  }

  static isAdmissibleEdge(g, edge) {
    console.log('edge', JSON.stringify(edge));
    const dFrom = ConstraintGraph.getDistanceEstimate(g, edge.get('from'));
    const dTo = ConstraintGraph.getDistanceEstimate(g, edge.get('to'));
    const newD = InequalityTuple.add(dFrom, edge.get('weight'));
    const result = InequalityTuple.compare(newD, dTo);
    console.log('dFrom', JSON.stringify(dFrom));
    console.log('dTo', JSON.stringify(dTo));
    console.log('newD', JSON.stringify(newD));
    console.log('result', JSON.stringify(result));
    return result <= 0;
  }

  static nodes(g) {
    return g.get('adjacencyLists').keySeq().toArray();
  }

  static edges(g) {
    const result = g.get('adjacencyLists').map((v, k) => v).flatten(true).toArray();
    return result;
  }

  static numberOfNodes(g) {
    return ConstraintGraph.nodes(g).length;
  }

}



export default ConstraintGraph;
