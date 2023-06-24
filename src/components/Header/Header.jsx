import React from "react";
import "./Header.scss";
import logo from "../../assets/logo/blacklogo.png";
import { useNavigate, useLocation, Link } from "react-router-dom";

export default function Header() {
    const navigate = useNavigate();
    const location = useLocation();



    return (
        <header className="header">
            <div className="header__container">
                <img
                    className="header__logo"
                    src={logo}
                    alt="proquote-logo"
                    onClick={() => navigate("/")}
                />
                <div className="header__elements">
                    <Link
                        to="/"
                        className={`header__elements-link ${location.pathname === "/" ? "header__elements-link--active" : ""
                            }`}
                    >
                        <p className="header__elements-home">Home</p>
                    </Link>
                    <Link
                        to="/projects"
                        className={`header__elements-link ${location.pathname === "/projects" ? "header__elements-link--active" : ""
                            }`}
                    >
                        <p className="header__elements-projects">Projects</p>
                    </Link>

                </div>
            </div>
        </header>
    );
}
