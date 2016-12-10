import React, { PropTypes } from 'react';
import Button from '../../components/Button';



class AddNewConstraint extends React.Component {

  componentDidMount() {
    window.componentHandler.upgradeElement(this.root);
  }

  componentWillUnmount() {
    window.componentHandler.downgradeElements(this.root);
  }

  render() {
    return (
      <table ref={node => (this.root = node)} className="mdl-data-table mdl-js-data-table mdl-shadow--2dp">
        <tbody>
          <tr>
            <td className="mdl-data-table__cell--non-numeric">
              <input name="x" type="text" />
            </td>
            <td>-</td>
            <td className="mdl-data-table__cell--non-numeric">
              <input name="y" type="text" />
            </td>
            <td className="mdl-data-table__cell--non-numeric">
              <select>
                <option value="&#60;">&#60;</option>
                <option value="&#8804;">&#8804;</option>
              </select>
            </td>
            <td>
              <input name="c" type="text" />
            </td>
            <td>
              <Button type="mini-fab" className="mdl-button--icon" colored={true} primary={true} ripple={true} accent={true}>
                <i className="material-icons">add</i>
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }

}

export default AddNewConstraint;
