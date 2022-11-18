import React, { useEffect } from "react";
import axios from "axios";
import { useAuth0, withAuth0 } from "@auth0/auth0-react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

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

        axios.put(`${process.env.REACT_APP_SERVER_URL}/participants/edit/${id}`, participant, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        .then(() => {
            alert("Participant has been updated!");
            window.location = `/edit/${id}`;
        })
        .catch((error) => {
            console.log(error);
        })
    }

    const onDelete = async () => {
        const token = await getAccessTokenSilently();

        axios.delete(`${process.env.REACT_APP_SERVER_URL}/participants/delete/${id}`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        .then(() => {
            alert("Participant has been deleted!");
            window.location = '/participants';
        })
        .catch((error) => {
            console.log(error);
        });
    }

    return (
        <div>
            <h3 className="mb-3">Edit Participant</h3>
            <form onSubmit={handleSubmit(onUpdate)}>
                <div className="form-group">
                    <label>ID:</label>
                    <input 
                        type="text" 
                        value={state.participant_id}
                        className="form-control" 
                        placeholder="Enter ID here"
                        onChange={handleChange}
                        name="participant_id" />
                </div>
                <div className="form-group">
                    <label>First Name:</label>
                    <input 
                        type="text" 
                        value={state.first_name}
                        className="form-control" 
                        placeholder="Enter first name here"
                        onChange={handleChange}
                        name="first_name" />
                </div>
                <div className="form-group">
                    <label>Last Name:</label>
                    <input 
                        type="text" 
                        value={state.last_name}
                        className="form-control" 
                        placeholder="Enter last name here"
                        onChange={handleChange}
                        name="last_name" />
                </div>
                <div className="form-group">
                    <label>Gender:</label>
                    <select 
                        type="text" 
                        value={state.gender}
                        className="form-control" 
                        placeholder="Enter gender here"
                        onChange={handleChange}
                        name="gender">
                        <option value="">Choose a gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="N/A">Decline to say</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Age:</label>
                    <input 
                        type="number" 
                        value={state.age}
                        className="form-control" 
                        placeholder="Enter age here"
                        min="1"
                        max="99"
                        onChange={handleChange}
                        name="age" />
                </div>
                <div className="form-group">
                    <label>School:</label>
                    <select
                        type="text" 
                        value={state.school}
                        className="form-control" 
                        placeholder="Enter school here"
                        onChange={handleChange}
                        name="school" >
                        <option value="">Choose a school</option>
                        <option value="Greenfield High">Greenfield High School (GHS)</option>
                        <option value="Vista Verde">Vista Verde Middle School (VVMS)</option>
                        <option value="Oak Avenue">Oak Avenue Elementary School (OAK)</option>
                        <option value="Mary Chapa">Mary Chapa Academy (MCA)</option>
                        <option value="Cesar Chavez">Cesar Chavez Elementary School (CCE)</option>
                    </select>
                </div>
                <div className="form-group">
                        <input type="submit" value="Update" className="btn btn-primary" />
                </div>
            </form>
            <form onSubmit={handleSubmit(onDelete)}>
                <input type="submit" value="Delete" className="btn btn-danger" />
            </form>
        </div>
    );
}

export default withAuth0(EditParticipant);