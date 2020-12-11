import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Context } from '../../shared/store/Context';
import InnerNavbar from '../InnerNavbar';
import deleteimg from '../../assets/images/trash.svg';
import Sidebar from '../Sidebar';

const DeleteRole = () => {
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
              <h1>Delete Roles</h1>
              <div>
                {
                  rolData ? 
                    <div className="homepage__maincontent__employees__table">
                      <table>
                        <tbody>
                          <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Delete Role</th>
                          </tr>
                          {
                            Object.keys(rolData).map((data, key) => {
                              return (
                                <tr key={key}>
                                  <td>{rolData[data].name}</td>
                                  <td>{rolData[data].description}</td>
                                  <td className="text-center"><img src={deleteimg} alt="deleteimg" /></td>
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
                      <Link to="/addusers">Please add roles</Link>
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

export default DeleteRole;