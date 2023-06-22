import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
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
import { useNavigate } from 'react-router-dom';
import { TextField } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';




const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },

    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export default function ItemsList() {
    const [items, setItems] = useState([]);
    const [unitPrice, setUnitPrice] = useState({});
    const quantity = [];
    const ids = [];
    const params = useParams();
    const projectid = params.projectid;

    const handleChange = (event, itemId) => {
        const { value } = event.target;
        setUnitPrice((prevUnitPrices) => ({
            ...prevUnitPrices,
            [itemId]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault()

        const pricingList = [];
        const total = quantity.map((item, index) => {
            let test = {
                item_id: ids[index],
                quantity: quantity[index],
                unit_price: unitPrice[ids[index]],
                total: item * unitPrice[ids[index]],
                user_id: 1,
                project_id: projectid
            }
            pricingList.push(test);

        })

        console.log(pricingList)
        axios.post('http://localhost:8080/bids', pricingList)
    }

    useEffect(() => {
        axios.get(`http://localhost:8080/projects/${projectid}/items`)
            .then((response) => setItems(response.data))
    }, [])

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));



    return (
        <section className='items-list__table'>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="left">Item Name</StyledTableCell>
                            <StyledTableCell align="left">Unit</StyledTableCell>
                            <StyledTableCell align="left">Quantity</StyledTableCell>
                            <StyledTableCell align="left">Unit Price</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.map((item) => (
                            <StyledTableRow
                                key={item.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell align="left">{item.name}</StyledTableCell>
                                <StyledTableCell align="left">{item.unit}</StyledTableCell>
                                <StyledTableCell align="left">{item.quantity}</StyledTableCell>
                                <StyledTableCell>
                                    <FormControl sx={{ m: 1, width: '20ch' }}>
                                        <InputLabel htmlFor={`outlined-adornment-amount-${item.id}`}>Unit Price</InputLabel>
                                        <OutlinedInput
                                            id={`outlined-adornment-amount-${item.id}`}
                                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                            label="Unit Price"
                                        />
                                    </FormControl>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </section>


        // <div className='items'>
        //     <form className='items__form' onSubmit={handleSubmit}>
        //         <ul className='items__list'>

        //             {items.map((item) => {
        //                 return (
        //                     <li key={item.id} className='items__item'>
        //                         {quantity.push(item.quantity)}
        //                         {ids.push(item.id)}
        //                         <h1 className='items__title'>{item.name}</h1>
        //                         <p>{item.unit}</p>
        //                         <p>{item.quantity}</p>
        //                         <input value={unitPrice[item.id] || ''} onChange={(event) => { handleChange(event, item.id) }} type="text" placeholder='unit price' />
        //                     </li>
        //                 )
        //             })}
        //         </ul>
        //         <button className='items__btn'>Submit</button>
        //     </form>
        // </div>
    )

}