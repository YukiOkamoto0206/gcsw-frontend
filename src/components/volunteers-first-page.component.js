import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from './navbar.component';  // Import NavBar
import './volunteers-first-page.css'

const VolunteersFirstPage = () => {
  return (
    <div>
      <div>
        <NavBar />  {/* Include NavBar */}
      </div>

      <div class="div-1">
        <h1>Volunteers</h1>

        <div class="div-2">
            <Link to="/first-time-volunteer">
                <button class="btns btn1">First Time Volunteer</button>
            </Link>
            <Link to="/returning-volunteer">
                <button class="btns btn2">Returning Volunteer</button>
            </Link>
        </div>

      </div>
    </div>
  );
};

export default VolunteersFirstPage;
