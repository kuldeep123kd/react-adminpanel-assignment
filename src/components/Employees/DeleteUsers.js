import React from 'react';
import { Context } from '../../shared/store/Context';
import deleteimg from '../../assets/images/trash.svg';
import './AddEmployees.scss';
import { Link, Redirect } from 'react-router-dom';
import InnerNavbar from '../InnerNavbar';
import Sidebar from '../Sidebar';
import Alert from '@material-ui/lab/Alert';
import { CircularProgress } from '@material-ui/core';

const DeleteUsers = () => {

  const {isLogout} = React.useContext(Context);

  const {employeesData, empData, employeesDelete, dataDelete, setDataDelete, isLoading} = React.useContext(Context);
  let token = localStorage.getItem("authToken");

  React.useEffect(() => {
    employeesData();
  },[employeesData]);

  const deleteUser = (id) => {
    employeesDelete(id);
    setTimeout(() => {
      setDataDelete(false);
    }, 5000);
  }

  if(!isLogout || token) {
    return ( 
      <div className="homepage">
        <Sidebar />
        <div className="homepage__maincontent">
          <InnerNavbar />
          <div className="homepage__maincontent__addemployees">
            {dataDelete && <Alert severity="success">User deleted successfully.</Alert>}
            <div className="homepage__maincontent__employees__table__parent">
            {
                empData ? 
                <>
                  <h1>Delete Users</h1>
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
                            <th>Delete User</th>
                          </tr>
                          {
                            Object.keys(empData).map((data, key) => {
                              return (
                                <tr key={key}>
                                  <td>{empData[data].name}</td>
                                  <td>{empData[data].email}</td>
                                  <td>{empData[data].role}</td>
                                  <td>{empData[data].organization}</td>
                                  <td className="text-center"><img onClick={() => {deleteUser(data)}} src={deleteimg} alt="deleteimg" /></td>
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

export default DeleteUsers;