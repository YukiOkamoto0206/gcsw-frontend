// ToolsMastered.js
import React from 'react';
import NavBar from './navbar.component';  // Assuming the path is the same as ParticipantHomePage
import './participant-tools-mastered.css';  // A new CSS file to style the page

const ToolsMastered = () => {

  // Sample data for tools
  const tools = [
    { id: 1, name: "Drill", image: "https://via.placeholder.com/150", description: "Used for drilling holes in materials."},
    { id: 2, name: "Hammer", image: "https://via.placeholder.com/150", description: "Used for driving nails."},
    { id: 3, name: "Saw", image: "https://via.placeholder.com/150", description: "Used for cutting materials."},
    // Add more tools as needed
  ];

  return (
    <div className="page-container">
      <div className="nav-container">
        <NavBar />
      </div>
      <div className="tools-container">
        <h1>Tools Mastered</h1>
        <div className="tools-list">
          {tools.map(tool => (
            <div key={tool.id} className="tool-card">
              <img src={tool.image} alt={tool.name} />
              <h3>{tool.name}</h3>
              <p>{tool.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ToolsMastered;
