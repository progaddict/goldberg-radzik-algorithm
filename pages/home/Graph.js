import React, { PropTypes } from 'react';
import { connect } from 'react-redux'
import { Sigma, RandomizeNodePositions, RelativeSize } from 'react-sigmajs';
import Button from '../../components/Button';
import cx from 'classnames';



const AlgorithmControlButton = ({ onClick, isActive, icon }) => (
  <Button type="mini-fab" colored={true} primary={true} ripple={true} accent={true} onClick={onClick} disabled={!isActive}>
    <i className="material-icons">{icon}</i>
  </Button>
)
AlgorithmControlButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  icon: PropTypes.string.isRequired,
}

const stpStartAlgorithmButton = (state) => {
  return {
    isActive: state.isStartAlgorithmActive
  }
};
const dtpStartAlgorithmButton = (dispatch) => {
  return {
    onClick: () => dispatch({ type: 'START_ALGORITHM' })
  }
};
const StartAlgorithmButton = connect(stpStartAlgorithmButton, dtpStartAlgorithmButton)(AlgorithmControlButton);

const stpStopAlgorithmButton = (state) => {
  return {
    isActive: state.isStopAlgorithmActive
  }
};
const dtpStopAlgorithmButton = (dispatch) => {
  return {
    onClick: () => dispatch({ type: 'STOP_ALGORITHM' })
  }
};
const StopAlgorithmButton = connect(stpStopAlgorithmButton, dtpStopAlgorithmButton)(AlgorithmControlButton);



class Graph extends React.Component {

  componentDidMount() {
    window.componentHandler.upgradeElement(this.root);
  }

  componentWillUnmount() {
    window.componentHandler.downgradeElements(this.root);
  }

  render() {
    const classNameRoot = cx(
      'card-wide',
      'mdl-card',
      'mdl-shadow--2dp',
      this.props.className
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
          <StartAlgorithmButton icon="play_arrow" />
          <StopAlgorithmButton icon="pause" />
        </div>
      </div>
    );
  }

}

export default Graph;
