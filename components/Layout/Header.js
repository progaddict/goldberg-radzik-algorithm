import React from 'react';
import Link from '../Link';
import s from './Header.css';

class Header extends React.Component {

  componentDidMount() {
    window.componentHandler.upgradeElement(this.root);
  }

  componentWillUnmount() {
    window.componentHandler.downgradeElements(this.root);
  }

  render() {
    return (
      <header className={`mdl-layout__header ${s.header}`} ref={node => (this.root = node)}>
        <div className={`mdl-layout__header-row ${s.row}`}>
          <span className={`mdl-layout-title ${s.title}`} to="/">
            Goldberg-Radzik Algorithm
          </span>
          <div className="mdl-layout-spacer"></div>
        </div>
      </header>
    );
  }

}

export default Header;
