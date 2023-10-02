import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import './App.css';  // Add your styles here

import SignInPage from './components/sign-in-page.component';  // Your new sign-in page
import VolunteerInfo from './components/volunteer-info.component';
import ParticipantInfo from './components/participant-info.component';
import ParticipantsFirstPage from './components/participants-first-page.component';  // Import your new component
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
        <Route path="/volunteer-info" element={<VolunteerInfo />} />
        <Route path="/participant-info" element={<ParticipantInfo />} />
        <Route path="/participants-first-page" element={<ParticipantsFirstPage />} />  {/* New Route */}
        <Route path="/staff" element={<ProtectedRoute><StaffPage /></ProtectedRoute>} />
      </Routes>
    </div>
  );
};

export default App;
