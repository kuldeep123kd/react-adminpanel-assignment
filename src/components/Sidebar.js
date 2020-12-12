import React from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';
import './Home.scss';
import { Context } from '../shared/store/Context';

const Sidebar = () => {

  const {isAuthenticated, handleClose, open} = React.useContext(Context);

  const location = useLocation();

  let token = localStorage.getItem("authToken");

  const hideSidebar = () => {
    setTimeout(() => {
      handleClose();
    }, 50);
  }

  if(isAuthenticated || token) {
    return ( 
      <>
        <div onClick={handleClose} style={{display: open ? "block" : "none"}} className="homepage__sidebar__overlay"></div>
        <div className={`homepage__sidebar ${open ? "homepage__sidebar__active" : "homepage__sidebar__inactive"}`}>
          <div className="homepage__sidebar__logo d-flex align-items-center justify-content-between">
            <Link to="/" >Admin</Link>
            <div className="sidebar__close">
              <span onClick={handleClose}>X</span>
            </div>
          </div>
          <div className="homepage__sidebar__content">
            <div>
              <h1>Employee</h1>
              <ul>
                <li onClick={hideSidebar} className={(location.pathname === '/addusers' ? 'active' : '')}><Link to="/addusers">Add User</Link></li>
                <li onClick={hideSidebar} className={(location.pathname === '/listusers' ? 'active' : '')}><Link to="/listusers">List All users</Link></li>
                <li onClick={hideSidebar} className={(location.pathname === '/deleteusers' ? 'active' : '')}><Link to="/deleteusers">Delete user</Link></li>
              </ul>
            </div>
            <div>
              <h1>Role</h1>
              <ul>
                <li onClick={hideSidebar} className={(location.pathname === '/addroles' ? 'active' : '')}><Link to="/addroles">Add Roles</Link></li>
                <li onClick={hideSidebar} className={(location.pathname === '/listroles' ? 'active' : '')}><Link to="/listroles">List Roles</Link></li>
                <li onClick={hideSidebar} className={(location.pathname === '/deleteroles' ? 'active' : '')}><Link to="/deleteroles">Delete Roles</Link></li>
              </ul>
            </div>
            <div>
              <h1>Organization</h1>
              <ul>
                <li onClick={hideSidebar} className={(location.pathname === '/addorganization' ? 'active' : '')}><Link to="/addorganization">Add Organization</Link></li>
                <li onClick={hideSidebar} className={(location.pathname === '/listorganizations' ? 'active' : '')}><Link to="/listorganizations">List Organization</Link></li>
                <li onClick={hideSidebar} className={(location.pathname === '/deleteorganization' ? 'active' : '')}><Link to="/deleteorganization">Delete Organization</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </>
    );
  }

  return <Redirect to={`/`} />;
}

export default Sidebar;
