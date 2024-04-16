import React from 'react';
import '../App.css';
import appLogo from '../assets/images/app_logo.png';
import NavBar from './common/NavBar';

function LandingPage() {
  return (
    <div className="App">
      <NavBar/>
      <main className="App-main">
        <div className="App-landing-text">
          <h2>Website Hosting for Students. From Students</h2>
        </div>
      </main>
    </div>
  );
}
export default LandingPage;