
import Axios from "axios";
import React from "react";
import { Context } from './Context';

export const Store = props => {

  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [isLogout, setIsLogout] = React.useState(false);
  const [loginError, setLoginError] = React.useState(false);
  const [dataDelete, setDataDelete] = React.useState(false);
  const [formSuccess, setFormSuccess] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [empData, setEmpData] = React.useState([]);
  const [rolData, setRolData] = React.useState([]);
  const [organsData, setOrgansData] = React.useState([]);

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  }

  const handleToggle = () => {
    setOpen(!open);
  };

  const Auth = (email, password) => {

    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    };
    Axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_API_KEY}`,authData)
      .then(response => {
        if(response.status === 200) {
          localStorage.setItem("authToken", response.data.idToken);
          localStorage.setItem("expirationTime", response.data.expiresIn);
          setIsAuthenticated(true);
        }
      })
      .catch(err => {
        if(err.response?.data.error.message === "EMAIL_NOT_FOUND") {
          setLoginError("Email not found.");
        } 
        else if(err.response?.data.error.message === "INVALID_PASSWORD") {
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
        setFormSuccess(true);
      })
      .catch(err => {
        if (err.response?.status === 401) {
          DeleteToken();
          setIsLogout(true);
          setIsAuthenticated(false);
        }
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
            setIsLoading(false);
          }
      })
      .catch(err => {
        if (err.response?.status === 401) {
          DeleteToken();
          setIsLogout(true);
          setIsAuthenticated(false);
          setIsLoading(false);
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
        setFormSuccess(true);
      })
      .catch(err => {
        if (err.response?.status === 401) {
          DeleteToken();
          setIsLogout(true);
          setIsAuthenticated(false);
        }
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
          setIsLoading(false);
        }
      })
      .catch(err => {
        if (err.response?.status === 401) {
          DeleteToken();
          setIsLogout(true);
          setIsAuthenticated(false);
        }
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
        setFormSuccess(true);
      })
      .catch(err => {
        if (err.response?.status === 401) {
          DeleteToken();
          setIsLogout(true);
          setIsAuthenticated(false);
        }
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
          setIsLoading(false);
        }
      })
      .catch(err => {
        if (err.response?.status === 401) {
          DeleteToken();
          setIsLogout(true);
          setIsAuthenticated(false);
        }
      })
    }
  }

  const employeesDelete = (id) => {
    let token = localStorage.getItem("authToken");

    if(token) {
      Axios.delete(`${process.env.REACT_APP_DATABASEURL}/employees/${id}.json?auth=` + token,)
      .then(res => {
          if (res.status === 200) {
            setDataDelete(true);
          }
      })
      .catch(err => {
        if (err.response?.status === 401) {
          DeleteToken();
          setIsLogout(true);
          setIsAuthenticated(false);
        }
      })
    }
  }

  const rolesDelete = (id) => {
    let token = localStorage.getItem("authToken");

    if(token) {
      Axios.delete(`${process.env.REACT_APP_DATABASEURL}/roles/${id}.json?auth=` + token,)
      .then(res => {
          if (res.status === 200) {
            setDataDelete(true);
          }
      })
      .catch(err => {
        if (err.response?.status === 401) {
          DeleteToken();
          setIsLogout(true);
          setIsAuthenticated(false);
        }
      })
    }
  }

  const organizationDelete = (id) => {
    let token = localStorage.getItem("authToken");

    if(token) {
      Axios.delete(`${process.env.REACT_APP_DATABASEURL}/organizations/${id}.json?auth=` + token,)
      .then(res => {
          if (res.status === 200) {
            setDataDelete(true);
          }
      })
      .catch(err => {
        if (err.response?.status === 401) {
          DeleteToken();
          setIsLogout(true);
          setIsAuthenticated(false);
        }
      })
    }
  }

  return (
    <Context.Provider value={{
        Auth, setIsAuthenticated, isAuthenticated, 
        DeleteToken, loginError, employeesSubmit, 
        setIsLogout, isLogout, employeesData, 
        empData, rolesSubmit, roleData, rolData, 
        organizationSubmit, organizationData, organsData, 
        employeesDelete, dataDelete, organizationDelete, 
        rolesDelete, setDataDelete, formSuccess, setFormSuccess,
        setOpen, open, handleClose, handleToggle, setIsLoading,
        isLoading
      }}> 
      {props.children}
    </Context.Provider>
  );
};