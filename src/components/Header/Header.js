import "./Header.scss"
import logo from "../../assets/logo/logo.png"
import { Link } from "react-router-dom";


export default function Header() {
    return (
        <header className="header">
            <div className="header__container">
                <img
                    className="header__logo"
                    src={logo}
                    alt="proquote-logo" />
                <div className="header__elements">
                    <Link to="/" className="header__elements-link">
                        <p className="header__elements-home">Home</p>
                    </Link>
                    <p className="header__elements-projects">Projects</p>
                </div>
            </div>
        </header>
    );
}