import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Context } from '../../shared/store/Context';
import InnerNavbar from '../InnerNavbar';
import Sidebar from '../Sidebar';

const ListRole = () => {
  const {isLogout, roleData, rolData} = React.useContext(Context);
  let token = localStorage.getItem("authToken");

  React.useEffect(() => {
    roleData();
  },[]);

  if(!isLogout || token) {
    return (
      <div>
        <div className="homepage">
          <Sidebar />
          <div className="homepage__maincontent">
            <InnerNavbar />
            <div className="homepage__maincontent__addemployees">
              <h1>Roles List</h1>
              <div>
                {
                  rolData ? 
                    <div className="homepage__maincontent__employees__table">
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
                    </div>
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