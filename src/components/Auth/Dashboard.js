import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../App.css';
import ProtectedNavBar from '../common/ProtectedNavBar';
import { Amplify } from 'aws-amplify';
import amplifyconfig from '../../amplifyconfiguration.json';
import '@aws-amplify/ui-react/styles.css';
import { withAuthenticator, Heading } from '@aws-amplify/ui-react';

Amplify.configure(amplifyconfig);

const DashboardPage = ({ signOut, user }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  return (
    <div className="App">
      <ProtectedNavBar/>
      <header className="App-header">
        <div className="App-title">
          <Heading level={1}>Hello {user.username}</Heading>
        </div>
      </header>
    </div>
  );
}

export default withAuthenticator(DashboardPage);
