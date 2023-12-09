import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import './App.css';

import SignInPage from './components/sign-in-page.component';  
import ParticipantInfo from './components/participant-info.component';
import ParticipantsFirstPage from './components/participants-first-page.component'; 
import FirstTimeParticipant from './components/first-time-participant.component'; 
import ReturningParticipant from './components/returning-participant.component'; 
import ParticipantHomePage from './components/participant-homepage.component'; 
import VolunteerInfo from './components/volunteer-info.component';
import VolunteersFirstPage from './components/volunteers-first-page.component'; 
import FirstTimeVolunteer from './components/first-time-volunteer.component'; 
import ReturningVolunteer from './components/returning-volunteer.component'; 
import VolunteerHomePage from './components/volunteer-homepage.component'; 
import FieldTrips from './components/participant-field-trips.component';
import ToolsMastered from './components/participant-tools-mastered.component';
import ProjectsCompleted from './components/participant-projects-completed.component';
import StaffPage from './components/staff-page.component';
import ProtectedRoute from './auth/protected-route';
import Loading from './components/loading.component';

const App = () => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<SignInPage />} />
        <Route path="/participant-info" element={<ParticipantInfo />} />
        <Route path="/volunteer-info" element={<VolunteerInfo />} />
        <Route path="/participants-first-page" element={<ParticipantsFirstPage />} /> 
        <Route path="/volunteers-first-page" element={<VolunteersFirstPage />} /> 
        <Route path="/first-time-participant" element={<FirstTimeParticipant />} /> 
        <Route path="/first-time-volunteer" element={<FirstTimeVolunteer />} /> 
        <Route path="/returning-participant" element={<ReturningParticipant />} />
        <Route path="/returning-volunteer" element={<ReturningVolunteer />} />
        <Route path="/participant-homepage" element={<ParticipantHomePage />} /> 
        <Route path="/volunteer-homepage" element={<VolunteerHomePage />} /> 
        <Route path="/field-trips" element={<FieldTrips />} />
        <Route path="/tools-mastered" element={<ToolsMastered />} />
        <Route path="/projects-completed" element={<ProjectsCompleted />} />
        <Route path="/staff" element={<ProtectedRoute><StaffPage /></ProtectedRoute>} />
      </Routes>
    </div>

  );
};

export default App;
