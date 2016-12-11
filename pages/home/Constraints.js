import React, { PropTypes } from 'react';
import { connect } from 'react-redux'
import Button from '../../components/Button';
import cx from 'classnames';



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
          { dlConstraint.toString() }
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
    dlConstraints: PropTypes.array,
  }

  static defaultProps = {
    dlConstraints: []
  }

  render() {
    const rows = this.props.dlConstraints.map(c => <ConstraintWrapper key={c.id} dlConstraint={c} />);
    return (
      <div>
        { rows }
      </div>
    );
  }

}



const mapStateToProps = (state) => {
  return {
    dlConstraints: state.dlConstraints
  }
}

export default connect(mapStateToProps)(Constraints);
