import React from 'react';
import NavBar from './navbar.component'; 

const ReturningParticipant = () => {
  return (
    <div className="page-container">
      <div className="nav-container">
        <NavBar />  {/* Include NavBar */}
      </div>
      <div className="participants-container">
        <h1 className="participants-header">Welcome Back, Participant!</h1>
        {/* More JSX can go here */}
      </div>
    </div>
  );
};

export default ReturningParticipant;
