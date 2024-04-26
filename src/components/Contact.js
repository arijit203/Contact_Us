// src/components/ContactForm.js

import React, { useState } from 'react';
import './ContactForm.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    cv: null,
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Encoding file content before storing in local storage
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
  
    reader.onload = (event) => {
      // Convert ArrayBuffer to base64 encoded string
      const encodedFileContent = btoa(event.target.result);
  
      setFormData((prevData) => ({
        ...prevData,
        cv: {
          name: file.name,
          type: file.type,
          content: encodedFileContent,
        }, // Store the base-64 encoded file content along with file name and type
      }));
    };
  
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Generate a unique key for storing the form submission
    const submissionKey = `formSubmission_${Date.now()}`;
    
    // Read the stored file content from local state
    const fileContent = formData.cv ? formData.cv.content : null;
    
    // Store form data and file content in localStorage with the unique key
    const submissionData = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
      cv: fileContent, // Include the file content in the submission data
      // Add additional form fields as needed
    };
    localStorage.setItem(submissionKey, JSON.stringify(submissionData));
    
    // Redirect to submissions page after successful form submission
    navigate('/submissions');
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
          <textarea name="message" value={formData.message} onChange={handleInputChange} placeholder="Message" required />
          <input type="file" name="cv" onChange={handleFileChange} accept=".pdf,.doc,.docx" required />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default ContactForm;
