import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Context } from '../../shared/store/Context';
import InnerNavbar from '../InnerNavbar';
import Sidebar from '../Sidebar';

const ListOrganization = () => {
  const {isLogout, organizationData, organsData} = React.useContext(Context);
  let token = localStorage.getItem("authToken");

  React.useEffect(() => {
    organizationData();
  },[]);

  if(!isLogout || token) {
    return (
      <div>
        <div className="homepage">
          <Sidebar />
          <div className="homepage__maincontent">
            <InnerNavbar />
            <div className="homepage__maincontent__addemployees">
              <h1>Organization List</h1>
              <div>
                {
                  organsData ? 
                    <div className="homepage__maincontent__employees__table">
                      <table>
                        <tbody>
                          <tr>
                            <th>Name</th>
                            <th>Size of Organization Unit</th>
                            <th>Description</th>
                          </tr>
                          {
                            Object.keys(organsData).map((data, key) => {
                              return (
                                <tr key={key}>
                                  <td>{organsData[data].name}</td>
                                  <td>{organsData[data].organizationSize}</td>
                                  <td>{organsData[data].description}</td>
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
                      <Link to="/addorganization">Please add organization</Link>
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

export default ListOrganization;