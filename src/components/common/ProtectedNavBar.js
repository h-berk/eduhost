import React from 'react';
import '../../App.css';
import navBarLogo from '../../assets/images/navbar-logo.png';
import { withAuthenticator, Button } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import amplifyconfig from '../../amplifyconfiguration.json';
import '@aws-amplify/ui-react/styles.css';

Amplify.configure(amplifyconfig);

const ProtectedNavBar = ({ signOut }) => {
    return (
        <nav className="App-nav">
            <ul>
                <li><a href="/dashboard">Dashboard</a></li>
                <li><a href="/builder">Builder</a></li>
                <li><a href="/deployer">Deployer</a></li>
                <li><a href="/contact">Contact</a></li>
                <li className="logo"><img src={navBarLogo} alt="App Logo" /></li>
                <li className="login-signup"><Button onClick={signOut}>Sign out</Button></li>
            </ul>
        </nav>
    );
}


  
  export default withAuthenticator(ProtectedNavBar);
  