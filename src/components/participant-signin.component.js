import React, { Component } from "react";
import axios from "axios";
import { withAuth0 } from "@auth0/auth0-react";
import { Row, Col, Form, Button } from 'react-bootstrap';
import { Alert, Snackbar } from "@mui/material";
import ReactDatePicker from "react-datepicker";
import LogOutModal from "./logout-modal.component";
import "react-datepicker/dist/react-datepicker.css"

/**
 * Component for participant sign-in page
 * TODO (optional): Refactor code to React Hook
 */
class ParticipantSignin extends Component {
    /**
     * Constructor binds functions and sets default state values
     * @param {*} props 
     */
    constructor(props) {
        super(props);

        this.onChangeParticipantId = this.onChangeParticipantId.bind(this);
        this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this);
        this.onChangeVolunteerId = this.onChangeVolunteerId.bind(this);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeGender = this.onChangeGender.bind(this);
        this.onChangeAge = this.onChangeAge.bind(this);
        this.onChangeSchool = this.onChangeSchool.bind(this);
        this.onChangeObjective = this.onChangeObjective.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmitParticipant = this.onSubmitParticipant.bind(this);
        this.onSubmitVolunteer = this.onSubmitVolunteer.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.setOpenModal = this.setOpenModal.bind(this);

        // default state values of form fields
        this.state = {
            participant_id: '',
            volunteer_id: '',
            participant_or_volunteer: '',
            first_name: '',
            last_name: '',
            gender: '',
            age: 1,
            school: '',
            objective: '',
            date: new Date(), // defaults to current date
            is_signed_in: false,
            open: false,
            modalOpen: false,
            phone_number: '',
            volunteer_title: ''
        }

    }


    onChangeVolunteerId = async (e) => {
        axios.get(`${process.env.REACT_APP_SERVER_URL}/volunteers/volunteer_id/${e.target.value}`)
            .then(response => {
                // if only one participant is returned, then they are in the database
                if (response.data[1] === undefined) {
                    // update field forms with participant credentials
                    this.setState({
                        first_name: response.data[0].first_name,
                        last_name: response.data[0].last_name,
                        gender: response.data[0].gender,
                        age: response.data[0].age,
                        phone_number: response.data[0].phone_number,
                        // school: response.data[0].school,
                        // checks if the participant's latest sign-in matches the current day
                        is_signed_in: response.data[0].is_signed_in,
                        volunteer_title: response.data[0].volunteer_title
                    })
                }
                console.log(this.state.is_signed_in, response.data)

            })
            .catch((error) => {
                this.setState({
                    is_signed_in: false
                })
                console.log(error);
            });

        // set participant_id state variable
        this.setState({
            volunteer_id: e.target.value
        });
    }

    /**
     * checks if the participant has signed in once before
     */
    onChangeParticipantId = async (e) => {
        // GET request with participant id as the parameter
        axios.get(`${process.env.REACT_APP_SERVER_URL}/participants/participant_id/${e.target.value}`)
            .then(response => {
                // if only one participant is returned, then they are in the database
                if (response.data[1] === undefined) {
                    // update field forms with participant credentials
                    this.setState({
                        first_name: response.data[0].first_name,
                        last_name: response.data[0].last_name,
                        gender: response.data[0].gender,
                        age: response.data[0].age,
                        school: response.data[0].school,
                        // checks if the participant's latest sign-in matches the current day
                        is_signed_in: this.isToday(response.data[0].dates_with_objectives)
                    })
                }
            })
            .catch((error) => {
                console.log(error);
            });

        // set participant_id state variable
        this.setState({
            participant_id: e.target.value
        });
    }

    /**
     * Checks if the participant has already signed in for the day
     * @param {*} dates 
     * @returns 
     */
    isToday = (dates) => {
        const currentDate = this.state.date.toDateString();

        return dates[currentDate] !== undefined;
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

    onChangeStatus = (e) => {
        this.setState({
            participant_or_volunteer: e.target.value
        })
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
     * update school
     */
    onChangeSchool = (e) => {
        this.setState({
            school: e.target.value
        });
    }

    /**
     * update objective
     */
    onChangeObjective = (e) => {
        this.setState({
            objective: e.target.value
        });
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

    onSubmitVolunteer = async (e) => {
        e.preventDefault();

        // if the participant has already signed in, open snackbar message
        if (this.state.is_signed_in) {
            this.setState({
                open: true
            })
            // else, sign in the volunteer
        } else {
            const volunteer = {
                volunteer_id: this.state.volunteer_id,
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                gender: this.state.gender,
                age: this.state.age,
                date: this.state.date.toDateString(),
                phone_number: this.state.phone_number,
                is_signed_in : this.state.is_signed_in
            }


            // POST request to sign in the participant
            axios.post(`${process.env.REACT_APP_SERVER_URL}/volunteers/signin`, volunteer, {
                headers: {
                }
            })
                // alert message of successful sign-in, refresh page to clear form fields
                .then(response => {
                    alert( volunteer.first_name + " has signed in! Don't forget to sign out!");
                    console.log(response.data);
                    window.location = '/';
                })
                .catch((error) => {
                    console.log(error);
                });
        }

        console.log(this.state.date)
    }

    /**
     * Handles sign in button click
     * @param {*} e 
     */
    onSubmitParticipant = async (e) => {
        e.preventDefault();

        // if the participant has already signed in, open snackbar message
        if (this.state.is_signed_in) {
            this.setState({
                open: true
            })
            // else, sign in the participant
        } else {
            const participant = {
                participant_id: this.state.participant_id,
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                gender: this.state.gender,
                age: this.state.age,
                school: this.state.school,
                objective: this.state.objective,
                date: this.state.date.toDateString()
            }

            // POST request to sign in the participant
            axios.post(`${process.env.REACT_APP_SERVER_URL}/participants/signin`, participant, {
                headers: {
                }
            })
                // alert message of successful sign-in, refresh page to clear form fields
                .then(response => {
                    alert( participant.first_name + " has signed in! Don't forget to sign out!");
                    console.log(response.data);
                    window.location = '/';
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    /**
     * Handle close of snackbar
     */
    handleClose = (event, reason) => {
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
                {!this.state.is_signed_in && (<h3 className="mb-3">Sign In</h3>)}
                {this.state.is_signed_in && (<h3 className="mb-3">Log Out</h3>)}
                {/* <h3 className="mb-3">Sign In/Log Out</h3> */}
                <Form>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="formId">
                                <Form.Label>User ID / ID de Usuario:</Form.Label>
                                <Form.Control
                                    type="text"
                                    required
                                    defaultValue={this.state.participant_id}
                                    onBlur={this.state.participant_or_volunteer === "Participant" ? this.onChangeParticipantId : this.onChangeVolunteerId} />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Label>Participant or Volunteer:</Form.Label>
                            <Form.Control as="select"
                                ref="userInput"
                                required
                                value={this.state.participant_or_volunteer}
                                onChange={this.onChangeStatus}>
                                <option value="">Select One:</option>
                                <option value="Participant">Participant</option>
                                <option value="Volunteer">Volunteer</option>
                            </Form.Control>
                        </Col>
                    </Row>

                    <Form.Group className="mb-3" controlId="formName">
                        <Row>
                            <Col>
                                <Form.Label>First Name / Nombre de Pila:</Form.Label>
                                <Form.Control
                                    type="text"
                                    required
                                    value={this.state.first_name}
                                    onChange={this.onChangeFirstName} />
                            </Col>
                            <Col>
                                <Form.Label>Last Name / Apellido:</Form.Label>
                                <Form.Control
                                    type="text"
                                    required
                                    value={this.state.last_name}
                                    onChange={this.onChangeLastName} />
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGenderAndAge">
                        <Row>
                            <Col>
                                <Form.Label>Gender / Género:</Form.Label>
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
                                <Form.Label>Age / Edad:</Form.Label>
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
                    
                    {this.state.participant_or_volunteer === "Volunteer" && (
                    <Form.Group className="mb-3" >
                        <Row>
                            <Col>
                                <Form.Label>Phone Number:</Form.Label>
                                <Form.Control 
                                type="text"
                                required
                                pattern="[0-9]*" 
                                value={this.state.phone_number}
                                onChange={this.onChangePhoneNumber}/>
                            </Col>
                            <Col>
                                <Form.Label>Volunteer Title:</Form.Label>
                                <Form.Control 
                                type="text"
                                required
                                value={this.state.volunteer_title}
                                disabled
                                />
                            </Col>
                        </Row>
                    </Form.Group> )}

                    {this.state.participant_or_volunteer === 'Participant' && (
                        <Form>
                            <Form.Group className="mb-3" controlId="formSchool">
                                <Form.Label>School / Escuela:</Form.Label>
                                <Form.Control as="select"
                                    ref="userInput"
                                    required
                                    value={this.state.school}
                                    onChange={this.onChangeSchool}>
                                    <option value="">School / Escuela</option>
                                    <option value="Greenfield High School">Greenfield High School (GHS)</option>
                                    <option value="Vista Verde Middle School">Vista Verde Middle School (VVMS)</option>
                                    <option value="Oak Avenue Elementary School">Oak Avenue Elementary School (OAK)</option>
                                    <option value="Mary Chapa Academy">Mary Chapa Academy (MCA)</option>
                                    <option value="Cesar Chavez Elementary School">Cesar Chavez Elementary School (CCE)</option>
                                    <option value="Arroyo Seco Middle School">Arroyo Seco Middle School (ASMS)</option>
                                    <option value="Other / Otra">Other / Otra</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formObjective">
                                <Form.Label>What do you want to do today? Que quieres hacer hoy?</Form.Label>
                                <textarea
                                    type="text"
                                    className="form-control"
                                    value={this.state.objective}
                                    onChange={this.onChangeObjective} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formDate">
                                <Form.Label>Date / Fecha:</Form.Label>
                                <ReactDatePicker
                                    className="input"
                                    id="date-picker"
                                    required
                                    placeholderText="Select date"
                                    readOnly={true}
                                    onChange={this.onChangeDate}
                                    selected={this.state.date}
                                />
                            </Form.Group>
                        </Form>
                    )}



                    {/* <Form.Group className="mb-3" controlId="formSchool">
                        <Form.Label>School / Escuela:</Form.Label>
                        <Form.Control as="select"
                            ref="userInput"
                            required
                            value={this.state.school}
                            onChange={this.onChangeSchool}>
                            <option value="">School / Escuela</option>
                            <option value="Greenfield High School">Greenfield High School (GHS)</option>
                            <option value="Vista Verde Middle School">Vista Verde Middle School (VVMS)</option>
                            <option value="Oak Avenue Elementary School">Oak Avenue Elementary School (OAK)</option>
                            <option value="Mary Chapa Academy">Mary Chapa Academy (MCA)</option>
                            <option value="Cesar Chavez Elementary School">Cesar Chavez Elementary School (CCE)</option>
                            <option value="Arroyo Seco Middle School">Arroyo Seco Middle School (ASMS)</option>
                            <option value="Other / Otra">Other / Otra</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formObjective">
                        <Form.Label>What do you want to do today? Que quieres hacer hoy?</Form.Label>
                        <textarea
                            type="text"
                            className="form-control"
                            value={this.state.objective}
                            onChange={this.onChangeObjective}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formDate">
                        <Form.Label>Date / Fecha:</Form.Label>
                        <ReactDatePicker
                            className="input"
                            id="date-picker"
                            required
                            placeholderText="Select date"
                            readOnly={true}
                            onChange={this.onChangeDate}
                            selected={this.state.date}
                            />
                    </Form.Group> */}
                    <Form.Group className="mb-3" controlId="formButton">

                        {this.state.participant_or_volunteer === "Volunteer" && this.state.is_signed_in && (
                            <Button variant="danger" onClick={() => {this.setOpenModal(true)}}>Log Out</Button>
                        )}

                        {this.state.modalOpen && <LogOutModal setOpenModal={this.setOpenModal} volunteer_id={this.state.volunteer_id} date={this.state.date.toDateString()}/>}

                        {!(this.state.participant_or_volunteer === "Volunteer" && this.state.is_signed_in) && (
                            <Button variant="primary" type="submit" onClick={this.state.participant_or_volunteer === 'Participant' ? this.onSubmitParticipant : this.onSubmitVolunteer}>Sign In</Button>
                        )}

                        {/* <Button variant="primary" type="submit" onClick={this.state.participant_or_volunteer === 'Participant' ? this.onSubmitParticipant : this.onSubmitVolunteer}>Sign In</Button> */}
                        <Snackbar open={this.state.open} autoHideDuration={6000} onClose={this.handleClose}>
                            <Alert onClose={this.handleClose} severity="error" >
                                You have already signed in today!
                            </Alert>
                        </Snackbar>
                    </Form.Group>
                </Form>
            </div>
        )
    }
}

export default withAuth0(ParticipantSignin);