import React, { useState } from 'react';
import NavBar from './navbar.component';
import './returning-participant.css';
import axios from 'axios'; // Import Axios

const ReturningParticipant = () => {
  const [participantId, setParticipantID] = useState('');
  const [participantInfo, setParticipantInfo] = useState(null); // State to store participant info
  const [formSubmitted, setFormSubmitted] = useState(false); // State to track form submission

  const handleSubmit = async () => {
    if (participantId) {
      try {
        // Make a GET request to check if the participant exists
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/participants/participant_id/${participantId}`
        );

        // Check if the participant exists in the response
        if (response.data[0]) {
          console.log("response.data: ", response.data[0])
          // Store the participant info in state
          setParticipantInfo(response.data);

          // Navigate to participant-homepage and pass the userID
          window.location = `/participant-homepage?participant_id=${participantId}`;
        } else {
          // Participant doesn't exist, display a message
          setParticipantInfo(null);
        }

        // Set formSubmitted to true after submitting the form
        setFormSubmitted(true);
      } catch (error) {
        console.error('Error checking participant:', error);
      }
    } else {
      // Optional: Add some error handling if the userID is not entered or invalid.
    }
  };

  return (
    <div className="nav-container">
      <NavBar />
      <div className="page-container">
        <div className="participants-container">
          <h1 className="participants-header">Returning Participant</h1>
          <p>participantID: (FirstName)(LastName)(Year of Birth)</p>
          <input
            type="text"
            placeholder="Participant ID:"
            className="userid-input"
            value={participantId}
            onChange={(e) => setParticipantID(e.target.value)}
          />
          <button className="submit-button" onClick={handleSubmit}>
            Submit
          </button>
          
          {formSubmitted && participantInfo === null && (
            <p style={{ color: 'red' }}>No user found with this Participant ID.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReturningParticipant;
