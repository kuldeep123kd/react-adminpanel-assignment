import React from 'react';
import { Context } from '../../shared/store/Context';
import './Header.scss';

const Header = () => {

  const {DeleteToken, setIsAuthenticated} = React.useContext(Context);

  const logout = () => {
    DeleteToken();
    setIsAuthenticated(false);
  }

  let token = localStorage.getItem("authToken");
  return (
    <nav className="navbar navbar-dark bg-primary">
      <span className="navbar-brand mb-0 h1">Admin Panel</span>
      {
        token && <div>
          <span className="logout" onClick={logout}>Logout</span>
        </div>
      }
    </nav>
  );
}

export default Header;