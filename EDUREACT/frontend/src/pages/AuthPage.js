// src/pages/AuthPage.js
import './styles.css'; // Archivo CSS con los mismos estilos que en el EJS

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AuthPage.css';
function AuthPage({ setIsAuthenticated }) {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        correo: '',
        contraseña: '',
        nombre: '',
        apellidos: '',
        tipo: 'estudiante',
        materia: '',
        idiomas: ''
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = isLogin ? '/api/login' : '/api/register';
        try {
            const response = await axios.post(url, formData, { withCredentials: true });
            if (response.status === 200 || response.status === 201) {
                console.log(response.data.message);
                setIsAuthenticated(true); // Actualiza el estado de autenticación
                navigate('/menu'); // Redirige al menú principal
            }
        } catch (error) {
            setMessage(error.response ? error.response.data.message : "Error al conectar con el servidor");
            console.error("Error:", error.response ? error.response.data.message : error.message);
        }
    };

    const toggleForm = () => {
        setIsLogin(!isLogin);
        setMessage(''); // Limpia el mensaje al cambiar entre login y registro
    };

    return (
        <div className="container">
            {message && <p>{message}</p>} {/* Muestra el mensaje si existe */}
            {isLogin ? (
                <div className="login-container">
                    <h2>Log in</h2>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="correo">Mail</label>
                        <input type="email" id="correo" name="correo" required onChange={handleChange} />

                        <label htmlFor="contraseña">Password</label>
                        <input type="password" id="contraseña" name="contraseña" required onChange={handleChange} />

                        <button type="submit">Submit</button>
                    </form>
                </div>
            ) : (
                <div className="register-container">
                    <h2>Register</h2>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="nombre">Name</label>
                        <input type="text" id="nombre" name="nombre" required onChange={handleChange} />

                        <label htmlFor="apellidos">Last name</label>
                        <input type="text" id="apellidos" name="apellidos" required onChange={handleChange} />

                        <label htmlFor="correo">Mail</label>
                        <input type="email" id="correo" name="correo" required onChange={handleChange} />

                        <label htmlFor="contraseña">Password</label>
                        <input type="password" id="contraseña" name="contraseña" required onChange={handleChange} />

                        <label htmlFor="tipo">Kind</label>
                        <select id="tipo" name="tipo" required onChange={handleChange}>
                            <option value="estudiante">Estudent</option>
                            <option value="maestro">Teacher</option>
                        </select>

                        {formData.tipo === 'maestro' && (
                            <div id="maestro-fields">
                                <label htmlFor="materia">Class</label>
                                <input type="text" id="materia" name="materia" onChange={handleChange} />

                                <label htmlFor="idiomas">Language (separated by commas)</label>
                                <input type="text" id="idiomas" name="idiomas" onChange={handleChange} />
                            </div>
                        )}

                        <button type="submit">Register</button>
                    </form>
                </div>
            )}

            <button onClick={toggleForm}>
                {isLogin ? "Go to Register" : "Go to Login"}
            </button>
        </div>
    );
}

export default AuthPage;
