import React, { PropTypes } from 'react';
import { connect } from 'react-redux'
import cx from 'classnames';

import Button from '../../components/Button';
import DlConstraint from '../../core/logic/DlConstraint';



class Constraint extends React.Component {

  static propTypes = {
    dlConstraint: PropTypes.object.isRequired,
    onRemove: PropTypes.func.isRequired
  }

  render() {
    const { dlConstraint, onRemove } = this.props;
    return (
      <span className="mdl-chip mdl-chip--deletable">
        <span className="mdl-chip__text">
          {DlConstraint.toString(dlConstraint)}
        </span>
        <button type="button" className="mdl-chip__action" onClick={() => onRemove(dlConstraint)}>
          <i className="material-icons">cancel</i>
        </button>
      </span>
    );
  }

}

const mapDispatchToProps = (dispatch) => {
  return {
    onRemove: (c) => dispatch({ type: 'REMOVE_CONSTRAINT', dlConstraint: c })
  }
};

const ConstraintWrapper = connect(null, mapDispatchToProps)(Constraint);



class Constraints extends React.Component {

  static propTypes = {
    dlConstraints: PropTypes.array.isRequired,
  }

  static defaultProps = {
    dlConstraints: []
  }

  render() {
    const constraints = this.props.dlConstraints.map(c => <ConstraintWrapper key={c.get('id')} dlConstraint={c} />);
    return (
      <div>
        {constraints}
      </div>
    );
  }

}



const mapStateToProps = (state) => {
  return {
    dlConstraints: state.get('dlConstraints').toArray(),
  }
}

export default connect(mapStateToProps)(Constraints);
