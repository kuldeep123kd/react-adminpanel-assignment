import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import './Login.scss';
import { Context } from '../../shared/store/Context';
import { Redirect } from 'react-router-dom';
import Header from '../Header/Header';

const initialState = {
  email: '',
  password: '',
  error: null,
  errorMessage: '',
  redirect: false,
  returnSecureToken: true
}

const Login = () => {

  const {Auth, isAuthenticated, loginError} = React.useContext(Context);
  const [login,setLogin] = React.useState(initialState);

  const token = localStorage.getItem("authToken");

  const red = () => {
    if (token) {
      return <Redirect to="/" />
    }
  }

  const formSubmit = (e) => {
    e.preventDefault();
    Auth(login.email, login.password);
  }

  if (isAuthenticated || token) {
    return <Redirect to={`/addusers`} />
  }

  return (
    <>
      {red()}
      <Header />
      <div className="adminlogin">
        <h1>Admin Login</h1>
        <form onSubmit={formSubmit}>
          <small className="error">{loginError}</small>
          <div className="adminlogin__textfield">
            <TextField 
              id="adminlogin__email" 
              required 
              label="Email"
              variant="outlined" 
              value={login.email}
              onChange={e => setLogin({...login,email: e.target.value})}
            />
          </div>
          <div className="adminlogin__textfield">
            <TextField
              id="adminlogin__password"
              label="Password"
              required
              type="password"
              autoComplete="current-password"
              variant="outlined"
              value={login.password}
              onChange={e => setLogin({...login,password: e.target.value})}
            />
          </div>
          <Button className="adminlogin__textfield" type="submit" variant="contained" color="primary">
            Login
          </Button>
        </form>
      </div>
    </>
  );
}

export default Login;