import React, { PropTypes } from 'react';
import Button from '../../components/Button';
import cx from 'classnames';



class AlgorithmHistory extends React.Component {

  componentDidMount() {
    window.componentHandler.upgradeElement(this.root);
  }

  componentWillUnmount() {
    window.componentHandler.downgradeElements(this.root);
  }

  render() {
    const classNameRoot = cx(
      'card-wide',
      'mdl-card',
      'mdl-shadow--2dp',
      this.props.className
    );
    return (
      <div ref={node => (this.root = node)} className={classNameRoot}>
        <div className="mdl-card__title">
          <h2 className="mdl-card__title-text">History</h2>
        </div>
        <div className="mdl-card__supporting-text">
          history
        </div>
      </div>
    );
  }

}

export default AlgorithmHistory;
