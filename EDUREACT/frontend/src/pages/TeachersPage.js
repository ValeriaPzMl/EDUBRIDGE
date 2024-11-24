import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './styles.css';
import './teachersstyle.css';
import Navbar from '../components/Navbar';
import { ErrorContext } from '../context/ErrorContext'; // Importar el contexto de errores

function TeachersPage() {
    const [maestros, setMaestros] = useState([]);
    const { showError } = useContext(ErrorContext); // Usar el contexto de errores

    useEffect(() => {
        const fetchMaestros = async () => {
            try {
                const response = await axios.get('/api/teachers', { withCredentials: true });
                setMaestros(response.data.maestros);
            } catch (err) {
                showError("Error al cargar maestros."); // Mostrar el error en el contexto
                console.error("Error al cargar maestros:", err);
            }
        };

        fetchMaestros();
    }, [showError]);

    return (
        <div>
            <Navbar name="MAestros" />
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
