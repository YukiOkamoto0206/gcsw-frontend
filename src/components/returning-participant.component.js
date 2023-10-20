import React, { useState } from 'react';
import NavBar from './navbar.component';
import './returning-participant.css'; 
import { useNavigate } from 'react-router-dom';

const ReturningParticipant = () => {
  const [userID, setUserID] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (userID) {
      // Navigate to participant-homepage and pass the userID
      navigate('/participant-homepage', { state: { userID: userID } });
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
        <p>UserID: (FirstName)(LastName)(Year of Birth)</p>
        <input
          type="text"
          placeholder="User ID:"
          className="userid-input"
          value={userID}
          onChange={e => setUserID(e.target.value)}
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
