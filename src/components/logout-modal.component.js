import './modal.css'
import { Button, Form } from 'react-bootstrap';
import axios from 'axios'
import {useState} from 'react'
const LogOutModal = ({ setOpenModal, volunteer_id, date}) => {

    const [objective, setWhatDidYouDoToday] = useState('');
    const [suggestions, setVolunteerExperience] = useState('');

    const onLogout = async () => {
        axios.put(`${process.env.REACT_APP_SERVER_URL}/volunteers/logout`, {volunteer_id, objective, suggestions, date}, {
            headers: {
            }
        })
            // alert message of successful sign-in, refresh page to clear form fields
            .then(response => {
                alert("Volunteer has logged out!");
                console.log(response.data);
                window.location = '/'
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <>
            <div className="modalBackground">
                <div className="modalContainer">
                    <div className="title">
                        <h1>Supplemantary Questions</h1>
                    </div>
                    <div className="body">
                        <Form.Group className="mb-3" controlId="formObjective">
                            <Form.Label>What do you do today? Que hiciste hoy?</Form.Label>
                            <textarea type="text" className="form-control" value={objective} onChange={(e) => setWhatDidYouDoToday(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formObjective">
                            <Form.Label>How was your volunteer experience today? Tienes alguna sugerencia?</Form.Label>
                            <textarea type="text" className="form-control" value={suggestions} onChange={(e) => setVolunteerExperience(e.target.value)} />
                        </Form.Group>
                    </div>
                    <div className="footer">
                        <Button variant="primary"
                            style={{ marginRight: '30px' }}
                            onClick={(e) => {
                                e.preventDefault();
                                setOpenModal(false);
                            }}
                            id="cancelBtn"
                        >
                            Cancel
                        </Button>
                        <Button variant="danger" onClick={onLogout}>Confirm Logout</Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LogOutModal;