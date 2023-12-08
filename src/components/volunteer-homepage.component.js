import React, { useState, useEffect } from 'react';
import NavBar from './navbar.component';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './volunteer-homepage.css'

const VolunteerHomePage = () => {
    const location = useLocation();
    const volunteerId = location.state?.volunteerId;

    // State to store volunteer data
    const [volunteer, setVolunteer] = useState({
        first_name: '',
        volunteer_title: '',
        total_hours: 0
    });

    useEffect(() => {
        // Fetch volunteer data when the component mounts
        const fetchVolunteerData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/volunteers/volunteer_id/${volunteerId}`);
                setVolunteer(response.data); // Assuming the response data has the required fields
            } catch (error) {
                console.error("Error fetching volunteer data:", error);
                // Handle error appropriately
            }
        };

        if (volunteerId) {
            fetchVolunteerData();
        }
    }, [volunteerId]); // Re-run the effect if volunteerId changes

    const getTitleAndHoursToNextLevel = (totalHours) => {
        let nextLevelHours = 0;
        let next_title = '';
    
        if (totalHours < 10) {
            next_title = 'Lab Explorer';
            nextLevelHours = Math.round(10 - totalHours);
        } else if (totalHours >= 10 && totalHours < 26) {
            next_title = 'Science Sidekick';
            nextLevelHours = Math.round(26 - totalHours);
        } else if (totalHours >= 26 && totalHours < 51) {
            next_title = 'Research Rockstar';
            nextLevelHours = Math.round(51 - totalHours);
        } else if (totalHours >= 51 && totalHours < 101) {
            next_title = 'Experiment Hunter';
            nextLevelHours = Math.round(101 - totalHours);
        } else if (totalHours >= 101 && totalHours < 201) {
            next_title = 'Lab Ninja';
            nextLevelHours = Math.round(201 - totalHours);
        } else if (totalHours >= 201 && totalHours < 301) {
            next_title = 'Dr. Cerebro';
            nextLevelHours = Math.round(301 - totalHours);
        } else if (totalHours >= 301 && totalHours < 401) {
            next_title = 'Jedi of Science';
            nextLevelHours = Math.round(401 - totalHours);
        } else if (totalHours >= 401 && totalHours < 501) {
            next_title = 'Master of Science';
            nextLevelHours = Math.round(501 - totalHours);
        } else if (totalHours >= 501 && totalHours < 751) {
            next_title = 'Science Sensei';
            nextLevelHours = Math.round(751 - totalHours);
        } else if (totalHours >= 751 && totalHours < 1001) {
            next_title = 'Mad Scientist';
            nextLevelHours = Math.round(1001 - totalHours);
        } else if (totalHours > 1000) {
            next_title = 'Max title achieved';
            nextLevelHours = 'Maximum level reached';
        }
    
        return { next_title, nextLevelHours };
    }

    const { next_title, nextLevelHours } = getTitleAndHoursToNextLevel(volunteer.total_hours);
    
    const handleLogout = async () => {
        const date = new Date().toISOString(); // Use the date when the logout button is clicked
        try {
            await axios.put(`${process.env.REACT_APP_SERVER_URL}/volunteers/adminLogout`, {
                volunteer_id: volunteerId,
                date: date
            });
            alert("You have successfully logged out!");
            window.location = '/'; 
        } catch (error) {
            console.error(error);
            alert("There was an error logging out. Please try again.");
        }
    };

    return (
        <div>
            <NavBar />
            <div class="content">
                <div class="div1">
                    <h2>Welcome {volunteer.first_name}, {volunteer.volunteer_title}</h2>
                </div>
                <div class="div2">
                    <h2>Number of hours completed: {Math.round(volunteer.total_hours)}</h2>
                </div>
                <div class="div3">
                    <h2>Hours to next title ({next_title}): {nextLevelHours}</h2>
                </div>
                <br></br>
                <Button class="button-primary" variant="danger" onClick={handleLogout}>Volunteer Log Out</Button>
            </div>
        </div>
    );
};

export default VolunteerHomePage;
