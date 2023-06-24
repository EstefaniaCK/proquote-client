import axios from 'axios';
import { useEffect, useState } from 'react';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import "./ProjectList.scss"
import Button from "@mui/material/Button";
import { blue } from "@mui/material/colors";

// Styling from library 
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
    width: "5%"
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },

    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText("#000000"),
    backgroundColor: "#000000",
    "&:hover": {
        backgroundColor: blue[700],
    },
}));

const ButtonContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    width: '40%',
    gap: '8px',
});

export default function ProjectList() {
    const navigate = useNavigate()
    const [activeProjects, setActiveProjects] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/projects')
            .then((response) => setActiveProjects(response.data))
    }, [])

    return (
        <section className='project-list__table'>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="left">Project Name</StyledTableCell>
                            <StyledTableCell align="left">Municipality</StyledTableCell>
                            <StyledTableCell align="left">Contract No.</StyledTableCell>
                            <StyledTableCell align="left" colSpan={2}>Closing Date</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {activeProjects.map((project) => (
                            <StyledTableRow
                                key={project.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <StyledTableCell align="left">{project.project_name}</StyledTableCell>
                                <StyledTableCell align="left">{project.municipality}</StyledTableCell>
                                <StyledTableCell align="left">{project.contract_no}</StyledTableCell>
                                <StyledTableCell align="left">{project.closing_date.substring(0, 10)}</StyledTableCell>
                                <StyledTableCell align="left">
                                    <ButtonContainer>
                                        <ColorButton size="small" type="submit" variant="contained"
                                            onClick={() => navigate(`/projects/${project.id}/items`)}>
                                            Submit Quote
                                        </ColorButton>
                                        <ColorButton size="small" type="submit" variant="contained"
                                            onClick={() => navigate(`/projects/${project.id}/bids`)} >
                                            View Bids
                                        </ColorButton>
                                    </ButtonContainer>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </section>
    );
}





