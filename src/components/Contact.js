import React, { useState } from 'react';
import '../App.css';
import appLogo from '../assets/images/app_logo.png';
import NavBar from './common/NavBar';

function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
      });
    
      const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
      }
    
      const handleSubmit = (e) => {
        e.preventDefault();
        // TODO
        setFormData({
            name: '',
            email: '',
            message: ''
          });
        alert("Form submitted!");
      }
  return (
    <div className="App">
      <NavBar/>
      <header className="App-header">
        <div className="App-title">
          <h1>Contact</h1>
          <img src={appLogo} alt="App Logo" className="App-logo" />
        </div>
        <div className="contact-form-container">
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
      </header>
    </div>
  );
}
export default ContactPage;