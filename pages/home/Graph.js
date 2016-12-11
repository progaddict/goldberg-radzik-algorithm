import React, { PropTypes } from 'react';
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
      this.props.className
    );
    return (
      <svg ref={node => (this.root = node)} className={classNameRoot}>
        <polygon points="100,10 40,198 190,78 10,78 160,198" style={{'fill': 'lime', 'stroke': 'purple', 'strokeWidth': 5, 'fillRule': 'nonzero'}} />
        Sorry, your browser does not support inline SVG.
      </svg>
    );
  }

}

export default Graph;
