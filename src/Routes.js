import React from 'react';
import { Route, Switch } from "react-router-dom";
import Header from './components/Header/Header';
import Home from './components/Home';
import Login from './components/Login/Login';
import { Context } from './shared/store/Context';

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
    <Header />
      <Switch>
        <Route path="/home" component={Home} />
        <Route exact path="/" component={Login} />
      </Switch>
    </>
  );
};

export default Routes;