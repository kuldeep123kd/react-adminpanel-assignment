import { CircularProgress } from '@material-ui/core';
import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Context } from '../../shared/store/Context';
import InnerNavbar from '../InnerNavbar';
import Sidebar from '../Sidebar';

const ListRole = () => {
  const {isLogout, roleData, rolData, isLoading} = React.useContext(Context);
  let token = localStorage.getItem("authToken");

  React.useEffect(() => {
    roleData();
  },[roleData]);

  if(!isLogout || token) {
    return (
      <div>
        <div className="homepage">
          <Sidebar />
          <div className="homepage__maincontent">
            <InnerNavbar />
            <div className="homepage__maincontent__addemployees">
              <div className="homepage__maincontent__employees__table__parent">
                {
                  rolData ? 
                  <>
                    <h1>Roles List</h1>
                    <div className="homepage__maincontent__employees__table">
                    {
                      !isLoading ? (
                        <table>
                          <tbody>
                            <tr>
                              <th>Name</th>
                              <th>Description</th>
                            </tr>
                            {
                              Object.keys(rolData).map((data, key) => {
                                return (
                                  <tr key={key}>
                                    <td>{rolData[data].name}</td>
                                    <td>{rolData[data].description}</td>
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
                      <Link to="/addroles">Please add roles</Link>
                    </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <Redirect to={`/`} />;
}

export default ListRole;