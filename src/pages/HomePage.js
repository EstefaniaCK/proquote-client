import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import { TextField, RedBar } from '@mui/material';
import "./HomePage.scss"

export default function HomePage() {
    return (
        <>
            <Header />
            <section className="homepage">
                <form className="homepage__form">
                    <TextField id="outlined-basic" label="Username" variant="outlined" margin="normal" />
                    <TextField id="outlined-basic" label="Password" variant="outlined" margin="normal" />
                </form>
            </section>
            <Footer />
        </>
    );
}