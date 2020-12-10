import React from 'react';
import './App.scss';
import Routes from './Routes';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Store } from './shared/store/Store';

function App() {

  return (
    <Store>
      <HelmetProvider >
        <Helmet>
          <meta charSet="utf-8" />
          <title>React admin panel</title>
          <link rel="canonical" href={`/`} />
          <base href={window.location.pathname} target="_blank" />
        </Helmet>
        <Routes />
      </HelmetProvider>
    </Store>
  );
}

export default App;
