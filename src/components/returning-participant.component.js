import React, { useState } from 'react';
import NavBar from './navbar.component';
import './returning-participant.css'; 

const ReturningParticipant = () => {
  const [participantId, setParticipantID] = useState('');

  const handleSubmit = () => {
    if (participantId) {
      // Navigate to participant-homepage and pass the userID
      window.location = `/participant-homepage?participant_id=${participantId}`;
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
          onChange={e => setParticipantID(e.target.value)}
        />
        <button className="submit-button" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
    </div>
  );
};

export default ReturningParticipant;
