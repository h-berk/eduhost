import React, { useEffect } from 'react';
import { uploadData } from 'aws-amplify/storage';
import '../../App.css';
import appLogo from '../../assets/images/app_logo.png';
import ProtectedNavBar from '../common/ProtectedNavBar';
import amplifyconfig from '../../amplifyconfiguration.json';
import '@aws-amplify/ui-react/styles.css';
import { withAuthenticator, Heading, Button } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';

Amplify.configure(amplifyconfig, {
    Storage: {
      S3: {
        prefixResolver: async ({ accessLevel, targetIdentityId }) => {
          if (accessLevel === 'guest') {
            return ``;
          }
        }
      }
    }
  });

const DeployerPage = ({ signOut, user }) => {
  useEffect(() => {
  }, [user]);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      await handleUpload(`${user.username}/${file.name}`, file);
    }
  };

  const handleUpload = async (key, data) => {
    try {
      const operation = uploadData({
        key,
        data,
        options: {
        contentType: 'text/html',
        accessLevel: 'guest',
        }
      });

      const result = await operation.result;
      console.log('File uploaded:', result);
      alert('File uploaded successfully!');
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file.');
    }
  };

  return (
    <div className="App">
      <ProtectedNavBar />
      <header className="App-header">
        <div>
          <Heading level={1}>Hello {user.username}</Heading>
          <Button onClick={signOut}>Sign out</Button>
        </div>
        <div className="App-title">
          <h1>Welcome to</h1>
          <img src={appLogo} alt="App Logo" className="App-logo" />
        </div>
        <input type="file" onChange={handleFileChange} accept=".html" />
      </header>
    </div>
  );
};

export default withAuthenticator(DeployerPage);
