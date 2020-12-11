import React from 'react';
import { Context } from '../../shared/store/Context';
import './Header.scss';

const Header = () => {

  return (
    <nav className="navbar navbar-dark bg-primary">
      <span className="navbar-brand mb-0 h1">Admin Panel</span>
    </nav>
  );
}

export default Header;