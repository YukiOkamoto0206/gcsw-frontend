import React, { useEffect, useRef } from "react";
import axios from "axios";
import { useAuth0, withAuth0 } from "@auth0/auth0-react";
import { Form, Button } from "react-bootstrap";
import ReactDatePicker from "react-datepicker";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, tableCellClasses, styled } from "@mui/material";
import { Link } from "react-router-dom";
import { useDownloadExcel } from "react-export-table-to-excel";

const { useState } = React;

/**
 * custom table cell
 */
 const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 16,
    }
}));

/**
 * custom table row
 */
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0
    }
}));

/**
 * Participant hook that displays participant list information in table cells
 * Contains links to Edit page and Delete action
 */
const Participant = props => (
    <StyledTableRow>
        <StyledTableCell component="th" scope="row">{props.participant.participant_id}</StyledTableCell>
        <StyledTableCell align="right">{props.participant.first_name}</StyledTableCell>
        <StyledTableCell align="right">{props.participant.last_name}</StyledTableCell>
        <StyledTableCell align="right">{props.participant.gender}</StyledTableCell>
        <StyledTableCell align="right">{props.participant.age}</StyledTableCell>
        <StyledTableCell align="right">{props.participant.school}</StyledTableCell>
        <StyledTableCell align="right">{props.participant.dates_with_objectives[props.date.toDateString()]}</StyledTableCell>
        <StyledTableCell align="right">
            <Link to={"/edit/"+props.participant._id}>Edit</Link> | <a href="#" onClick={() => { props.deleteEntry(props.participant._id, props.date) }}>Delete</a>
        </StyledTableCell>
    </StyledTableRow>
)

/**
 * React Hook for displaying participant attendance list by date
 * @returns ParticipantList HTML template
 */
const ParticipantList = () => {
    /**
     * default state
     * empty array of participants
     * current date
     * empty access token
     */
    const [state, setState] = useState({
        participants: [],
        date: new Date(),
        token: ''
    });

    /**
     * Used for exporting table and downloading an Excel file
     */
    const tableRef = useRef(null);

    const { onDownload } = useDownloadExcel({
        currentTableRef: tableRef.current,
        filename: `Participants (${state.date})`,
        sheet: "Participants"
    });

    // method to retreive authenticated user's access token
    const { getAccessTokenSilently } = useAuth0();

    /**
     * On page load, retrieve attendance of current date
     */
    useEffect(() => {
        onChangeDate(state.date);
    }, [state.date]);

    /**
     * Show attendance records of given date
     * @param {selected date} date 
     */
    const onChangeDate = async (date) => {
        const token = await getAccessTokenSilently();
        
        // GET request to retrieve participants who have signed in on specified date
        axios.get(`${process.env.REACT_APP_SERVER_URL}/participants/date/${date.toDateString()}`, { 
            headers: {
                authorization: `Bearer ${token}`,
            }
        })
        // set state variables using response data, selected date, and access token
        .then(response => {
            setState({
                participants: response.data, 
                date: date,
                token: token
            });
        })
        .catch((error) => {
            console.log(error); 
        });
    }

    /**
     * Deletes participant from current attendance list (i.e. signs out the participant for selected date)
     * @param {participant's MongoDB Object ID} object_id 
     * @param {selected date} date 
     */
    const deleteEntry = async (object_id, date) => {
        // PUT request to delete the selected participant sign-in entry
        axios.put(`${process.env.REACT_APP_SERVER_URL}/participants/delete_entry/${object_id}/${date.toDateString()}`, {
            // NOTE: There is a bug that might be causing this access token to not be send in the header correctly, needs to be fixed
            headers: {
                authorization: `Bearer ${state.token}`,
            }
        })
        .then(() => {
            alert("Entry successfully deleted");
        })
        .catch((error) => {
            console.log(error);
        });

        // update table to reflect deleted participant entry
        setState({
            participants: state.participants.filter(el => el._id !== object_id && el.date !== date),
            date: date
        });
    }

    /**
     * Display list of participants
     * @returns rows of Participant hooks
     */
    const participantList = () => {
        return state.participants.map(currentParticipant => {
            return <Participant date={state.date} participant={currentParticipant} deleteEntry={deleteEntry} key={currentParticipant.participant_id}/>;
        })
    }

    return (
        <div>
            <h3>Logged Participants</h3>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Search by Date:</Form.Label>
                    <ReactDatePicker
                        className="input"
                        onChange={onChangeDate}
                        selected={state.date}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Button variant="success" onClick={onDownload}>Export Table to XLS</Button>
                </Form.Group>
            </Form>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} ref={tableRef} aria-label="customized table">
                    <TableHead >
                        <TableRow>
                            <StyledTableCell><b>User ID / ID de Usuario</b></StyledTableCell>
                            <StyledTableCell align="right"><b>First Name / Nombre de Pila</b></StyledTableCell>
                            <StyledTableCell align="right"><b>Last Name / Apellido</b></StyledTableCell>
                            <StyledTableCell align="right"><b>Gender / Género</b></StyledTableCell>
                            <StyledTableCell align="right"><b>Age / Edad</b></StyledTableCell>
                            <StyledTableCell align="right"><b>School / Escuela</b></StyledTableCell>
                            <StyledTableCell align="right"><b>Objective of the Day / Objetivo del Dia</b></StyledTableCell>
                            <StyledTableCell align="right"><b>Actions / Acciones</b></StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { participantList() }
                    </TableBody>
                </Table>
            </TableContainer>
            <br/>
        </div>
    )
}

export default withAuth0(ParticipantList);