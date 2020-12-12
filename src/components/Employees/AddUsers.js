import React from 'react';
import { Redirect } from 'react-router-dom';
import { Button, MenuItem, TextField } from '@material-ui/core';
import { Context } from '../../shared/store/Context';
import '../Home.scss';
import Sidebar from '../Sidebar';
import InnerNavbar from '../InnerNavbar';
import Alert from '@material-ui/lab/Alert';

const initialState = {
  email: '',
  name: '',
  organization: '',
  role: '',
  nameError: null,
  emailError: null,
  organizationError: null,
  roleError: null,
  error: null,
}

const AddUsers = () => {

  const {isLogout, rolData, employeesSubmit, organsData, organizationData, roleData, formSuccess, setFormSuccess} = React.useContext(Context);

  const [addEmployess, setAddEmployees] = React.useState(initialState);

  const handleChange = (event) => {
    setAddEmployees({...addEmployess, role: event.target.value})
  };
  const handleChange1 = (event) => {
    setAddEmployees({...addEmployess, organization: event.target.value})
  };

  let emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const formValidation = () => {
    let initialError = {
      emailError: null,
      nameError: null,
      roleError: null,
      organizationError: null,
      error: null
    }
    if(!emailReg.test(addEmployess.email)) {
      initialError.emailError = true;
      initialError.error = true;
    }
    if(addEmployess.name === '') {
      initialError.nameError = true;
      initialError.error = true;
    }
    if(addEmployess.role === '') {
      initialError.roleError = true;
      initialError.error = true;
    }
    if(addEmployess.organization === '') {
      initialError.organizationError = true;
      initialError.error = true;
    }

    setAddEmployees({...addEmployess,...initialError});
    return !initialError.error;
  }

  const formSubmit = (e) => {
    e.preventDefault();
    const isValid = formValidation();
    if(isValid) {
      employeesSubmit(addEmployess.name, addEmployess.email, addEmployess.role, addEmployess.organization);
      setTimeout(() => {
        setFormSuccess(false);
        setAddEmployees({...addEmployess,...initialState});
      }, 3000);
    }
  }

  React.useEffect(() => {
    organizationData();
    roleData();
  },[organizationData, roleData]);

  let token = localStorage.getItem("authToken");

  if(!isLogout || token) {
    return ( 
      <div className="homepage">
        <Sidebar />
        <div className="homepage__maincontent">
          <InnerNavbar />
          <div className="homepage__maincontent__addemployees">
            <div>
              <div className="homepage__maincontent__addemployees__heading">
                {formSuccess && <Alert severity="success">User added successfully.</Alert>}
                <h2>Add User</h2>
              </div>
              <form onSubmit={formSubmit} className="homepage__maincontent__addemployees__form">
                <div className="homepage__maincontent__addemployees__form__inputs">
                  <TextField 
                    id="outlined-basic" 
                    label="Name" 
                    type="text"
                    variant="outlined" 
                    value={addEmployess.name}
                    onChange={e => setAddEmployees({...addEmployess,name: e.target.value})}
                  />
                  {
                    addEmployess.nameError && <span className="error">Please enter name</span>
                  }
                </div>
                <div className="homepage__maincontent__addemployees__form__inputs">
                  <TextField 
                    id="outlined-basic" 
                    label="Email" 
                    type="email" 
                    variant="outlined" 
                    value={addEmployess.email}
                    onChange={e => setAddEmployees({...addEmployess,email: e.target.value})}
                  />
                  {
                    addEmployess.emailError && <span className="error">Please enter valid email address</span>
                  }
                </div>
                <div className="homepage__maincontent__addemployees__form__inputs">
                  <TextField
                    id="outlined-select-currency"
                    select
                    label="Select"
                    value={addEmployess.role}
                    onChange={handleChange}
                    helperText="Please select role"
                    variant="outlined"
                  >
                    {
                      rolData ? 
                      Object.keys(rolData).map((option, key) => (
                        <MenuItem key={key} value={rolData[option].name}>
                          {rolData[option].name}
                        </MenuItem>
                      ))
                      :
                      <MenuItem value="demo">
                        {"demo"}
                      </MenuItem>
                    }
                  </TextField>
                  {
                    addEmployess.roleError && <span className="error">Please select role</span>
                  }
                </div>
                <div className="homepage__maincontent__addemployees__form__inputs">
                  <TextField
                    id="outlined-select-currency"
                    select
                    label="Select"
                    value={addEmployess.organization}
                    onChange={handleChange1}
                    helperText="Please select organization"
                    variant="outlined"
                  >
                    {
                      organsData ? 
                      Object.keys(organsData).map((option, key) => (
                        <MenuItem key={key} value={organsData[option].name}>
                          {organsData[option].name}
                        </MenuItem>
                      ))
                      :
                      <MenuItem value="demo">
                        {"demo"}
                      </MenuItem>
                    }
                  </TextField>
                  {
                    addEmployess.organizationError && <span className="error">Please select organization</span>
                  }
                </div>
                <div className="homepage__maincontent__addemployees__form__inputs text-center">
                  <Button className="adminlogin__textfield" type="submit" variant="contained" color="primary">
                    Submit
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <Redirect to={`/`} />;
}

export default AddUsers;

