import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LandingPage from './components/LandingPage';
import DashboardPage from './components/Auth/Dashboard'
import AboutPage from './components/About';
import TutorialPage from './components/Tutorial';
import DeployerPage from './components/Auth/Deployer'
import BuilderPage from './components/Auth/Builder'
import { Amplify } from 'aws-amplify';
import amplifyconfig from './amplifyconfiguration.json';
Amplify.configure(amplifyconfig);

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="App-nav">
        </nav>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/deployer" element={<DeployerPage />} />
          <Route path="/builder" element={<BuilderPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/tutorial" element={<TutorialPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
