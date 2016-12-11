import React, { PropTypes } from 'react';
import AddNewConstraint from './AddNewConstraint';
import cx from 'classnames';



class Formula extends React.Component {

  static propTypes = {
    dlConstraints: PropTypes.array
  }

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
    const classNameRoot = cx(
      'card-wide',
      'mdl-card',
      'mdl-shadow--2dp',
      this.props.className
    );
    return (
      <div ref={node => (this.root = node)} className={classNameRoot}>
        <div className="mdl-card__title">
          <h2 className="mdl-card__title-text">Formula</h2>
        </div>
        <div className="mdl-card__supporting-text">
          {this.getFormulaString(this.props.dlConstraints)}
        </div>
        <div className="mdl-card__actions mdl-card--border">
          <AddNewConstraint />
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>
      </div>
    );
  }

  getFormulaString(dlConstraints) {
    let result = dlConstraints.map(c => `(${c.toString()})`);
    return result.join(' \u{2227} ');
  }

}

export default Formula;
