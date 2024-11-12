
import React from 'react';
import { Link } from 'react-router-dom';
import '../pages/styles.css';

function Navbar() {
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
                            <Link className="nav-link" to="/areas">Áreas</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/foros">Foros</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/material">Material</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/quizes">Quizes</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/teachers">Maestros</Link>
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
