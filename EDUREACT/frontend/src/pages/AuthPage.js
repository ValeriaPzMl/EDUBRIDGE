import './styles.css';
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AuthPage.css';
import { ErrorContext } from '../context/ErrorContext'; // Importa el contexto de errores

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

    const { showError } = useContext(ErrorContext); // Usa el contexto para mostrar errores
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
                setIsAuthenticated(true);
                navigate('/menu');
            }
        } catch (error) {
            // Usa el contexto de errores para mostrar el mensaje en la alerta
            const errorMessage = error.response ? error.response.data.message : "Error al conectar con el servidor";
            showError(errorMessage); // Mostrar el mensaje de error globalmente
            console.error("Error:", errorMessage);
        }
    };

    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    return (
        <div className="container">
            {isLogin ? (
                <div className="login-container">
                    <h2>Log in</h2>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="correo">Mail</label>
                        <input
                            type="email"
                            id="correo"
                            name="correo"
                            required
                            onChange={handleChange}
                        />

                        <label htmlFor="contraseña">Password</label>
                        <input
                            type="password"
                            id="contraseña"
                            name="contraseña"
                            required
                            onChange={handleChange}
                        />

                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            ) : (
                <div className="register-container">
                    <h2>Register</h2>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="nombre">Name</label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            required
                            onChange={handleChange}
                        />

                        <label htmlFor="apellidos">Last name</label>
                        <input
                            type="text"
                            id="apellidos"
                            name="apellidos"
                            required
                            onChange={handleChange}
                        />

                        <label htmlFor="correo">Mail</label>
                        <input
                            type="email"
                            id="correo"
                            name="correo"
                            required
                            onChange={handleChange}
                        />

                        <label htmlFor="contraseña">Password</label>
                        <input
                            type="password"
                            id="contraseña"
                            name="contraseña"
                            required
                            onChange={handleChange}
                        />

                        <label htmlFor="tipo">Kind</label>
                        <select
                            id="tipo"
                            name="tipo"
                            required
                            onChange={handleChange}
                        >
                            <option value="estudiante">Estudent</option>
                            <option value="maestro">Teacher</option>
                        </select>

                        {formData.tipo === 'maestro' && (
                            <div id="maestro-fields">
                                <label htmlFor="materia">Class</label>
                                <input
                                    type="text"
                                    id="materia"
                                    name="materia"
                                    onChange={handleChange}
                                />

                                <label htmlFor="idiomas">Language (separated by commas)</label>
                                <input
                                    type="text"
                                    id="idiomas"
                                    name="idiomas"
                                    onChange={handleChange}
                                />
                            </div>
                        )}

                        <button type="submit" className="btn btn-primary">Register</button>
                    </form>
                </div>
            )}

            <button onClick={toggleForm} className="btn btn-secondary mt-3">
                {isLogin ? "Go to Register" : "Go to Login"}
            </button>
        </div>
    );
}

export default AuthPage;
