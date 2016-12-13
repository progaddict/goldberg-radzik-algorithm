import DlConstraint from './DlConstraint';



class ConstraintGraph {

  constructor() {
    this.adjacencyLists = Object.create(null);
  }

  addEdgeFromDlConstraint(dlConstraint) {
    const from = dlConstraint.left;
    if (this.adjacencyLists[from]) {
      this.adjacencyLists[from].push(dlConstraint);
    }
    else {
      this.adjacencyLists[from] = [dlConstraint];
    }
  }

  get V() {
    return Object.keys(this.adjacencyLists);
  }

  get E() {
    const listOfEdgesLists = this.V.map(v => this.adjacencyLists[v]);
    const listOfEdges = [].concat.apply([], listOfEdgesLists);
    return listOfEdges;
  }

  get numberOfNodes() {
    return this.V.length;
  }

}



function dlConstraintsToConstraintGraph(dlConstraints) {
  return {};
}



function constraintGraphToSigmaGraph(constraintGraph) {
  return {
    nodes: [{ id: 'n1', label: 'Alice' }, { id: 'n2', label: 'Rabbit' }],
    edges: [{ id: 'e1', source: 'n1', target: 'n2', label: 'SEES' }],
  };
}



export default ConstraintGraph;
export { dlConstraintsToConstraintGraph, constraintGraphToSigmaGraph };
