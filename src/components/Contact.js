import React, { useState } from 'react';
import '../App.css';
import NavBar from './common/NavBar';
import { ContactForm } from '../ui-components';

// Blank form, just resets when submit button is clicked

function ContactPage() {
  const [formKey, setFormKey] = useState(0);

  const handleSubmit = () => {
    setFormKey(prevKey => prevKey + 1); // Increment the key to force re-render
  };

  return (
    <div className="App">
      <NavBar/>
      <main className="App-main">
        <div className="App-title">
          {/* Pass handleSubmit and use formKey to force re-render */}
          <ContactForm key={formKey} onSubmit={handleSubmit} />
        </div>
      </main>
    </div>
  );
}

export default ContactPage;