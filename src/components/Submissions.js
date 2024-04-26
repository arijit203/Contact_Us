import React, { useState, useEffect } from 'react';
import './Submissions.css'; // Import CSS file

function Submissions() {
  // State to store submissions
  const [submissions, setSubmissions] = useState([]);

  // Function to retrieve submissions from localStorage
  const retrieveSubmissions = () => {
    const keys = Object.keys(localStorage);
    const retrievedSubmissions = keys.map((key) => {
      try {
        return JSON.parse(localStorage.getItem(key));
      } catch (error) {
        console.error('Error parsing submission data:', error);
        return null;
      }
    }).filter(submission => submission !== null);
    setSubmissions(retrievedSubmissions);
  };

  // Effect to retrieve submissions on component mount
  useEffect(() => {
    retrieveSubmissions();
  }, []);

  // Effect to update submissions when localStorage changes
  useEffect(() => {
    window.addEventListener('storage', retrieveSubmissions);
    return () => window.removeEventListener('storage', retrieveSubmissions);
  }, []);

  // Function to decode the base64 encoded file content
  const decodeFileContent = (encodedContent) => {
    const decodedContent = atob(encodedContent);
    return decodedContent;
  };

  return (
    <div className="submissions-container">
      <h2>All Form Submissions</h2>
      {submissions.length > 0 ? (
        submissions.map((submission, index) => (
          <div key={index} className="submission-container">
            <div className="submission-title">Submission {index + 1}</div>
            <div className="submission-content">
              <div className="submission-field">
                <label>Name:</label>
                <p>{submission.name}</p>
              </div>
              <div className="submission-field">
                <label>Email:</label>
                <p>{submission.email}</p>
              </div>
              <div className="submission-field">
                <label>Message:</label>
                <p>{submission.message}</p>
              </div>
              {/* Display download link for the submitted file */}
              {submission.cv && (
                <div className="submission-field">
                  <label>File:</label>
                  <a href={`data:application/octet-stream;base64,${submission.cv}`} download>Download CV</a>
                </div>
              )}
              {/* Display additional form fields as needed */}
            </div>
          </div>
        ))
      ) : (
        <p>No form submissions found.</p>
      )}
    </div>
  );
}





export default Submissions;
