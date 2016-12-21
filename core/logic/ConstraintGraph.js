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

  _mapVertexIntoSigmaNode(v) {
    const d = this.getDistanceEstimate(v);
    const sign = d.isStrictInequality ? '<' : '<=';
    const distance = d.constant.toFixed(2);
    return {
      id: v,
      label: `d(${v}) = (${sign}, ${distance})`,
      color: v === this.source ? SOURCE_VERTEX_COLOR : VERTEX_COLOR,
    };
  }

  _mapEdgeIntoSigmaEdge(e) {
    return {
      id: `${e.from}-${e.to}`,
      source: e.from,
      target: e.to,
      label: 'ff',
    };
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

  toSigmaGraph() {
    const testNodes = [
      { "id": "u", "label": "d(u) = (<, 0.00)", "color": "#990000" },
      { "id": "v", "label": "d(v) = (<, Infinity)", "color": "#000099" },
      { "id": "w", "label": "d(w) = (<, Infinity)", "color": "#000099" },
      { "id": "x", "label": "d(x) = (<, Infinity)", "color": "#000099" },
      { "id": "y", "label": "d(y) = (<, Infinity)", "color": "#000099" },
      { "id": "z", "label": "d(z) = (<, Infinity)", "color": "#000099" }
    ];
    const testEdges = [
      { "id": "u-v", "source": "u", "target": "v" },
      { "id": "v-w", "source": "v", "target": "w" },
      { "id": "w-x", "source": "w", "target": "x" },
      { "id": "x-y", "source": "x", "target": "y" },
      { "id": "y-z", "source": "y", "target": "z" },
      { "id": "y-v", "source": "y", "target": "v" }
    ];
    const nodes = this.V.map(v => this._mapVertexIntoSigmaNode(v));
    const edges = this.E.map(e => this._mapEdgeIntoSigmaEdge(e));
    return { nodes, edges };
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
