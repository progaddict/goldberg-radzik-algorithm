import React, { PropTypes } from 'react';
import Button from '../../components/Button';



class ConstraintRow extends React.Component {
  static propTypes = {
    dlConstraint: PropTypes.object.isRequired,
  }

  render() {
    return (
      <tr>
        <td className="mdl-data-table__cell--non-numeric">
          {this.props.dlConstraint.toString()}
        </td>
        <td>
          <Button type="mini-fab" className="mdl-button--icon" colored={true} ripple={true}>
            <i className="material-icons">delete</i>
          </Button>
        </td>
      </tr>
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
    const rows = this.props.dlConstraints.map(c => <ConstraintRow key={c.id} dlConstraint={c} />);
    return (
      <table className="mdl-data-table mdl-js-data-table mdl-shadow--2dp">
        <tbody>
          {rows}
        </tbody>
      </table>
    );
  }

}

export default Constraints;
