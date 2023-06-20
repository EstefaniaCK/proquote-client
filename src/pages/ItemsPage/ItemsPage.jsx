import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import "./ItemsPage.scss"
export default function ItemsPage() {
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

    return (
        <div className='items'>
            <form className='items__form' onSubmit={handleSubmit}>
                <ul className='items__list'>

                    {items.map((item) => {
                        return (
                            <li key={item.id} className='items__item'>
                                {quantity.push(item.quantity)}
                                {ids.push(item.id)}
                                <h1 className='items__title'>{item.name}</h1>
                                <p>{item.unit}</p>
                                <p>{item.quantity}</p>
                                <input value={unitPrice[item.id] || ''} onChange={(event) => { handleChange(event, item.id) }} type="text" placeholder='unit price' />
                            </li>
                        )
                    })}
                </ul>
                <button className='items__btn'>Submit</button>
            </form>

        </div>
    )

}