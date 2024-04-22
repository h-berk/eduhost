import React from 'react';
import '../App.css';
import NavBar from './common/NavBar';
import { Heading } from '@aws-amplify/ui-react';

function TutorialPage() {
    return (
      <div className="App">
        <NavBar/>
        <main className="App-main">
          <div className="tutorial-heading">
            
          </div>
          <section className="tutorial-section">
          <Heading level={1} padding={5}>How to Build and Host Your Website with EduHost</Heading>
            <ul >
              <li>
                <strong>Sign Up:</strong> Create an EduHost account by signing up with your SETU email to access our tools and resources.
              </li>
            </ul>
            Builder
            <ul>
              <li>
                <strong> Choose Template:</strong> Start by choosing a template that fits the style and needs of your project.
              </li>
              <li>
                <strong>Fill out the Form:</strong> Use our easy form to fill out the necessary fields!
              </li>
              <li>
                <strong>Click Build!</strong> This will automatically create your website file and download it to your machine.
              </li>
            </ul>
            Deployer
            <ul>
              <li>
                <strong> Upload website file:</strong> Upload your index.html file that you made in the builder, or coded yourself.
              </li>
              <li>
                <strong>View deployments:</strong> Uploading the file automatically brings your website live. You can find the url in the 'My Website Status' section.
              </li>
            </ul>
            <p>&copy; 2024 EduHost</p>
          </section>
        </main>
        <footer><p>&copy; 2024 EduHost</p></footer>
      </div>
    );
  }
  
  export default TutorialPage;
  