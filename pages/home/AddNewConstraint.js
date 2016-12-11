import React, { PropTypes } from 'react';
import Button from '../../components/Button';
import cx from 'classnames';
import s from './styles.css';



class AddNewConstraint extends React.Component {

  componentDidMount() {
    window.componentHandler.upgradeElement(this.root);
  }

  componentWillUnmount() {
    window.componentHandler.downgradeElements(this.root);
  }

  render() {
    const classNameVariable = cx(
      'mdl-textfield__input',
      s.variable
    );
    const classNameConstant = cx(
      'mdl-textfield__input',
      s.constant
    );
    const classNameSign = cx(
      'mdl-textfield mdl-js-textfield',
      'mdl-textfield--floating-label',
      'getmdl-select',
      'getmdl-select__fix-height',
      s.sign
    );
    return (
      <table ref={node => (this.root = node)}>
        <tbody>
          <tr>
            <td className="mdl-data-table__cell--non-numeric">
              <input name="x" className={classNameVariable} type="text" placeholder="x" />
            </td>
            <td>-</td>
            <td className="mdl-data-table__cell--non-numeric">
              <input name="y" className={classNameVariable} type="text" placeholder="y" />
            </td>
            <td className="mdl-data-table__cell--non-numeric">
              <div className={classNameSign}>
                  <input id="sign" name="sign" className="mdl-textfield__input" type="text" value="&#60;" readOnly={true} tabIndex="-1" />
                  <ul htmlFor="sign" className="mdl-menu mdl-menu--bottom-left mdl-js-menu">
                      <li className="mdl-menu__item" data-val="true">&#60;</li>
                      <li className="mdl-menu__item" data-val="false">&#8804;</li>
                  </ul>
              </div>
            </td>
            <td>
              <input name="c" className={classNameConstant} type="text" placeholder="-3.7" pattern="-?[0-9]*(\.[0-9]+)?" />
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
