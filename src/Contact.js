// src/components/ContactForm.js
import React, { useState } from 'react';
import './ContactForm.css';


function ContactForm() {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      message: '',
      cv: null,
    });
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
  
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      setFormData((prevData) => ({
        ...prevData,
        cv: file,
      }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      // Implement fetch API to send form data including the file to a server endpoint
      // For simplicity, use a mock server or a service like Vercel Blob for file storage
    };
  
    return (
        <div className="contact-form-container">
          <div className="contact-header">
            <h2>Contact Us</h2>
            <p>Get in touch with us. We'd love to hear from you!</p>
          </div>
          <div className="contact-form-block">
            <form className="contact-form" onSubmit={handleSubmit}>
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Name" required />
              <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email" required />
              <textarea name="message" value={formData.message} onChange={handleInputChange} placeholder="Message"  />
              <input type="file" name="cv" onChange={handleFileChange} accept=".pdf,.doc,.docx" required />
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      );
  }
  
  export default ContactForm;