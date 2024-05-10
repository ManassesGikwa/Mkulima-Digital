import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

function Home() {
  return (
    <div className="App">
      <NavBar />
      <header className="App-header">
        <h1>Welcome to Mkulima Digital</h1>
      </header>
      <Footer />
    </div>
  );
}

export default Home;

