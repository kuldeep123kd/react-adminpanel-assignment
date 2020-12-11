import React from 'react';
import { Redirect } from 'react-router-dom';
import { Button, TextField } from '@material-ui/core';
import { Context } from '../../shared/store/Context';
import '../Home.scss';
import Sidebar from '../Sidebar';
import InnerNavbar from '../InnerNavbar';

const initialState = {
  name: '',
  description: '',
  organizationSize: '',
  organizationSizeError: null,
  nameError: null,
  descriptionError: null,
  error: null,
}

const AddOrganization = () => {

  const {isLogout, organizationSubmit} = React.useContext(Context);

  const [addOrganization, setAddOrganization] = React.useState(initialState);

  const formValidation = () => {
    let initialError = {
      organizationSizeError: null,
      nameError: null,
      descriptionError: null,
      error: null,
    }
    if(addOrganization.name === '') {
      initialError.nameError = true;
      initialError.error = true;
    }
    if(addOrganization.description === '') {
      initialError.descriptionError = true;
      initialError.error = true;
    }
    if(addOrganization.organizationSize === '' || addOrganization.organizationSize < 0) {
      initialError.organizationSizeError = true;
      initialError.error = true;
    }

    setAddOrganization({...addOrganization,...initialError});
    return !initialError.error;
  }

  const formSubmit = (e) => {
    e.preventDefault();
    const isValid = formValidation();
    if(isValid) {
      organizationSubmit(addOrganization.name, addOrganization.organizationSize, addOrganization.description);
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
                <h2>Add Organizational Unit</h2>
              </div>
              <form onSubmit={formSubmit} className="homepage__maincontent__addemployees__form">
                <div className="homepage__maincontent__addemployees__form__inputs">
                  <TextField 
                    id="outlined-basic" 
                    label="Name" 
                    type="text"
                    variant="outlined" 
                    value={addOrganization.name}
                    onChange={e => setAddOrganization({...addOrganization,name: e.target.value})}
                  />
                  {
                    addOrganization.nameError && <span className="error">Please enter name</span>
                  }
                </div>
                <div className="homepage__maincontent__addemployees__form__inputs">
                  <TextField 
                    id="outlined-basic" 
                    label="Size of Organization Unit" 
                    type="number"
                    variant="outlined" 
                    value={addOrganization.organizationSize}
                    onChange={e => setAddOrganization({...addOrganization,organizationSize: e.target.value})}
                  />
                  {
                    addOrganization.organizationSizeError && <span className="error">Please enter  size of organization unit</span>
                  }
                </div>
                <div className="homepage__maincontent__addemployees__form__inputs">
                  <TextField 
                    id="outlined-basic" 
                    label="Description" 
                    multiline
                    rows={4}
                    variant="outlined" 
                    value={addOrganization.description}
                    onChange={e => setAddOrganization({...addOrganization,description: e.target.value})}
                  />
                  {
                    addOrganization.descriptionError && <span className="error">Please enter description</span>
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

export default AddOrganization;

