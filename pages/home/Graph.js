import React, { PropTypes } from 'react';
import { Sigma, RandomizeNodePositions, RelativeSize } from 'react-sigmajs';
import Button from '../../components/Button';
import cx from 'classnames';



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
          <Sigma graph={{nodes:[{id:"n1", label:"Alice"}, {id:"n2", label:"Rabbit"}], edges:[{id:"e1",source:"n1",target:"n2",label:"SEES"}]}} settings={{drawEdges:true}}>
            <RelativeSize initialSize={15}/>
            <RandomizeNodePositions/>
          </Sigma>
        </div>
        <div className="mdl-card__menu">
          <Button type="mini-fab" colored={true} primary={true} ripple={true} accent={true}>
            <i className="material-icons">play_arrow</i>
          </Button>
          <Button type="mini-fab" colored={true} primary={true} ripple={true} accent={true} disabled={true}>
            <i className="material-icons">pause</i>
          </Button>
        </div>
      </div>
    );
  }

}

export default Graph;
