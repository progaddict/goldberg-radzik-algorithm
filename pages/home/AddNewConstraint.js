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
    const stylesVariable = {
      minWidth: '35px',
      maxWidth: '35px',
      textAlign: 'center'
    };
    const stylesConstant = {
      minWidth: '70px',
      maxWidth: '70px',
      textAlign: 'center'
    };
    return (
      <table ref={node => (this.root = node)}>
        <tbody>
          <tr>
            <td className="mdl-data-table__cell--non-numeric">
              <input name="x" className="mdl-textfield__input" style={stylesVariable} type="text" placeholder="x" />
            </td>
            <td>-</td>
            <td className="mdl-data-table__cell--non-numeric">
              <input name="y" className="mdl-textfield__input" style={stylesVariable} type="text" placeholder="y" />
            </td>
            <td className="mdl-data-table__cell--non-numeric">
              <select>
                <option value="true">&#60;</option>
                <option value="false">&#8804;</option>
              </select>
            </td>
            <td>
              <input name="c" className="mdl-textfield__input" style={stylesConstant} type="text" placeholder="-3.7" pattern="-?[0-9]*(\.[0-9]+)?" />
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
