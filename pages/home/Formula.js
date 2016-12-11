import React, { PropTypes } from 'react';
import { connect } from 'react-redux'
import Button from '../../components/Button';
import AddNewConstraint from './AddNewConstraint';
import Constraints from './Constraints';
import cx from 'classnames';



class Formula extends React.Component {

  static defaultProps = {
    dlConstraints: [],
    onRemoveAll: PropTypes.func.isRequired
  }

  componentDidMount() {
    window.componentHandler.upgradeElement(this.root);
  }

  componentWillUnmount() {
    window.componentHandler.downgradeElements(this.root);
  }

  render() {
    const { className, onRemoveAll } = this.props;
    const classNameRoot = cx(
      'card-wide',
      'mdl-card',
      'mdl-shadow--2dp',
      className
    );
    return (
      <div ref={node => (this.root = node)} className={classNameRoot}>
        <div className="mdl-card__title">
          <h2 className="mdl-card__title-text">Formula</h2>
        </div>
        <div className="mdl-card__supporting-text">
          <AddNewConstraint />
        </div>
        <div className="mdl-card__actions mdl-card--border">
          <Constraints />
        </div>
        <div className="mdl-card__menu">
          <Button type="mini-fab" colored={true} ripple={true} onClick={() => onRemoveAll()}>
            <i className="material-icons">cancel</i>
          </Button>
        </div>
      </div>
    );
  }

}



const mapDispatchToProps = (dispatch) => {
  return {
    onRemoveAll: () => dispatch({ type: 'REMOVE_ALL_CONSTRAINTS' })
  }
};

export default connect(null, mapDispatchToProps)(Formula);
