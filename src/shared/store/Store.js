
import Axios from "axios";
import React from "react";
import { Context } from './Context';

export const Store = props => {

  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [loginError, setLoginError] = React.useState(false);

  const Auth = (email, password) => {

    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    };
    Axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_API_KEY}`,authData)
      .then(response => {
        console.log(response);
        if(response.status === 200) {
          localStorage.setItem("authToken", response.data.idToken);
          localStorage.setItem("expirationTime", response.data.expiresIn);
          setIsAuthenticated(true);
        }
      })
      .catch(err => {
        console.log(err.response);
        if(err.response.data.error.message === "EMAIL_NOT_FOUND") {
          setLoginError("Email not found.");
        } 
        else if(err.response.data.error.message === "INVALID_PASSWORD") {
          setLoginError("Invalid credentials entered");
        }
      });
  };

  const DeleteToken = () => {
    let token = localStorage.getItem("authToken");
    if (token) {
      localStorage.clear();
    }
  }

  return (
    <Context.Provider value={{Auth, setIsAuthenticated, isAuthenticated, DeleteToken, loginError}}> 
      {props.children}
    </Context.Provider>
  );
};