import React, { PropTypes } from 'react';
import Button from '../../components/Button';
import cx from 'classnames';



class Constraint extends React.Component {

  static propTypes = {
    dlConstraint: PropTypes.object.isRequired
  }

  render() {
    return (
      <span className="mdl-chip mdl-chip--deletable">
        <span className="mdl-chip__text">
          {this.props.dlConstraint.toString()}
        </span>
        <button type="button" className="mdl-chip__action">
          <i className="material-icons">cancel</i>
        </button>
      </span>
    );
  }

}



class Constraints extends React.Component {

  static propTypes = {
    dlConstraints: PropTypes.array,
  }

  static defaultProps = {
    dlConstraints: []
  }

  render() {
    const rows = this.props.dlConstraints.map(c => <Constraint key={c.id} dlConstraint={c} />);
    return (
      <div>
        {rows}
      </div>
    );
  }

}

export default Constraints;
