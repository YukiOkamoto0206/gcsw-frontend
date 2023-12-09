// import React, { useState } from 'react';
// import NavBar from './navbar.component';
// import { Button } from 'react-bootstrap';
// import LogOutModal from './logout-modal.component';

// const VolunteerHomePage = ({ volunteerId }) => {
//     const [showModal, setShowModal] = useState(false); // State to control the visibility of the modal

//     // This could be the existing handleLogout method or a new method to open the modal
//     const openLogoutModal = () => {
//         setShowModal(true); // Open the modal
//     };

//     // Assuming you have a date variable or it's obtained somehow in your component
//     const date = new Date().toISOString();

//     return (
//         <div>
//             <NavBar />
//             <div className="container">
//                 <h2>Welcome, Volunteer!</h2>
//                 {/* The button to open the logout modal */}
//                 <Button variant="primary" onClick={openLogoutModal}>Sign Out</Button>
//             </div>

//             {/* LogOutModal is included here and will only display when showModal is true */}
//             {showModal && (
//                 <LogOutModal
//                     setOpenModal={setShowModal}
//                     volunteer_id={volunteerId}
//                     date={date}
//                 />
//             )}
//         </div>
//     );
// };

// export default VolunteerHomePage;

import React from 'react';
import NavBar from './navbar.component';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const VolunteerHomePage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const volunteerId = location.state?.volunteerId;

    if (!volunteerId) {
        // Handle the case where volunteerId is not available
        // Maybe redirect back to the sign-in page or display a message
        navigate('/');
    }

    const handleLogout = async () => {
        const date = new Date().toISOString(); // Use the date when the logout button is clicked
        try {
            const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/volunteers/adminLogout`, {
                volunteer_id: volunteerId,
                date: date
            });
            alert("Volunteer has logged out!");
            console.log(response.data);
            navigate('/');  // This replaces window.location
        } catch (error) {
            console.error(error);
            alert("There was an error logging out. Please try again.");
        }
    };

    return (
        <div>
            <NavBar />
            <div className="container">
                <h2>Welcome, Volunteer!</h2>
                <Button variant="danger" onClick={handleLogout}>Log Out</Button>
            </div>
        </div>
    );
};

export default VolunteerHomePage;
