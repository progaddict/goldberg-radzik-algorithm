import React, { PropTypes } from 'react';
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
          <svg ref={node => (this.svg = node)}>
            <polygon points="100,10 40,198 190,78 10,78 160,198" style={{'fill': 'lime', 'stroke': 'purple', 'strokeWidth': 5, 'fillRule': 'nonzero'}} />
            Sorry, your browser does not support inline SVG.
          </svg>
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
