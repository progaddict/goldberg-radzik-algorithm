import React, { PropTypes } from 'react';
import Button from '../../components/Button';
import AddNewConstraint from './AddNewConstraint';
import Constraints from './Constraints';
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
          <Constraints dlConstraints={this.props.dlConstraints} />
        </div>
        <div className="mdl-card__actions mdl-card--border">
          <AddNewConstraint />
        </div>
        <div className="mdl-card__menu">
          <Button type="mini-fab" colored={true} ripple={true}>
            <i className="material-icons">cancel</i>
          </Button>
        </div>
      </div>
    );
  }

}

export default Formula;
