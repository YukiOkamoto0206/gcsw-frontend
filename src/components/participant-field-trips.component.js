// FieldTrips.js
import React from 'react';
import NavBar from './navbar.component';  // Assuming the path is the same as the other pages
import './participant-field-trips.css';  // A new CSS file to style the page

const FieldTrips = () => {

  // Sample data for field trips
  const trips = [
    { id: 1, title: "Factory Tour", image: "https://via.placeholder.com/150", description: "A tour of the local manufacturing factory.", date: "April 15, 2023"},
    { id: 2, title: "Museum Visit", image: "https://via.placeholder.com/150", description: "A visit to the National History Museum.", date: "May 3, 2023"},
    { id: 3, title: "Park Exploration", image: "https://via.placeholder.com/150", description: "A day of exploring the city park and its flora.", date: "June 8, 2023"},
    // Add more trips as needed
  ];

  return (
    <div className="page-container">
      <div className="nav-container">
        <NavBar />
      </div>
      <div className="trips-container">
        <h1>Field Trips</h1>
        <div className="trips-list">
          {trips.map(trip => (
            <div key={trip.id} className="trip-card">
              <img src={trip.image} alt={trip.title} />
              <h3>{trip.title}</h3>
              <p>{trip.description}</p>
              <span>{trip.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FieldTrips;
