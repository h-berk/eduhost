import React from 'react';
import '../App.css';
import appLogo from '../assets/images/app_logo.png';
import NavBar from './common/NavBar';

function AboutPage() {
  return (
    <div className="App">
      <NavBar/>
      <header className="App-header">
        <div className="App-title">
        <h1>About</h1>
          <img src={appLogo} alt="App Logo" className="App-logo" />
        </div>
        <div className="About-section">
          <p>
            EduHost is designed to provide an all-in-one website builder and hosting platform for students. 
            Developed by a final year computer science student in SETU Waterford, we aim to make website hosting and building accessible for all students. 
            Whether you have 0 coding experience or have your own static website already built, EduHost is the platform to provide you with the tools and resources to succeed.
          </p>
        </div>
      </header>
    </div>
  );
}

export default AboutPage;