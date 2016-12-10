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
      new DlConstraint(2, 'z', 'x', false, 3),
    ];
    return (
      <Layout className={s.content}>
        <div className="mdl-grid">
          <div className="mdl-cell mdl-cell--12-col">
            <Formula dlConstraints={testDlConstraints} />
          </div>
        </div>
        <div className="mdl-grid">
          <div className="mdl-cell mdl-cell--4-col">
            <AddNewConstraint />
            <Constraints dlConstraints={testDlConstraints} />
          </div>
          <div className="mdl-cell mdl-cell--8-col">
            <Graph />
          </div>
        </div>
    </Layout>
    );
  }

}

export default HomePage;
