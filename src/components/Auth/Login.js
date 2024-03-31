import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../App.css';
import appLogo from '../../assets/images/app_logo.png';
import NavBar from '../common/NavBar';
import { Amplify } from 'aws-amplify';
import amplifyconfig from '../../amplifyconfiguration.json';
import '@aws-amplify/ui-react/styles.css';
import { withAuthenticator, Heading, Button } from '@aws-amplify/ui-react';

Amplify.configure(amplifyconfig);

const Login = ({ signOut, user }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/home');
    }
  }, [user, navigate]);

  return (
    <div className="App">
      <NavBar/>
      <header className="App-header">
        <div className="App-title">
          <Heading level={1}>Hello {user.username}</Heading>
          <Button onClick={signOut}>Sign out</Button>
          <h1>Login to</h1>
          <img src={appLogo} alt="App Logo" className="App-logo" />
        </div>
      </header>
    </div>
  );
}

export default withAuthenticator(Login);
