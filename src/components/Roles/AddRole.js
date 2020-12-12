import React from 'react';
import { Redirect } from 'react-router-dom';
import { Button, TextField } from '@material-ui/core';
import { Context } from '../../shared/store/Context';
import '../Home.scss';
import Sidebar from '../Sidebar';
import InnerNavbar from '../InnerNavbar';
import Alert from '@material-ui/lab/Alert';

const initialState = {
  name: '',
  description: '',
  nameError: null,
  descriptionError: null,
  error: null,
}

const AddRole = () => {

  const {isLogout, rolesSubmit, formSuccess, setFormSuccess} = React.useContext(Context);

  const [addRoles, setRoles] = React.useState(initialState);

  const formValidation = () => {
    let initialError = {
      nameError: null,
      descriptionError: null,
      error: null
    }
    if(addRoles.name === '') {
      initialError.nameError = true;
      initialError.error = true;
    }
    if(addRoles.description === '') {
      initialError.descriptionError = true;
      initialError.error = true;
    }

    setRoles({...addRoles,...initialError});
    return !initialError.error;
  }

  const formSubmit = (e) => {
    e.preventDefault();
    const isValid = formValidation();
    if(isValid) {
      rolesSubmit(addRoles.name, addRoles.description);
      setTimeout(() => {
        setFormSuccess(false);
        setRoles({...addRoles,...initialState});
      }, 3000);
    }
  }

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
                {formSuccess && <Alert severity="success">Role added successfully.</Alert>}
                <h2>Add Role</h2>
              </div>
              <form onSubmit={formSubmit} className="homepage__maincontent__addemployees__form">
                <div className="homepage__maincontent__addemployees__form__inputs">
                  <TextField 
                    id="outlined-basic" 
                    label="Name" 
                    type="text"
                    variant="outlined" 
                    value={addRoles.name}
                    onChange={e => setRoles({...addRoles,name: e.target.value})}
                  />
                  {
                    addRoles.nameError && <span className="error">Please enter name</span>
                  }
                </div>
                <div className="homepage__maincontent__addemployees__form__inputs">
                  <TextField 
                    id="outlined-basic" 
                    label="Description" 
                    multiline
                    rows={4}
                    variant="outlined" 
                    value={addRoles.description}
                    onChange={e => setRoles({...addRoles,description: e.target.value})}
                  />
                  {
                    addRoles.descriptionError && <span className="error">Please enter description</span>
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

export default AddRole;

