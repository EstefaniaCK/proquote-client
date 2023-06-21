import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import "./HomePage.scss"
import LogInForm from "../../components/LogInForm/LogInForm";

export default function HomePage() {
    return (
        <>
            <Header />
            <section className="homepage">
                <LogInForm />
            </section>
            <Footer />
        </>
    );
}