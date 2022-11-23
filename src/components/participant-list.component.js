import React, { useEffect, useRef } from "react";
import axios from "axios";
import { useAuth0, withAuth0 } from "@auth0/auth0-react";
import { Form, Button } from "react-bootstrap";
import ReactDatePicker from "react-datepicker";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, tableCellClasses, styled } from "@mui/material";
import { Link } from "react-router-dom";
import { useDownloadExcel } from "react-export-table-to-excel";
import { style } from "@mui/system";

const { useState } = React;

/**
 * 
 * @param {*} props 
 * @returns 
 */

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

const ParticipantList = () => {
    const [state, setState] = useState({
        participants: [],
        date: new Date()
    });

    const tableRef = useRef(null);

    const { onDownload } = useDownloadExcel({
        currentTableRef: tableRef.current,
        filename: `Participants (${state.date})`,
        sheet: "Participants"
    });

    // 
    const { getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        onChangeDate(state.date);
    }, [state.date]);

    /**
     * 
     * @param {*} date 
     */
    const onChangeDate = async (date) => {
        const token = await getAccessTokenSilently();
        
        axios.get(`${process.env.REACT_APP_SERVER_URL}/participants/date/${date.toDateString()}`, { 
            headers: {
                authorization: `Bearer ${token}`,
            }
            })
            .then(response => {
                setState({
                    participants: response.data, 
                    date: date 
                });
            })
            .catch((error) => {
                console.log(error); 
            });
    }

    /**
     * 
     * @param {*} id 
     * @param {*} date 
     */
    const deleteEntry = async (id, date) => {
        const token = await getAccessTokenSilently();

        //
        axios.put(`${process.env.REACT_APP_SERVER_URL}/participants/delete_entry/${id}/${date.toDateString()}`, {
            headers: {
                authorization: `Bearer ${token}`,
            }
            })
            .then(() => {
                alert("Entry successfully deleted");
            })
            .catch((error) => {
                console.log(error);
            });

            setState({
                participants: state.participants.filter(el => el._id !== id && el.date !== date),
                date: date
            });
    }

    /**
     * 
     * @returns 
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