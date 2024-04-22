import React from 'react';
import '../App.css';
import NavBar from './common/NavBar';
import { Heading } from '@aws-amplify/ui-react';

function AboutPage() {
  return (
    <div className="App">
      <NavBar/>
      <main className="App-main">
        <section className="about-section">
        <Heading level={1} padding={5}>About Us</Heading>
          <p>
            EduHost is designed to provide an all-in-one website builder and hosting platform for students. 
            Developed by a final year computer science student in SETU Waterford, we aim to make website hosting and building accessible for all students. 
            Whether you have zero coding experience or have your own static website already coded, EduHost is the platform to provide you with the tools and resources to succeed in building your
            online presence.
          </p>
          <p className='copyright'>&copy; 2024 EduHost</p>
        </section>
      </main>
      <footer><p>&copy; 2024 EduHost</p></footer>
    </div>
  );
}

export default AboutPage;
