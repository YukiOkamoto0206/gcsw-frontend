import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from './navbar.component';  // Import NavBar
// import './ParticipantsFirstPage.css';  // Create and import a new CSS file or use the existing one

const ParticipantsPage = () => {
  return (
    <div className="page-container">
      <div className="nav-container">
        <NavBar />  {/* Include NavBar */}
      </div>
      <div className="participants-container">
        <h1 className="participants-header">Participants</h1>
        <div className="button-container">
          <Link to="/option1">
            <button className="participants-button option1-button">Option 1</button>
          </Link>
          <Link to="/option2">
            <button className="participants-button option2-button">Option 2</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ParticipantsPage;
