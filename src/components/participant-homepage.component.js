import React, { useEffect, useRef } from 'react';
import NavBar from './navbar.component';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate
import './participant-homepage.css';

const ParticipantHomePage = ({ 
  badges = [ 
    {name: "Badge 1", icon: "https://via.placeholder.com/150"},
    {name: "Badge 2", icon: "https://via.placeholder.com/150"},
    {name: "Badge 3", icon: "https://via.placeholder.com/150"},
    {name: "Badge 4", icon: "https://via.placeholder.com/150"}
  ]
}) => {
  const location = useLocation();
  const navigate = useNavigate(); // Get a reference to the navigate function
  const userID = location.state?.userID || "Default Student";
  const badgesContainerRef = useRef(null);

  const adjustSquareSize = () => {
    if (badgesContainerRef.current) {
      const badges = badgesContainerRef.current.querySelectorAll('.badge-item img');
      badges.forEach(badge => {
        badge.style.height = `${badge.offsetWidth}px`;
      });
    }
  };

  useEffect(() => {
    adjustSquareSize();
    window.addEventListener('resize', adjustSquareSize);
    return () => window.removeEventListener('resize', adjustSquareSize);
  }, []);

  return (
    <div className="page-container">
      <div className="nav-container">
        <NavBar />
      </div>
      <div className="participant-page-container">
        <h1>Participant Page</h1>
        <br></br>
        <h3>Welcome {userID}</h3>
        <div className="actions-container">
          <button className="action-btn" onClick={() => navigate("/field-trips")}>Field Trips</button>
          <button className="action-btn" onClick={() => navigate("/tools-mastered")}>Tools Mastered</button>
          <button className="action-btn" onClick={() => navigate("/projects-completed")}>Projects Completed</button>
        </div>
        <div className="badges-container" ref={badgesContainerRef}>
          {badges.map(badge => (
            <div key={badge.name} className="badge-item">
              <img src={badge.icon} alt={badge.name} />
              <p>{badge.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ParticipantHomePage;
