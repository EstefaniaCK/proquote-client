import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import * as React from 'react';

const ColorTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));
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


export default function BidsList() {
    const [details, setDetails] = useState([]);
    const [activeProject, setActiveProject] = useState({});
    const { projectid } = useParams();

    useEffect(() => {
        axios
            .get(`http://localhost:8080/projects/${projectid}/bids`)
            .then((response) => {
                setDetails(response.data);
            });
    }, [projectid]);

    useEffect(() => {
        axios.get('http://localhost:8080/projects')
            .then((response) => {
                const projectIdNumber = parseInt(projectid, 10);
                const project = response.data.find((project) => project.id === projectIdNumber);
                setActiveProject(project);
            });
    }, [projectid]);
    console.log(activeProject);

    const maxBids = details.reduce(
        (max, detail) => Math.max(max, detail.bids.length),
        0
    );
    const calculateGrandTotal = () => {
        const grandTotal = Array(maxBids).fill(0);

        details.forEach((detail) => {
            detail.bids.forEach((bid, index) => {
                const unitPrice = parseFloat(bid.unit_price) || 0;
                const subtotal = unitPrice * detail.quantity;
                grandTotal[index] += subtotal;
            });
        });

        return grandTotal.map((total) => total.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }));
    };

    const renderGrandTotalRow = () => {
        const grandTotal = calculateGrandTotal();


        return (
            <StyledTableRow>
                <ColorTableCell align="left" colSpan={3}></ColorTableCell>
                <ColorTableCell align="left">GRAND TOTAL</ColorTableCell>
                <ColorTableCell align="left" colSpan={1}></ColorTableCell>
                {Array(maxBids).fill().map((_, index) => (
                    <ColorTableCell align="left" key={index} colSpan={3}>
                        {grandTotal[index]}
                    </ColorTableCell>
                ))}
            </StyledTableRow>
        );
    };


    return (
        <section className="items-list__table">
            {activeProject && (
                <React.Fragment>
                    <h1>{activeProject.project_name}</h1>
                    <p>{activeProject.municipality}</p>
                    <p>Contract No: {activeProject.contract_no}</p>
                    <p>
                        Closing Date:{" "}
                        {activeProject.closing_date &&
                            new Date(activeProject.closing_date).toLocaleDateString("en-US", {
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                            })}
                    </p>
                </React.Fragment>
            )}
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="customized table">
                    <TableHead>
                        <StyledTableRow>
                            <ColorTableCell align="left">Item Name</ColorTableCell>
                            <ColorTableCell align="left">Unit</ColorTableCell>
                            <ColorTableCell align="left">Quantity</ColorTableCell>
                            {Array(maxBids)
                                .fill()
                                .map((_, index) => (
                                    <React.Fragment key={index}>
                                        <ColorTableCell align="left">Company Name</ColorTableCell>
                                        <ColorTableCell align="left">Unit Price</ColorTableCell>
                                        <ColorTableCell align="left">Total</ColorTableCell>
                                    </React.Fragment>
                                ))}
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {details.map((detail) => (
                            <StyledTableRow key={detail.id}>
                                <StyledTableCell align="left">{detail.name}</StyledTableCell>
                                <StyledTableCell align="left">{detail.unit}</StyledTableCell>
                                <StyledTableCell align="left">{detail.quantity}</StyledTableCell>
                                {Array(maxBids)
                                    .fill()
                                    .map((_, index) => {
                                        const bid = detail.bids[index];
                                        return (
                                            <React.Fragment key={index}>
                                                <StyledTableCell align="left">
                                                    {bid?.company_name}
                                                </StyledTableCell>
                                                <StyledTableCell align="left">
                                                    {bid?.unit_price}
                                                </StyledTableCell>
                                                <StyledTableCell align="left">
                                                    {bid ? (parseFloat(bid.unit_price) * detail.quantity).toLocaleString(undefined, {
                                                        minimumFractionDigits: 2,
                                                        maximumFractionDigits: 2
                                                    }) : ''}
                                                </StyledTableCell>
                                            </React.Fragment>
                                        );
                                    })}
                            </StyledTableRow>
                        ))}
                        {renderGrandTotalRow()}
                    </TableBody>
                </Table>
            </TableContainer>
        </section>
    );
}
