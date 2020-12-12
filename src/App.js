import React from 'react';
import './App.scss';
import Routes from './Routes';
import { Store } from './shared/store/Store';

function App() {

  return (
    <Store>
      <Routes />
    </Store>
  );
}

export default App;
