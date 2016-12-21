import React, { PropTypes } from 'react';
import Layout from '../../components/Layout';
import Button from '../../components/Button';
import s from './styles.css';

import Formula from './Formula';
import AddNewConstraint from './AddNewConstraint';
import Constraints from './Constraints';
import GraphCard from './GraphCard';
import AlgorithmHistory from './AlgorithmHistory';

import DlConstraint from '../../core/logic/DlConstraint';



class HomePage extends React.Component {

  render() {
    return (
      <Layout className={s.content}>
        <div className="mdl-grid">
          <Formula className="mdl-cell mdl-cell--12-col" />
          <GraphCard className="mdl-cell mdl-cell--12-col" />
          <AlgorithmHistory className="mdl-cell mdl-cell--12-col" />
        </div>
      </Layout>
    );
  }

}

export default HomePage;
