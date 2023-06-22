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

// Styling from library 
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
   
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


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
                            <StyledTableCell align="left">Closing Date</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {activeProjects.map((project) => (
                            <StyledTableRow
                                key={project.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell onClick={() => navigate(`/projects/${project.id}/items`)} align="left">{project.project_name}</StyledTableCell>
                                <StyledTableCell align="left">{project.municipality}</StyledTableCell>
                                <StyledTableCell align="left">{project.contract_no}</StyledTableCell>
                                <StyledTableCell align="left">{project.closing_date.substring(0, 10)}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </section>
    );
}






{/* <div className='projects'>
    <ul className='projects__list'>
        {activeProjects.map((project) => (
            <Link key={project.id} to={`/projects/${project.id}/items`}>
                <li className='projects__item'>
                    <h1 className='projects__title'>{project.project_name}</h1>
                </li></Link>

        ))}
    </ul>

</div>
    )
} */}