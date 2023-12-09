import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from './navbar.component';  // Import NavBar

const VolunteersFirstPage = () => {
  return (
    <div className="page-container">

      <div className="nav-container">
        <NavBar />  {/* Include NavBar */}
      </div>

      <div className="participants-container">

        <h1 className="participants-header">Volunteers</h1>

        <div className="button-container">
          <Link to="/first-time-volunteer">
            <button className="participants-button option1-button">First Time Volunteer</button>
          </Link>
          <Link to="/returning-volunteer">
            <button className="participants-button option2-button">Returning Volunteer</button>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default VolunteersFirstPage;