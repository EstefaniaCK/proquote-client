import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import "./ItemsList.scss"

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import { blue } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';



// Style for the button 
const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText('#000000'),
    backgroundColor: '#000000',
    '&:hover': {
        backgroundColor: blue[700],
    },
}));

// Table styling
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },

    '&:last-child td, &:last-child th': {
        border: 0,
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
}));

export default function ItemsList() {

    const [items, setItems] = useState([]);
    const [unitPrices, setUnitPrices] = useState({});
    const [inputPrice, setInputPrice] = useState(0);
    const [openModal, setOpenModal] = useState(false);
    const params = useParams();
    const projectid = params.projectid;


    useEffect(() => {
        axios.get(`http://localhost:8080/projects/${projectid}/items`)
            .then((response) => setItems(response.data))
    }, [projectid])

    const handleInputChange = (event, itemId) => {
        const { value } = event.target;
        setUnitPrices((prevPrices) => ({
            ...prevPrices,
            [itemId]: value,
        }));
        setInputPrice(event.target.value)
        console.log(inputPrice);
    };

    const formatNumber = (number) => {
        return number.toFixed(2).padStart(0, '0');
    };

    const calculateGrandTotal = () => {
        let grandTotal = 0;

        items.forEach((item) => {
            const unitPrice = parseFloat(unitPrices[item.id]) || 0;
            const subtotal = unitPrice * item.quantity;
            grandTotal += subtotal;
        });

        return grandTotal.toFixed(2);
    };

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const userIds = [1, 2, 3, 4, 5];
        const randomIndex = Math.floor(Math.random() * userIds.length);
        const randomUserId = userIds[randomIndex];

        const bid = {
            user_id: randomUserId,
            project_id: projectid,
            pricingList: items.map((item) => ({
                item_id: item.id,
                unit_price: unitPrices[item.id],
            })),
        };

        axios
            .post('http://localhost:8080/bids', bid)
            .then((response) => {
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const openModalHandler = () => {
        const unitPriceValues = Object.values(unitPrices);
        const allInputsFilled = unitPriceValues.every
            ((value) => value !== '' && !isNaN(parseFloat(value)));

        if (allInputsFilled) {
            setOpenModal(true);
        }
    };


    const closeModalHandler = () => {
        setOpenModal(false);
        navigate("/projects");
    };


    return (
        <section className='items-list__table'>
            <form onSubmit={handleSubmit}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="left">Item Name</StyledTableCell>
                                <StyledTableCell align="left">Unit</StyledTableCell>
                                <StyledTableCell align="left">Quantity</StyledTableCell>
                                <StyledTableCell align="left">Unit Price</StyledTableCell>
                                <StyledTableCell align="left">Total</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items.map((item) => (
                                < StyledTableRow
                                    key={item.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <StyledTableCell align="left">{item.name}</StyledTableCell>
                                    <StyledTableCell align="left">{item.unit}</StyledTableCell>
                                    <StyledTableCell align="left">{item.quantity}</StyledTableCell>
                                    <StyledTableCell>
                                        <FormControl sx={{ m: 1, width: '20ch' }} >
                                            <InputLabel htmlFor={`outlined-adornment-amount-${item.id}`}>Unit Price</InputLabel>
                                            <OutlinedInput
                                                id={`outlined-adornment-amount-${item.id}`}
                                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                                label="Unit Price" required
                                                type="number"
                                                align="left"
                                                value={unitPrices[item.id] || ''}
                                                onChange={(event) => handleInputChange(event, item.id)}
                                            />
                                        </FormControl>
                                    </StyledTableCell>
                                    <StyledTableCell align="left">{formatNumber(inputPrice * item.quantity)}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                            <StyledTableRow>
                                <StyledTableCell align="left">GRAND TOTAL</StyledTableCell>
                                <StyledTableCell align="left" colSpan={3}></StyledTableCell>
                                <StyledTableCell align="left">{calculateGrandTotal()}</StyledTableCell>
                            </StyledTableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Dialog open={openModal} onClose={closeModalHandler}>
                    <DialogTitle>Succes!</DialogTitle>
                    <DialogContent>
                        <p>Your quote has been submitted</p>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={closeModalHandler}>Close</Button>
                    </DialogActions>
                </Dialog>
                <div className='items-list__button'>
                    <ColorButton size="large" type="submit" variant="contained" onClick={openModalHandler}>SUBMIT</ColorButton>
                </div>
            </form>
        </section >
    )
}

