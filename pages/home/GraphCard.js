import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';

import { LESS_CHARACTER, LESS_THAN_OR_EQUALS_CHARACTER } from '../../core/logic/DlConstraint';
import Button from '../../components/Button';



function cartesianXToScreenX(originX, x) {
  return originX + x;
}

function cartesianYToScreenY(originY, y) {
  return originY - y;
}

function screenXTocartesianX(originX, x) {
  return x - originX;
}

function screenYTocartesianY(originY, y) {
  return originY - y;
}



class Graph extends React.Component {

  static propTypes = {
    constraintGraph: PropTypes.any,
  }

  render() {
    const { className, constraintGraph } = this.props;
    const svgWidth = 500, svgHeight = 500;
    const viewBox = `0 0 ${svgWidth} ${svgHeight}`;
    const originX = svgWidth / 2;
    const originY = svgHeight / 2;
    const radius = 0.7 * Math.min(originX, originY);
    const N = constraintGraph.numberOfNodes;
    const vertices = constraintGraph.V.map((v, idx) => {
      const x = cartesianXToScreenX(originX, radius * Math.cos(2 * Math.PI * idx / N));
      const y = cartesianYToScreenY(originY, radius * Math.sin(2 * Math.PI * idx / N));
      const d = constraintGraph.getDistanceEstimate(v);
      return { name: v, x, y, d };
    });
    const edges = constraintGraph.E.map(e => {
      const source = vertices.find(v => v.name === e.from);
      const x1 = source.x;
      const y1 = source.y;
      const target = vertices.find(v => v.name === e.to);
      const x2 = target.x;
      const y2 = target.y;
      const name = `${e.from}-${e.to}`;
      return { name, x1, y1, x2, y2, isAdmissible: false };
    });
    const circles = vertices.map(v => {
      const fillColor = constraintGraph.isSourceVertex(v.name) ? 'blue' : 'gray';
      return (
        <circle key={v.name} cx={v.x} cy={v.y} r="5" stroke="black" strokeWidth="1" fill={fillColor} />
      );
    });
    const nodeLabels = vertices.map(v => {
      const sign = v.d.isStrictInequality ? LESS_CHARACTER : LESS_THAN_OR_EQUALS_CHARACTER;
      const constant = v.d.constant.toFixed(3);
      return (<text key={v.name} x={v.x - 35} y={v.y - 10}>
        {`d(${v.name}) = (${sign}, ${constant})`}
      </text>
      );
    });
    const lines = edges.map(e => {
      const markerEnd = e.isAdmissible ? 'url(#arrowAdmissible)' : 'url(#arrowNormal)';
      return (
        <line key={e.name} x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2} stroke="gray" strokeOpacity="0.5" strokeWidth="3" markerEnd={markerEnd} />
      );
    });
    return (
      <svg className={className} version="1.1" viewBox={viewBox} preserveAspectRatio="xMinYMin meet">
        <defs>
          <marker id="arrowNormal" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,6 L9,3 z" fill="gray" />
          </marker>
          <marker id="arrowAdmissible" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,6 L9,3 z" fill="blue" />
          </marker>
        </defs>
        <g> {lines} </g>
        <g> {circles} </g>
        <g> {nodeLabels} </g>
      </svg>
    );
  }

}



class GraphCard extends React.Component {

  static propTypes = {
    onStartAlgorithm: PropTypes.func.isRequired,
    onStopAlgorithm: PropTypes.func.isRequired,
    isStartAlgorithmActive: PropTypes.bool.isRequired,
    isStopAlgorithmActive: PropTypes.bool.isRequired,
    constraintGraph: PropTypes.object.isRequired,
  }

  componentDidMount() {
    window.componentHandler.upgradeElement(this.root);
  }

  componentWillUnmount() {
    window.componentHandler.downgradeElements(this.root);
  }

  render() {
    const { className, onStartAlgorithm, onStopAlgorithm,
      isStartAlgorithmActive, isStopAlgorithmActive, constraintGraph } = this.props;
    const classNameRoot = cx(
      'card-wide',
      'mdl-card',
      'mdl-shadow--2dp',
      className
    );
    return (
      <div ref={node => (this.root = node)} className={classNameRoot}>
        <div className="mdl-card__title">
          <h2 className="mdl-card__title-text">Graph</h2>
        </div>
        <div className="mdl-card__supporting-text">
          <Graph constraintGraph={constraintGraph} />
        </div>
        <div className="mdl-card__menu">
          <Button type="mini-fab" colored={true} ripple={true} accent={true}
            onClick={() => onStartAlgorithm()}
            disabled={!isStartAlgorithmActive}>
            <i className="material-icons">play_arrow</i>
          </Button>
          <Button type="mini-fab" colored={true} ripple={true} accent={true}
            onClick={() => onStopAlgorithm()}
            disabled={!isStopAlgorithmActive}>
            <i className="material-icons">pause</i>
          </Button>
        </div>
      </div>
    );
  }

}

const stpGraph = (state) => {
  return {
    isStartAlgorithmActive: state.isStartAlgorithmActive,
    isStopAlgorithmActive: state.isStopAlgorithmActive,
    constraintGraph: state.constraintGraph,
  }
};
const dtpGraph = (dispatch) => {
  return {
    onStartAlgorithm: () => dispatch({ type: 'START_ALGORITHM' }),
    onStopAlgorithm: () => dispatch({ type: 'STOP_ALGORITHM' }),
  }
};
export default connect(stpGraph, dtpGraph)(GraphCard);
