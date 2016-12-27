import React, { PropTypes } from 'react';
import { connect } from 'react-redux'
import Button from '../../components/Button';

import DlConstraint from '../../core/logic/DlConstraint';



class AddNewConstraint extends React.Component {

  static propTypes = {
    onAdd: PropTypes.func.isRequired
  }

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
              <input ref={node => (this.x = node)} className="mdl-textfield__input" style={stylesVariable} type="text" placeholder="x" />
            </td>
            <td>-</td>
            <td className="mdl-data-table__cell--non-numeric">
              <input ref={node => (this.y = node)} className="mdl-textfield__input" style={stylesVariable} type="text" placeholder="y" />
            </td>
            <td className="mdl-data-table__cell--non-numeric">
              <select ref={node => (this.sign = node)}>
                <option value="true">&#60;</option>
                <option value="false">&#8804;</option>
              </select>
            </td>
            <td>
              <input ref={node => (this.c = node)} className="mdl-textfield__input" style={stylesConstant} type="text" placeholder="-3.7" pattern="-?[0-9]*(\.[0-9]+)?" />
            </td>
            <td>
              <Button type="mini-fab" className="mdl-button--icon" colored={true} primary={true} ripple={true} accent={true} onClick={() => this.onAddClick()}>
                <i className="material-icons">add</i>
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }

  onAddClick() {
    const l = (this.x.value || '').trim();
    const r = (this.y.value || '').trim();
    const c = (this.c.value || '').trim();
    if (!l || !r || !c) {
      return;
    }
    const isStrictInequality = (this.sign.value || '').trim().toLowerCase() === 'true';
    const newConstraint = DlConstraint.create(l, r, isStrictInequality, +c);
    this.props.onAdd(newConstraint);
  }

}



const mapDispatchToProps = (dispatch) => {
  return {
    onAdd: (c) => dispatch({ type: 'ADD_CONSTRAINT', dlConstraint: c })
  }
};

export default connect(null, mapDispatchToProps)(AddNewConstraint);
