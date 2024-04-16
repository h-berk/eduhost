import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../App.css';
import ProtectedNavBar from '../common/ProtectedNavBar';
import { Amplify } from 'aws-amplify';
import amplifyconfig from '../../amplifyconfiguration.json';
import '@aws-amplify/ui-react/styles.css';
import { withAuthenticator, Heading, Button } from '@aws-amplify/ui-react';

Amplify.configure(amplifyconfig);

const DashboardPage = ({ signOut, user }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="App">
      <ProtectedNavBar/>
      <main className="App-main">
      <div className="App-title">
      <Heading level={1}>Hello {user.username}</Heading>
      </div>
        <div className="button-group">
          <Button onClick={() => handleNavigate('/builder')} className="dashboard-button">Builder</Button>
          <Button onClick={() => handleNavigate('/deployer')} className="dashboard-button">Deployer</Button>
        </div>
      </main>
    </div>
  );
}

export default withAuthenticator(DashboardPage);
