import React from 'react';
import { Link } from 'react-router-dom';
import '../pages/styles.css';

function Navbar({ name }) {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary mb-3">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">EduBridge</Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarText"
                    aria-controls="navbarText"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link
                                className={`nav-link ${name === "Areas" ? "fw-bold" : ""}`}
                                to="/areas"
                            >
                                Areas
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className={`nav-link ${name === "Foros" ? "fw-bold" : ""}`}
                                to="/foros"
                            >
                                Forums
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className={`nav-link ${name === "Material" ? "fw-bold" : ""}`}
                                to="/material"
                            >
                                Material
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className={`nav-link ${name === "Quizes" ? "fw-bold" : ""}`}
                                to="/quizes"
                            >
                                Quizes
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className={`nav-link ${name === "Maestros" ? "fw-bold" : ""}`}
                                to="/teachers"
                            >
                                Taechers
                            </Link>
                        </li>
                    </ul>
                    <span className="navbar-text">
                        <Link className="nav-link" to="/perfil">
                            <img src="/images/perf.png" alt="Perfil" height="30px" />
                        </Link>
                    </span>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
