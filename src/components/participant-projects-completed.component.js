// ProjectsCompleted.js
import React from 'react';
import NavBar from './navbar.component';  // Assuming the path is the same as the other pages
import './participant-projects-completed.css';  // A new CSS file to style the page

const ProjectsCompleted = () => {

  // Sample data for completed projects
  const projects = [
    { id: 1, title: "Birdhouse", image: "https://via.placeholder.com/150", description: "A wooden birdhouse.", date: "March 20, 2023"},
    { id: 2, title: "Bookshelf", image: "https://via.placeholder.com/150", description: "A DIY bookshelf.", date: "April 10, 2023"},
    { id: 3, title: "Planter Box", image: "https://via.placeholder.com/150", description: "A box for planting flowers.", date: "May 5, 2023"},
    // Add more projects as needed
  ];

  return (
    <div className="page-container">
      <div className="nav-container">
        <NavBar />
      </div>
      <div className="projects-container">
        <h1>Projects Completed</h1>
        <div className="projects-list">
          {projects.map(project => (
            <div key={project.id} className="project-card">
              <img src={project.image} alt={project.title} />
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <span>Completed on: {project.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsCompleted;
