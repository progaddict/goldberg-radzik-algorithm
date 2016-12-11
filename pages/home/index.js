import React, { PropTypes } from 'react';
import Layout from '../../components/Layout';
import Button from '../../components/Button';
import s from './styles.css';

import Formula from './Formula';
import AddNewConstraint from './AddNewConstraint';
import Constraints from './Constraints';
import Graph from './Graph';

import DlConstraint from '../../core/logic/DlConstraint';



class HomePage extends React.Component {

  render() {
    const testDlConstraints = [
      new DlConstraint(0, 'x', 'y', true, 1),
      new DlConstraint(1, 'y', 'z', false, -4),
      new DlConstraint(2, 'z', 'x', false, 1),
      new DlConstraint(3, 'a', 'b', false, 2),
      new DlConstraint(4, 'b', 'c', false, -1),
      new DlConstraint(5, 'c', 'd', false, -2),
      new DlConstraint(6, 'e', 'f', false, 3),
      new DlConstraint(7, 'g', 'h', false, 4),
      new DlConstraint(8, 'h', 'k', false, -3),
      new DlConstraint(9, 'k', 'l', false, -4),
    ];
    return (
      <Layout className={s.content}>
        <div className="mdl-grid">
          <Formula dlConstraints={testDlConstraints} className="mdl-cell mdl-cell--6-col mdl-cell--12-col-tablet mdl-cell--12-col-phone" />
          <Graph className="mdl-cell mdl-cell--6-col mdl-cell--12-col-tablet mdl-cell--12-col-phone" />
        </div>
    </Layout>
    );
  }

}

export default HomePage;
