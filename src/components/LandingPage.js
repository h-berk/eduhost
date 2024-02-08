import React from 'react';
import '../App.css';
import appLogo from '../assets/images/app_logo.png';
import NavBar from './common/NavBar';

function LandingPage() {
  return (
    <div className="App">
      <NavBar/>
      <header className="App-header">
        <div className="App-title">
          <h1>Welcome to</h1>
          <img src={appLogo} alt="App Logo" className="App-logo" />
        </div>
      </header>
    </div>
  );
}
export default LandingPage;