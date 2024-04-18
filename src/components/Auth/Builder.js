import React, { useState } from 'react';
import { uploadData } from 'aws-amplify/storage';
import '../../App.css';
import appLogo from '../../assets/images/app_logo.png';
import ProtectedNavBar from '../common/ProtectedNavBar';
import amplifyconfig from '../../amplifyconfiguration.json';
import axios from 'axios';
import '@aws-amplify/ui-react/styles.css';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import { TemplateChooserForm } from '../../ui-components';
import { WebsiteBuilderForm } from '../../ui-components';

Amplify.configure(amplifyconfig);

const BuilderPage = () => {

    const handleSubmit = async (fields) => {
        try {
            const apiUrl = 'https://il036rlvga.execute-api.eu-west-1.amazonaws.com/prod/submit';
            const response = await axios.post(apiUrl, fields, {
                responseType: 'blob'  // Used for automatic file download from response
            });
            const fileURL = window.URL.createObjectURL(new Blob([response.data]));
            const fileLink = document.createElement('a');
            fileLink.href = fileURL;
            fileLink.setAttribute('download', 'index.html'); // Set the desired file name for download
            document.body.appendChild(fileLink);
            fileLink.click();
            fileLink.remove(); // Clean up the link element after triggering the download
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };
    
return (
    <div className="App">
        <ProtectedNavBar/>
        <main className="App-main">
        <div className="form-container">
            <WebsiteBuilderForm onSubmit={handleSubmit} />
        </div>
        </main>
    </div>
    );
      
}

export default withAuthenticator(BuilderPage);
