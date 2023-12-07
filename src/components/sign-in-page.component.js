import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from './navbar.component';  // Import NavBar
import './SignInPage.css';
import AuthNav from './auth-nav.component';

const SignInPage = () => {
  return (
    <div className="page-container">
      <div className="nav-container">
        <NavBar />  {/* Include NavBar */}
      </div>
      <div className="custom-auth-nav">
        <AuthNav />
      </div>
      <div className="sign-in-container">
        <h1 className="sign-in-header">Welcome to the Greenfield Community Workshop</h1>
        <div className="button-container">
          <Link to="/volunteer-info">
            <button className="sign-in-button volunteer-button">Volunteer</button>
          </Link>
          <Link to="/participants-first-page">
            <button className="sign-in-button participant-button">Participant</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
