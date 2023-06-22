import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import "./ItemsPage.scss"
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import ItemsList from '../../components/ItemsList/ItemsList';

export default function ItemsPage() {
    return (

        <section className='items-page'>
            <Header />
            <ItemsList />
            <Footer />
        </section>
    );
}