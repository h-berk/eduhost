import React, { useEffect, useCallback, useState } from 'react';
import { uploadData, remove } from 'aws-amplify/storage';
import '../../App.css';
import ProtectedNavBar from '../common/ProtectedNavBar';
import amplifyconfig from '../../amplifyconfiguration.json';
import '@aws-amplify/ui-react/styles.css';
import { withAuthenticator, Button, Heading } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import { put, get } from 'aws-amplify/api';
import {Table, TableCell, TableBody, TableHead, TableRow } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

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
  const [deployments, setDeployments] = useState([]);
  const [error, setError] = useState('');

  const validateFile = (file) => {
    if (!file) {
      setError('No file selected.');
      return false;
    }
    if (file.name !== 'index.html') {
      setError('The file must be named "index.html".');
      return false;
    }
    if (file.type !== 'text/html' && file.type !== 'application/xhtml+xml') {
      setError('The file must be an HTML file.');
      return false;
    }
    setError(''); // clear any previous errors
    return true;
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = useCallback(async (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (validateFile(file)) {
      setSelectedFile(file);
      await handleUpload(`${user.username}/${file.name}`, file);
    } else {
      alert('File is not a html file named index.html');
    }
  }, [user]);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (validateFile(file)) {
      setSelectedFile(file);
      await handleUpload(`${user.username}/${file.name}`, file);
    } else {
      alert('File is not a html file named index.html');
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
      await postDeploymentLog({
        userId: user.username,
        fileName: file.name,
        lastUpdateTime: new Date().toISOString(),
        status: 'DEPLOYED',
        url: "https://setu.eduhost.ie/" + user.username
      });
      loadDeployments();
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file.');
    }
  };
  
  async function postDeploymentLog(record) {
    try {
      const restOperation = put({
        apiName: 'EduHostActiveDeploymentsLogsAPI',
        path: '/deployments',
        options: {
          headers: {
            'Content-Type': 'application/json'
          },
          body: record
        }
      });
    
      const { body } = await restOperation.response;
      const response = await body.json();
  
      console.log('Deployment log upload succeeded');
      console.log(response);
    } catch (e) {
      console.log('Deployment log upload failed: ', JSON.parse(e.response.body));
    }
  }

  async function getCurrentDeployments(userId) {
    try {
      const restOperation = get({
        apiName: 'EduHostActiveDeploymentsLogsAPI',
        path: '/deployments/' + userId,
      });
      const { body } = await restOperation.response;
      const json = await body.json();
      console.log(json)
      return json;
    } catch (e) {
      return [];
    }
  }

  const loadDeployments = async () => {
    const data = await getCurrentDeployments(user.username);
    setDeployments(data);
  };
  
  
  useEffect(() => {
    loadDeployments();
  }, []);

  const handleDelete = async () => { 
    try {
      const result = await remove({ key: `${user.username}/index.html`});
      await postDeploymentLog({
        userId: user.username,
        fileName: 'index.html',
        lastUpdateTime: new Date().toISOString(),
        status: 'DELETED',
        url: 'https://setu.eduhost.ie/' + user.username
      });
      console.log('File deleted successfully: ' , result);
      alert('File deleted successfully!');
      loadDeployments();

    } catch (error) {
      console.log('Error ', error);
    }
  }  

  const handleButtonClick = () => {
    document.getElementById('fileInput').click();
  };
  

return (
  <div className="App">
    <ProtectedNavBar />
    <main className="App-main">
      <div className="upload-instructions">
        <p>Please upload your "index.html" file below to deploy your website.</p>
        <p><em>Note: EduHost currently only supports an "index.html" file with inbuilt CSS.</em></p>
      </div>
      <Heading level={5} padding={5}>Deployer</Heading>
      <div className="file-drop-area" onDragOver={handleDragOver} onDrop={handleDrop}>
        <span className="file-message">Drop files here or </span>
        <input
          type="file"
          id="fileInput"
          hidden
          onChange={handleFileChange}
          accept=".html"
        />
        <Button onClick={handleButtonClick}>Browse Files</Button>
      </div>
      <div className="website-status">
        <Heading level={5} padding={10}>My Website Status</Heading>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell as="th">Username</TableCell>
              <TableCell as="th">File Name</TableCell>
              <TableCell as="th">Last Update Time</TableCell>
              <TableCell as="th">Status</TableCell>
              <TableCell as="th">URL</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {deployments.map((dep, index) => (
              <TableRow key={index}>
                <TableCell>{dep.userId}</TableCell>
                <TableCell>{dep.fileName}</TableCell>
                <TableCell>{dep.lastUpdateTime}</TableCell>
                <TableCell>{dep.status}</TableCell>
                <TableCell>
                  <a href={dep.url}>
                    {dep.url}
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="delete-deployment-div">
        <Button className="delete-button" onClick={handleDelete}>Delete my Website</Button>
      </div>
    </main>
  </div>
);
}

export default withAuthenticator(DeployerPage);


