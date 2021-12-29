import React from 'react';

import Router from './Router';
import "./assets/reset.css";
import "./assets/styles.css";
import {Footer, Header} from './components/Header';

function App() {
  return (
    <>
      <Header />
      <main className='main'>
        <Router />
      </main>
      <Footer />
    </>
  );
}

export default App;
