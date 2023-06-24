import Header from "../../components/Header/Header"
import Footer from "../../components/Footer/Footer"
import BidsList from "../../components/BidsList/BidsList"
import "./BidsPage.scss"



export default function BidsPage() {
    return (
        <section className="bids-page">
            <Header />
            <BidsList />
            <Footer />
        </section>
    )
}