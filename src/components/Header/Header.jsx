import "./Header.scss"
import logo from "../../assets/logo/blacklogo.png"
import { useNavigate, Link } from "react-router-dom";


export default function Header() {

    const navigate = useNavigate();

    return (
        <header className="header">
            <div className="header__container">
                <img
                    className="header__logo"
                    src={logo}
                    alt="proquote-logo" onClick={() => { navigate("/") }} />
                <div className="header__elements">
                    <Link to="/"
                        className="header__elements-link">
                        <p className="header__elements-home">Home</p>
                    </Link>
                    <Link to="/projects" className="header__elements-link">
                        <p className="header__elements-projects">Projects</p>
                    </Link>
                </div>
            </div>
        </header>
    );
}