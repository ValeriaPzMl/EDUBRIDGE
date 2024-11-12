
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './profile.css'; 
import Navbar from '../components/Navbar';
function ProfilePage() {
    const [usuario, setUsuario] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPerfil = async () => {
            try {
                const response = await axios.get('/api/perfil', { withCredentials: true });
                setUsuario(response.data.usuario);
            } catch (err) {
                console.error("Error al cargar el perfil:", err);
                setError("Error al cargar el perfil.");
            }
        };

        fetchPerfil();
    }, []);

    const handleLogout = () => {
        axios.post('/api/logout', {}, { withCredentials: true })
            .then(() => {
                window.location.href = '/'; 
            })
            .catch(err => console.error("Error al cerrar sesión:", err));
    };

    if (error) {
        return <p>{error}</p>;
    }

    if (!usuario) {
        return <p>Cargando perfil...</p>;
    }

    return (
        <div>
            <Navbar />
        <div className="gen">
            <div className="card mb-3" id="card">
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src="/images/perf.png" id="ProfilePicture" alt="Tu foto" />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title"><b>Nombre:</b> {usuario.nombre} {usuario.apellidos}</h5>
                            <p className="card-text"><b>Correo:</b> {usuario.correo}</p>
                            <p className="card-text"><b>Tipo de Usuario:</b> {usuario.tipo === 'maestro' ? 'Profesor' : 'Estudiante'}</p>
                            
                            {usuario.tipo === 'maestro' && (
                                <>
                                    <p className="card-text"><b>Materia:</b> {usuario.materia}</p>
                                    <p className="card-text"><b>Idiomas:</b> {usuario.idiomas.join(', ')}</p>
                                </>
                            )}
                            
                            <button onClick={handleLogout} className="btn mt-3">Cerrar Sesión</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}

export default ProfilePage;
