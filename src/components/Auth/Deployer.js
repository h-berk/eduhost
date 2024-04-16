import React, { useEffect, useCallback, useState } from 'react';
import { uploadData, remove, list} from 'aws-amplify/storage';
import '../../App.css';
import ProtectedNavBar from '../common/ProtectedNavBar';
import amplifyconfig from '../../amplifyconfiguration.json';
import '@aws-amplify/ui-react/styles.css';
import { withAuthenticator, Button } from '@aws-amplify/ui-react';
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

  const [selectedFile, setSelectedFile] = useState(null);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = useCallback(async (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
      await handleUpload(`${user.username}/${file.name}`, file);
    }
  }, [user]);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      await handleUpload(`${user.username}/${file.name}`, file);
    }
  };

  const handleUpload = async (key, file) => {
    try {
      const result = await uploadData({
        key,
        data: file,
        options: {
          contentType: 'text/html',
          accessLevel: 'guest',
        },
      });
      console.log('File uploaded:', result);
      alert('File uploaded successfully!');
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file.');
    }
  };

  const handleDelete = async (filename) => {
    try {
      await remove({ key: filename });
    } catch (error) {
      console.log('Error ', error);
    }
  }

  const listFiles = async (user) => {
    try {
      const result = await list({
        prefix: `${user.username}`
      });
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
    }
  }
  

  return (
    <div className="App">
      <ProtectedNavBar />
      <main className="App-main">
        <p>Please upload your "index.html file" below to deploy your website.</p>
        <p><em>* Note that currently EduHost hosting only supports an index.html file with inbuilt CSS.</em></p>
        <div className="file-drop-area" onDragOver={handleDragOver} onDrop={handleDrop}>
          <span className="file-message">Drop files here or  </span>
          <input
            type="file"
            id="fileInput"
            hidden
            onChange={handleFileChange}
            accept=".html"
          />
          <label htmlFor="fileInput" className="file-upload-btn">Browse files</label>
        </div>
        {selectedFile && <div className="file-details">{selectedFile.name}</div>}
        <p>Your site can be found <a href={`http://setu.eduhost.ie/${user.username}`}>here.</a></p>
      </main>
    </div>
  );
};

export default withAuthenticator(DeployerPage);
