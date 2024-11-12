// src/pages/TeachersPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';
import './teachersstyle.css'; // Asegúrate de que el archivo CSS esté en esta ubicación
import Navbar from '../components/Navbar';
function TeachersPage() {
    const [maestros, setMaestros] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchMaestros = async () => {
            try {
                const response = await axios.get('/api/teachers', { withCredentials: true });
                setMaestros(response.data.maestros);
            } catch (err) {
                console.error("Error al cargar maestros:", err);
                setError("Error al cargar maestros.");
            }
        };

        fetchMaestros();
    }, []);

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <Navbar />
        <div className="gen">
            {maestros.map((maestro, index) => (
                <div className="profile-card" key={index}>
                    <div className="profile-icon">
                        <img src="/images/perf.png" alt="Perfil" height="100px" />
                    </div>
                    <div className="info">
                        <div className="profile-name">
                            {maestro.nombre} {maestro.apellidos}
                        </div>
                        <div className="profile-info"><b>Mail:</b> {maestro.correo}</div>
                        <div className="profile-info"><b>Areas:</b> {maestro.materia || 'N/A'}</div>
                        <div className="profile-info"><b>Languages:</b> {maestro.idiomas.join(', ')}</div>
                    </div>
                </div>
            ))}
        </div>
        </div>
    );
}

export default TeachersPage;
