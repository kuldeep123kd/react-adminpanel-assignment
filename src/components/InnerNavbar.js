import React from 'react';
import { Redirect } from 'react-router-dom';
import './Home.scss';
import { Context } from '../shared/store/Context';

const InnerNavbar = () => {

  const {isAuthenticated, DeleteToken, setIsAuthenticated, setIsLogout, handleToggle, open} = React.useContext(Context);

  const logout = () => {
    DeleteToken();
    setIsAuthenticated(false);
    setIsLogout(true);
  }

  let token = localStorage.getItem("authToken");

  if(isAuthenticated || token) {
    return ( 
      <nav className="navbar navbar-dark bg-primary header__padding header__position">
        <div className={`navbar-toggler header__navbar__menu--btn ${open ? "open" : "" } `} onClick={handleToggle} >
          <div className="header__navbar__menu--btn__icon"></div>
        </div>
        {
          token && <div className="ml-auto">
            <span className="logout" onClick={logout}>Logout</span>
          </div>
        }
      </nav>
    );
  }

  return <Redirect to={`/`} />;
}

export default InnerNavbar;
