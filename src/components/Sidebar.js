import React from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';
import './Home.scss';
import { Context } from '../shared/store/Context';

const Sidebar = () => {

  const {isAuthenticated} = React.useContext(Context);

  const location = useLocation();

  let token = localStorage.getItem("authToken");

  if(isAuthenticated || token) {
    return ( 
      <div className="homepage__sidebar">
        <div className="homepage__sidebar__logo">
          <Link to="/" >Admin</Link>
        </div>
        <div className="homepage__sidebar__content">
          <div>
            <h1>Employee</h1>
            <ul>
              <li className={(location.pathname === '/addusers' ? 'active' : '')}><Link to="/addusers">Add User</Link></li>
              <li className={(location.pathname === '/listusers' ? 'active' : '')}><Link to="/listusers">List All users</Link></li>
              <li className={(location.pathname === '/deleteusers' ? 'active' : '')}><Link to="/deleteusers">Delete user</Link></li>
            </ul>
          </div>
          <div>
            <h1>Role</h1>
            <ul>
              <li className={(location.pathname === '/addroles' ? 'active' : '')}><Link to="/addroles">Add Roles</Link></li>
              <li className={(location.pathname === '/listroles' ? 'active' : '')}><Link to="/listroles">List Roles</Link></li>
              <li className={(location.pathname === '/deleteroles' ? 'active' : '')}><Link to="/deleteroles">Delete Roles</Link></li>
            </ul>
          </div>
          <div>
            <h1>Organization</h1>
            <ul>
              <li className={(location.pathname === '/addorganization' ? 'active' : '')}><Link to="/addorganization">Add Organization</Link></li>
              <li className={(location.pathname === '/listorganizations' ? 'active' : '')}><Link to="/listorganizations">List Organization</Link></li>
              <li className={(location.pathname === '/deleteorganization' ? 'active' : '')}><Link to="/deleteorganization">Delete Organization</Link></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return <Redirect to={`/`} />;
}

export default Sidebar;
