import React, { useEffect } from "react";
import axios from "axios";
import { useAuth0, withAuth0 } from "@auth0/auth0-react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { Link, Navigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { confirmAlert } from "react-confirm-alert";
import { useNavigate } from "react-router-dom";

import 'react-confirm-alert/src/react-confirm-alert.css';

const { useState } = React;

const EditParticipant = () => {
    const [state, setState] = useState({
        participant_id: '',
        first_name: '',
        last_name: '',
        gender: '',
        age: 1,
        school: '',
        objective: '',
        date: new Date() // defaults to current date
    });

    const { register, handleSubmit, formState: { errors }, formState } = useForm();
    const { id } = useParams();
    const { getAccessTokenSilently } = useAuth0();
    const navigate = useNavigate();

    useEffect(() => {
        getUser();
    }, [id]);

    const getUser = async () => {
        const token = await getAccessTokenSilently();
        
        axios.get(`${process.env.REACT_APP_SERVER_URL}/participants/id/${id}`, {
            headers: {
                authorization: `Bearer ${token}`,
            }
        })
        .then(response => setState(response.data))
        .catch((error) => {
            console.log(error);
        });
    }

    const handleChange = e => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
        console.log(state);
    }

    const onUpdate = async () => {
        const token = await getAccessTokenSilently();

        const participant = {
            participant_id: state.participant_id,
            first_name: state.first_name,
            last_name: state.last_name,
            gender: state.gender,
            age: state.age,
            school: state.school
        };

        confirmAlert({
            title: 'Confirm changes?',
            message: 'Are you sure you wish to save these changes?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        axios.put(`${process.env.REACT_APP_SERVER_URL}/participants/edit/${id}`, participant, {
                            headers: {
                                authorization: `Bearer ${token}`
                            }
                        })
                        .then(() => {
                            alert("Participant has been updated!");
                            navigate(`/edit/${id}`);
                        })
                        .catch((error) => {
                            console.log(error);
                        })
                    }
                },
                {
                    label: 'No'
                }
            ]
        });
    }

    const onDelete = async () => {
        const token = await getAccessTokenSilently();

        confirmAlert({
            title: 'Confirm deletion?',
            message: 'Are you sure you wish to delete this participant?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        axios.delete(`${process.env.REACT_APP_SERVER_URL}/participants/delete/${id}`, {
                            headers: {
                                authorization: `Bearer ${token}`
                            }
                        })
                        .then(() => {
                            alert("Participant has been deleted!");
                            navigate('/participants');
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                    }
                },
                {
                    label: 'No'
                }
            ]
        });
    }

    return (
        <div>
            <h3 className="mb-3">Edit Participant</h3>
            <Form method="post">
                <Form.Group className="mb-3" controlId="formId">
                    <Form.Label>User ID / ID de Usuario:</Form.Label>
                    <Form.Control 
                        type="text" 
                        value={state.participant_id}
                        onChange={handleChange}
                        name="participant_id" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formName">
                    <Row>
                        <Col>
                            <Form.Label>First Name / Nombre de Pila:</Form.Label>
                            <Form.Control 
                                type="text" 
                                value={state.first_name}
                                onChange={handleChange}
                                name="first_name" />
                        </Col>
                        <Col>
                            <Form.Label>Last Name / Apellido:</Form.Label>
                            <Form.Control 
                                type="text" 
                                value={state.last_name}
                                onChange={handleChange}
                                name="last_name" />
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Row>
                        <Col>
                            <Form.Label>Gender / Género:</Form.Label>
                            <Form.Control as="select"
                                type="text" 
                                value={state.gender}
                                onChange={handleChange}
                                name="gender">
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
                                value={state.age}
                                min="1"
                                max="99"
                                onChange={handleChange}
                                name="age" />
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group className="form-group">
                    <Form.Label>School:</Form.Label>
                    <Form.Control as="select"
                        type="text" 
                        value={state.school}
                        onChange={handleChange}
                        name="school" >
                        <option value="">Choose a school</option>
                        <option value="Greenfield High">Greenfield High School (GHS)</option>
                        <option value="Vista Verde">Vista Verde Middle School (VVMS)</option>
                        <option value="Oak Avenue">Oak Avenue Elementary School (OAK)</option>
                        <option value="Mary Chapa">Mary Chapa Academy (MCA)</option>
                        <option value="Cesar Chavez">Cesar Chavez Elementary School (CCE)</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Row>
                        <Col>
                            <Button variant="primary" onClick={onUpdate}>Update</Button>
                        </Col>
                        <Col>
                            <Button variant="danger" onClick={onDelete}>Delete</Button>
                        </Col>
                    </Row>
                </Form.Group>
            </Form>
        </div>
    );
}

export default withAuth0(EditParticipant);