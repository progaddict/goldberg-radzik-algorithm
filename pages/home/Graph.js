import React, { PropTypes } from 'react';
import { connect } from 'react-redux'
import { Sigma, RandomizeNodePositions, RelativeSize } from 'react-sigmajs';
import cx from 'classnames';

import Button from '../../components/Button';



class Graph extends React.Component {

  static propTypes = {
    onStartAlgorithm: PropTypes.func.isRequired,
    onStopAlgorithm: PropTypes.func.isRequired,
    isStartAlgorithmActive: PropTypes.bool.isRequired,
    isStopAlgorithmActive: PropTypes.bool.isRequired,
  }

  componentDidMount() {
    window.componentHandler.upgradeElement(this.root);
  }

  componentWillUnmount() {
    window.componentHandler.downgradeElements(this.root);
  }

  render() {
    const { className, onStartAlgorithm, onStopAlgorithm,
      isStartAlgorithmActive, isStopAlgorithmActive } = this.props;
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
          <Sigma graph={{ nodes: [{ id: "n1", label: "Alice" }, { id: "n2", label: "Rabbit" }], edges: [{ id: "e1", source: "n1", target: "n2", label: "SEES" }] }} settings={{ drawEdges: true }}>
            <RelativeSize initialSize={15} />
            <RandomizeNodePositions />
          </Sigma>
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
    isStopAlgorithmActive: state.isStopAlgorithmActive
  }
};
const dtpGraph = (dispatch) => {
  return {
    onStartAlgorithm: () => dispatch({ type: 'START_ALGORITHM' }),
    onStopAlgorithm: () => dispatch({ type: 'STOP_ALGORITHM' }),
  }
};
export default connect(stpGraph, dtpGraph)(Graph);
