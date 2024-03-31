import React from 'react';
import '../App.css';
import appLogo from '../assets/images/app_logo.png';
import NavBar from './common/NavBar';
import { Amplify } from 'aws-amplify';
import amplifyconfig from '../amplifyconfiguration.json';
import '@aws-amplify/ui-react/styles.css';
import { withAuthenticator, Heading, Button } from '@aws-amplify/ui-react';
import { fetchUserAttributes } from 'aws-amplify/auth';
Amplify.configure(amplifyconfig);

const HomePage = ({ signOut, user }) => {

  async function handleFetchUserAttributes() {
    try {
      const userAttributes = await fetchUserAttributes();
      console.log(userAttributes);
    } catch (error) {
      console.log(error);
    }
  }

  handleFetchUserAttributes()
  return (
    <div className="App">
      <NavBar/>
      <header className="App-header">
        <div>
        <Heading level={1}>Hello {user.username}</Heading>
        <Button onClick={signOut}>Sign out</Button>
        </div>
        <div className="App-title">
          <h1>Welcome to</h1>
          <img src={appLogo} alt="App Logo" className="App-logo" />
        </div>
      </header>
    </div>
  );
}
export default withAuthenticator(HomePage);