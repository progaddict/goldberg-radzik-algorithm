import React, { PropTypes } from 'react';



class Formula extends React.Component {

  static propTypes = {
    dlConstraints: PropTypes.array,
  };

  static defaultProps = {
    dlConstraints: []
  }

  componentDidMount() {
    window.componentHandler.upgradeElement(this.root);
  }

  componentWillUnmount() {
    window.componentHandler.downgradeElements(this.root);
  }

  render() {
    return (
      <div ref={node => (this.root = node)}>
        {this.getFormulaString(this.props.dlConstraints)}
      </div>
    );
  }

  getFormulaString(dlConstraints) {
    let result = dlConstraints.map(c => `(${c.toString()})`);
    return result.join(' and ');
  }

}

export default Formula;
