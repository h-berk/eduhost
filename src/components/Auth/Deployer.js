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

  /*
  * Configure Amplify Storage to resolve prefixes properly.
  * Uploads user's files to their own subdirectory in main bucket -> setu.eduhost.ie/username/index.html
  * 
  */

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

  /*////////////////////////////////////
  *           Initial Rendering
  */////////////////////////////////////

  useEffect(() => {
  }, [user]);

  useEffect(() => {
    loadDeployments();
  }, []);

  /*
  * Different states required for re-rendering/updating of elements
  */
  const [selectedFile, setSelectedFile] = useState(null);
  const [deployments, setDeployments] = useState([]);
  const [error, setError] = useState('');

  /*////////////////////////////////////
  *           File Uploading
  */////////////////////////////////////

  /*
  * A function to validate uploaded file is named 'index.html' and is a HTML file.
  */
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
      setError('The file must be a HTML file.');
      return false;
    }
    setError(''); 
    return true;
  };

 /*
 * Prevents the default drag-over behavior to enable handling of dropped files.
 */
  const handleDragOver = (e) => {
    e.preventDefault();
  };

 /*
 * Handles file drop: validates the file and initiates upload if valid, alerts if not.
 */
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


  /*
  * Handles file change: validates the file and initiates upload if valid, alerts if not.
  */
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (validateFile(file)) {
      setSelectedFile(file);
      await handleUpload(`${user.username}/${file.name}`, file);
    } else {
      alert('File is not a html file named index.html');
    }
  };


  /*
  * Handles file uploading to S3 using uploadData Amplify Storage function
  * Uploads to user's own subdirectory. Alerts on successful deployment and logs to DynamoDB.
  * Refreshes table state to reload latest status of deployment.
  */
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
        url: "https://www.setu.eduhost.ie/" + user.username
      });
      loadDeployments();
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file.');
    }
  };

  /*
  * Event handler for file input button
  */
  const handleButtonClick = () => {
    document.getElementById('fileInput').click();
  };


  /*////////////////////////////////////
  *           File Deleting
  */////////////////////////////////////

  /*
  * Handles file deletion from S3 using remove Amplify Storage function
  * Logs to DynamoDB on successful deletion, alerts in browser if not.
  */
  const handleDelete = async () => { 
    try {
      const result = await remove({ key: `${user.username}/index.html`});
      await postDeploymentLog({
        userId: user.username,
        fileName: 'index.html',
        lastUpdateTime: new Date().toISOString(),
        status: 'DELETED',
        url: 'https://www.setu.eduhost.ie/' + user.username
      });
      console.log('File deleted successfully: ' , result);
      alert('File deleted successfully!');
      loadDeployments();

    } catch (error) {
      console.log('Error ', error);
    }
  }  

  /*////////////////////////////////////
  *         DynamoDB Logging
  */////////////////////////////////////
  
  /*
  * Sends a PUT req to REST API that acts as a proxy for DynamoDB.
  * Creates or Updates log with new record
  */
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

  /*
  * Sends a GET req to REST API that acts as a proxy for DynamoDB.
  * Queries deployment logs based on username parameter
  */
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

  /*
  * Retrieves logs from DynamoDB and updates deployments state for table to re-render.
  */
  const loadDeployments = async () => {
    const data = await getCurrentDeployments(user.username);
    setDeployments(data);
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
    <footer><p>&copy; 2024 EduHost</p></footer>
  </div>
);
}

export default withAuthenticator(DeployerPage);