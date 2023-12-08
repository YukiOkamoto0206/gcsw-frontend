import NavBar from './navbar.component'; 
import React, { Component } from "react";
import axios from "axios";
import { withAuth0 } from "@auth0/auth0-react";
import { Row, Col, Form, Button } from 'react-bootstrap';
import { Alert, Snackbar } from "@mui/material";
import "react-datepicker/dist/react-datepicker.css"
import './first-time-participant.css';
import './navbar.css';
import './first-time-volunteer.css'

/**
 * Component for volunteer sign-up page
 * TODO (optional): Refactor code to React Hook
 */

class VolunteerSignup extends Component {

    /**
     * Constructor sets default state values
     * @param {*} props 
     */
    constructor(props) {
        super(props);
    
        this.state = {
            first_name: '',
            last_name: '',
            gender: '',
            age: 1,
            date: new Date(),
            is_signed_in: false,
            open: false,
        }
    }
    
    /**
     * Checks if the volunteer has already signed in for the day
     * @param {*} dates 
     * @returns 
     */
    isToday = (dates) => {
        const currentDate = this.state.date.toDateString();

        return dates[currentDate] !== undefined;
    }

    /**
     * update volunteer id
     */
    onChangeVolunteerId = (e) => {
        this.setState({
            volunteer_id: e.target.value
        });
    }

    /**
     * update first name
     */
    onChangeFirstName = (e) => {
        this.setState({
            first_name: e.target.value
        });
    }

    /**
     * update last name
     */
    onChangeLastName = (e) => {
        this.setState({
            last_name: e.target.value
        });
    }

    /**
     * update gender
     */
    onChangeGender = (e) => {
        this.setState({
            gender: e.target.value
        });
    }


    /**
     * update age
     */
    onChangeAge = (e) => {
        this.setState({
            age: e.target.value
        });
    }

    onChangePhoneNumber = (e) => {
        this.setState({
            phone_number: e.target.value
        })
    }

    /**
     * update date
     */
    onChangeDate = (date) => {
        this.setState({
            date: date
        });
    }

    setOpenModal = (value) => {
        this.setState({ modalOpen: value });
    }

    /**
     * Handles sign in button click
     * @param {*} e 
     */
    handleSubmit = async (event) => {
        event.preventDefault();

        if (this.state.is_signed_in) {
            this.setState({
                open: true
            });
        } else {
            const volunteer = {
                volunteer_id: this.state.volunteer_id,
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                gender: this.state.gender,
                age: this.state.age,
                phone_number: this.state.phone_number,
                date: this.state.date.toDateString()
            };

            try {
                const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/volunteers/signin`, volunteer);
                alert("You have successfully signed up, " + volunteer.first_name + "!");
                console.log(response.data);
                window.location = '/volunteers-first-page';
            } catch (error) {
                console.error('There was an error during sign up:', error);
                alert('There was an issue with the sign-up process. Please try again.');
            }
        }
    };

    /**
     * Handle close of snackbar
     */
    handleClose = (reason) => {
        if (reason === 'clickaway') {
            return;
        }

        // close the snackbar
        this.setState({
            open: false
        })
    }
    
    render() {
        return (
            <div>

                <div className="nav-container">
                    <NavBar />  {/* Include NavBar */}
                </div>

                <div class="form-container">
                    <h1 class="form-heading">Volunteer Sign Up</h1>
                    <Form onSubmit={this.handleSubmit}>
                        <Row>
                            <Col>
                                <Form.Group controlId="formId">
                                    <Form.Label><b>User ID / ID de Usuario:</b> <i>(First Name)(Last Name)(Year of Birth)</i></Form.Label>
                                    <Form.Control
                                        type="text"
                                        required
                                        defaultValue={this.state.volunteer_id}
                                        onBlur={this.onChangeVolunteerId} />
                                </Form.Group>
                            </Col>
                            
                        </Row>

                        <Form.Group controlId="formName">
                            <Row>
                                <Col>
                                    <Form.Label class="form-label" for="firstName"><b>First Name / Nombre de Pila:</b></Form.Label>
                                    <Form.Control
                                        class="form-input"
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        required
                                        value={this.state.first_name}
                                        onChange={this.onChangeFirstName} />
                                </Col>
                                <Col>
                                    <Form.Label><b>Last Name / Apellido:</b></Form.Label>
                                    <Form.Control
                                        type="text"
                                        required
                                        value={this.state.last_name}
                                        onChange={this.onChangeLastName} />
                                </Col>
                            </Row>
                        </Form.Group>
                        <Form.Group controlId="formGenderAndAge">
                            <Row>
                                <Col>
                                    <Form.Label><b>Gender / Genero:</b></Form.Label>
                                    <Form.Control as="select"
                                        ref="userInput"
                                        required
                                        value={this.state.gender}
                                        onChange={this.onChangeGender}>
                                        <option value="">Gender / Género:</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="N/A">Decline to say</option>
                                    </Form.Control>
                                </Col>
                                <Col>
                                    <Form.Label><b>Age / Edad:</b></Form.Label>
                                    <Form.Control
                                        type="number"
                                        required
                                        min="1"
                                        max="99"
                                        value={this.state.age}
                                        onChange={this.onChangeAge} />
                                </Col>
                            </Row>
                        </Form.Group>

                        <Form.Group>
                            <Row>
                                <Col>
                                    <Form.Label><b>Phone Number / Numero de Telefono:</b> <i>(Ex: 5555555555)</i></Form.Label>
                                    <Form.Control
                                        type="number"
                                        required
                                        value={this.state.phone_number}
                                        onChange={this.onChangePhoneNumber} />
                                </Col>
                            </Row>
                        </Form.Group>

                        <Form.Group controlId="formButton">
                            <Button variant="primary" type="submit">Sign Up</Button>
                            <Snackbar open={this.state.open} autoHideDuration={6000} onClose={this.handleClose}>
                                <Alert onClose={this.handleClose} severity="error">
                                    You have successfully signed up!
                                </Alert>
                            </Snackbar>
                        </Form.Group>

                    </Form>
                </div>
            </div>
        )
    }
}

export default withAuth0(VolunteerSignup);