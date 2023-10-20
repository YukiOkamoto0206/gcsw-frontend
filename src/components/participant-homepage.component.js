import React, { useEffect, useRef } from 'react';
import NavBar from './navbar.component';
import { useLocation } from 'react-router-dom';
import './participant-homepage.css';

const ParticipantHomePage = ({ 
  badges = [ 
    {name: "Default Badge", icon: "https://via.placeholder.com/150"},
    {name: "Badge 2", icon: "https://via.placeholder.com/150"},
    {name: "Badge 3", icon: "https://via.placeholder.com/150"},
    {name: "Badge 4", icon: "https://via.placeholder.com/150"},
    {name: "Badge 5", icon: "https://via.placeholder.com/150"}
  ]  // Using placeholder as example badge
}) => {
  const location = useLocation();
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

  console.log("Rendering ParticipantHomePage");

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
          <button className="action-btn">Field Trips</button>
          <button className="action-btn">Tools Mastered</button>
          <button className="action-btn">Projects Completed</button>
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
