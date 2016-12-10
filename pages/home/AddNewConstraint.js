import React, { PropTypes } from 'react';
import Button from '../../components/Button';
import cx from 'classnames';
import s from './styles.css';

//import 'getmdl-select/getmdl-select.min';
//import * as selectStyles from 'getmdl-select/getmdl-select.min.css';



class AddNewConstraint extends React.Component {

  componentDidMount() {
    window.componentHandler.upgradeElement(this.root);
  }

  componentWillUnmount() {
    window.componentHandler.downgradeElements(this.root);
  }

  render() {
    const classNameTable = cx(
      'mdl-data-table',
      'mdl-js-data-table mdl-shadow--2dp',
      s['add-new-constraint']
    );
    const classNameVariable = cx(
      'mdl-textfield__input',
      s.variable
    );
    const classConstant = cx(
      'mdl-textfield__input',
      s.constant
    );
    return (
      <table ref={node => (this.root = node)} className={classNameTable}>
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

              <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label getmdl-select getmdl-select__fix-height">
                  <input className="mdl-textfield__input" type="text" id="sample2" value="Belarus" readOnly={true} tabIndex="-1" />
                  <label htmlFor="sample2">
                      <i className="mdl-icon-toggle__label material-icons">keyboard_arrow_down</i>
                  </label>
                  <label htmlFor="sample2" className="mdl-textfield__label">Country</label>
                  <ul htmlFor="sample2" className="mdl-menu mdl-menu--bottom-left mdl-js-menu">
                      <li className="mdl-menu__item" data-val="DE">Germany</li>
                      <li className="mdl-menu__item" data-val="BY">Belarus</li>
                      <li className="mdl-menu__item" data-val="RU">Russia</li>
                  </ul>
              </div>

            </td>
            <td>
              <input name="c" className={classConstant} type="text" placeholder="-3.7" />
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
