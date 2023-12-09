import React, { useState } from 'react';
import NavBar from './navbar.component';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Alert, Snackbar } from "@mui/material";

const ReturningVolunteer = () => {
  const [userID, setUserID] = useState('');
  const [alert, setAlert] = useState({ show: false, message: '', severity: '' });
  const navigate = useNavigate();

  const handleAlertClose = () => {
    setAlert({ ...alert, show: false });
  };

  const checkVolunteerStatus = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/volunteers/volunteer_id/${userID}`);
      // Check if volunteer is signed in
      if (response.data && response.data.is_signed_in) {
        setAlert({ show: true, message: "You are already signed in. Don't forget to sign out!", severity: 'info' });
        navigate('/volunteer-homepage', { state: { volunteerId: userID } });
      } else {
        // If not signed in, sign them in
        await axios.post(`${process.env.REACT_APP_SERVER_URL}/volunteers/signin`, { volunteer_id: userID });
        navigate('/volunteer-homepage', { state: { volunteerId: userID } });
      }
    } catch (error) {
      // If the userID is not found or there is a network/API error
      setAlert({ show: true, message: 'Failed to sign in. Please check your User ID or try again later.', severity: 'error' });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (userID) {
      checkVolunteerStatus();
    } else {
      setAlert({ show: true, message: 'Please enter a User ID.', severity: 'warning' });
    }
  };

  return (
    <div>
      <NavBar />
      <div className="page-container">
        <h1 className="participants-header">Returning Volunteer</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Ex: JohnDoe1972"
            className="userid-input"
            value={userID}
            onChange={(e) => setUserID(e.target.value)}
          />
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
        {alert.show && (
          <Snackbar open={alert.show} autoHideDuration={6000} onClose={handleAlertClose}>
            <Alert onClose={handleAlertClose} severity={alert.severity} sx={{ width: '100%' }}>
              {alert.message}
            </Alert>
          </Snackbar>
        )}
      </div>
    </div>
  );
};

export default ReturningVolunteer;
