import React from 'react';
import '../App.css';
import appLogo from '../assets/images/app_logo.png';
import NavBar from './common/NavBar';
import { Heading } from '@aws-amplify/ui-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@aws-amplify/ui-react';

function LandingPage() {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };
  return (
    <div className="App">
      <NavBar/>
      <main className="App-main">
        <div className="App-landing-text">
          <Heading level={1} padding={5}>Website Hosting for Students. From Students.</Heading>
        </div>
        <div className="button-group">
          <Button onClick={() => handleNavigate('/tutorial')} className="dashboard-button">Get Started with the Tutorial</Button>
        </div>
      </main>
      <footer><p>&copy; 2024 EduHost</p></footer>
    </div>
  );
}
export default LandingPage;