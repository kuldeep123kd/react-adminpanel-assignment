import React from 'react';
import { Redirect } from 'react-router-dom';
import logo from '../logo.svg';
import './Home.scss';
import { Context } from '../shared/store/Context';

const Home = () => {

  const {isSignin} = React.useContext(Context);

  let token = localStorage.getItem("authToken");

  if(isSignin || token) {
    return ( 
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }

  return <Redirect to={`/`} />;
}

export default Home;
