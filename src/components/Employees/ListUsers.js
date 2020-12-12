import React from 'react';
import { Context } from '../../shared/store/Context';
import './AddEmployees.scss';
import { Link, Redirect } from 'react-router-dom';
import InnerNavbar from '../InnerNavbar';
import Sidebar from '../Sidebar';
import { CircularProgress } from '@material-ui/core';

const ListUsers = () => {

  const {isLogout} = React.useContext(Context);

  const {employeesData, empData, isLoading} = React.useContext(Context);
  let token = localStorage.getItem("authToken");

  React.useEffect(() => {
    employeesData();
  },[employeesData]);

  if(!isLogout || token) {
    return ( 
      <div className="homepage">
        <Sidebar />
        <div className="homepage__maincontent">
          <InnerNavbar />
          <div className="homepage__maincontent__addemployees">
            <div className="homepage__maincontent__employees__table__parent">
              {
                empData ? 
                  <>
                    <h1>Users List</h1>
                    <div className="homepage__maincontent__employees__table">
                    {
                      !isLoading ? (
                        <table>
                          <tbody>
                            <tr>
                              <th>Name</th>
                              <th>Email</th>
                              <th>Role</th>
                              <th>Organization</th>
                            </tr>
                            {
                              Object.keys(empData).map((data, key) => {
                                return (
                                  <tr key={key}>
                                    <td>{empData[data].name}</td>
                                    <td>{empData[data].email}</td>
                                    <td>{empData[data].role}</td>
                                    <td>{empData[data].organization}</td>
                                  </tr>
                                )
                              }) 
                            }
                          </tbody>
                        </table>
                      )
                      :
                      (
                        <div className="progress__loader">
                          <CircularProgress />
                        </div>
                      )
                    }
                    </div>
                  </>
                  
                :
                  <div className='homepage__maincontent__addemployees__users__notfound'>
                    <h2>Data not found</h2>
                    <Link to="/addusers">Please add users</Link>
                  </div>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }

    return <Redirect to={`/`} />;
}

export default ListUsers;