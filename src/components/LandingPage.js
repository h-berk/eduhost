import React from 'react';
import '../App.css';
import appLogo from '../assets/images/app_logo.png';
import NavBar from './common/NavBar';
import { Heading } from '@aws-amplify/ui-react';

function LandingPage() {
  return (
    <div className="App">
      <NavBar/>
      <main className="App-main">
        <div className="App-landing-text">
          <Heading level={1} padding={5}>Website Hosting for Students. From Students.</Heading>
        </div>
      </main>
      <footer><p>&copy; 2024 EduHost</p></footer>
    </div>
  );
}
export default LandingPage;