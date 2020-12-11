
import Axios from "axios";
import React from "react";
import { Context } from './Context';

export const Store = props => {

  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [isLogout, setIsLogout] = React.useState(false);
  const [loginError, setLoginError] = React.useState(false);
  const [empData, setEmpData] = React.useState([]);
  const [rolData, setRolData] = React.useState([]);
  const [organsData, setOrgansData] = React.useState([]);

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

  const employeesSubmit = (name, email, role, organization) => {
    let token = localStorage.getItem("authToken");
    const employeesData = {
      name: name,
      email: email,
      role: role,
      organization: organization
    };
    if(token) {
      Axios.post(`${process.env.REACT_APP_DATABASEURL}/employees.json?auth=` + token, employeesData)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err.response);
      })
    }
  }

  const employeesData = () => {
    let token = localStorage.getItem("authToken");
    if(token) {
      Axios.get(`${process.env.REACT_APP_DATABASEURL}/employees.json?auth=` + token)
      .then(res => {
          if (res.status === 200) {
            const data = res.data;
            setEmpData(data);
          }
      })
      .catch(err => {
        console.log(err.response);
        if (err.response.status === 401) {
          DeleteToken();
        }
      })
    }
  }

  const rolesSubmit = (name, description) => {
    let token = localStorage.getItem("authToken");
    const rolesData = {
      name: name,
      description: description,
    };
    if(token) {
      Axios.post(`${process.env.REACT_APP_DATABASEURL}/roles.json?auth=` + token, rolesData)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err.response);
      })
    }
  }

  const roleData = () => {
    let token = localStorage.getItem("authToken");
    if(token) {
      Axios.get(`${process.env.REACT_APP_DATABASEURL}/roles.json?auth=` + token)
      .then(res => {
        if (res.status === 200) {
          const data = res.data;
          setRolData(data);
        }
      })
      .catch(err => {
        console.log(err.response);
      })
    }
  }

  const organizationSubmit = (name, organizationSize, description) => {
    let token = localStorage.getItem("authToken");
    const organizationData = {
      name: name,
      organizationSize: organizationSize,
      description: description,
    };
    if(token) {
      Axios.post(`${process.env.REACT_APP_DATABASEURL}/organizations.json?auth=` + token, organizationData)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err.response);
      })
    }
  }

  const organizationData = () => {
    let token = localStorage.getItem("authToken");
    if(token) {
      Axios.get(`${process.env.REACT_APP_DATABASEURL}/organizations.json?auth=` + token)
      .then(res => {
        if (res.status === 200) {
          const data = res.data;
          setOrgansData(data);
        }
      })
      .catch(err => {
        console.log(err.response);
      })
    }
  }

  return (
    <Context.Provider value={{Auth, setIsAuthenticated, isAuthenticated, DeleteToken, loginError, employeesSubmit, setIsLogout, isLogout, employeesData, empData, rolesSubmit, roleData, rolData, organizationSubmit, organizationData, organsData}}> 
      {props.children}
    </Context.Provider>
  );
};