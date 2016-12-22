import DlConstraint from './DlConstraint';



const PRECISION = 1e-5;
const VERTEX_COLOR = '#000099';
const SOURCE_VERTEX_COLOR = '#990000';



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
    return this.add(this, that);
  }

  compareTo(that) {
    return this.compare(this, that);
  }

}



class ConstraintGraph {

  constructor() {
    this.adjacencyLists = Object.create(null);
    this.source = null;
    this.distanceEstimates = null;
  }

  // private API

  _initAdjacencyList(v) {
    if (!this.adjacencyLists[v]) {
      this.adjacencyLists[v] = [];
    }
  }

  _initSingleSource(sourceVertex) {
    this.source = sourceVertex || this.V[0]
    this.distanceEstimates = Object.create(null);
    this.distanceEstimates[this.source] = new InequalityTuple(true, 0);
  }

  // public API

  static fromDlConstraints(...constraints) {
    const result = new ConstraintGraph();
    for (let c of constraints) {
      result.addEdgeFromDlConstraint(c);
    }
    result._initSingleSource();
    return result;
  }

  addEdgeFromDlConstraint(dlConstraint) {
    const from = dlConstraint.left;
    const to = dlConstraint.right;
    const weight = new InequalityTuple(dlConstraint.isStrictInequality, dlConstraint.constant);
    this._initAdjacencyList(from);
    this._initAdjacencyList(to);
    const edge = { from, to, weight };
    this.adjacencyLists[from].push(edge);
  }

  getDistanceEstimate(v) {
    return this.distanceEstimates[v] || new InequalityTuple(true, Infinity);
  }

  isSourceVertex(v) {
    return v === this.source;
  }

  get V() {
    return Object.keys(this.adjacencyLists);
  }

  get E() {
    const listOfEdgeLists = this.V.map(v => this.adjacencyLists[v]);
    const listOfEdges = [].concat.apply([], listOfEdgeLists);
    return listOfEdges;
  }

  get numberOfNodes() {
    return this.V.length;
  }

}



export default ConstraintGraph;
