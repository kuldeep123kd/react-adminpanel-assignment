import React from 'react';
import { Route, Switch } from "react-router-dom";
import ListRole from './components/Roles/ListRole';
import ListOrganization from './components/Organizations/ListOrganization';
import AddOrganization from './components/Organizations/AddOrganization';
import AddRole from './components/Roles/AddRole';
import Login from './components/Login/Login';
import { Context } from './shared/store/Context';
import ListUsers from './components/Employees/ListUsers';
import DeleteUsers from './components/Employees/DeleteUsers';
import AddUsers from './components/Employees/AddUsers';
import DeleteRole from './components/Roles/DeleteRole';
import DeleteOrganization from './components/Organizations/DeleteOrganization';

const Routes = () => {

  const {DeleteToken, setIsAuthenticated} = React.useContext(Context);

  let token = localStorage.getItem("authToken");
  React.useEffect(() => {
    let expireationTime = localStorage.getItem("expirationTime");
    if(token) {
      setTimeout(() => {
        DeleteToken();
        setIsAuthenticated(false);
      }, expireationTime * 1000);
    }
  },[DeleteToken, token, setIsAuthenticated]);

  return (
    <>
      <Switch>
        <Route path="/listusers" component={ListUsers} />
        <Route path="/deleteusers" component={DeleteUsers} />
        <Route path="/deleteroles" component={DeleteRole} />
        <Route path="/deleteorganization" component={DeleteOrganization} />
        <Route path="/listroles" component={ListRole} />
        <Route path="/listorganizations" component={ListOrganization} />
        <Route path="/addusers" component={AddUsers} />
        <Route path="/addroles" component={AddRole} />
        <Route path="/addorganization" component={AddOrganization} />
        <Route exact path="/" component={Login} />
      </Switch>
    </>
  );
};

export default Routes;