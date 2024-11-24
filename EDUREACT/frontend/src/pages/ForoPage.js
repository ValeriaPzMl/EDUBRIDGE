import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import ChatList from '../components/ChatList';
import ChatWindow from '../components/ChatWindow';
import Navbar from '../components/Navbar';
import './styles.css';
import './forossty.css';
import { ErrorContext } from '../context/ErrorContext'; // Importar el contexto de errores

function ForoPage() {
    const [materias, setMaterias] = useState([]);
    const [mensajes, setMensajes] = useState([]);
    const [usuario, setUsuario] = useState(null);
    const [materiaSeleccionada, setMateriaSeleccionada] = useState(null);
    const { showError } = useContext(ErrorContext); // Obtener la función para mostrar errores

    useEffect(() => {
        const fetchMaterias = async () => {
            try {
                const response = await axios.get('/api/foros', { withCredentials: true });
                setMaterias(response.data.materias);
            } catch (error) {
                showError("Error al cargar las materias."); // Usar el contexto para mostrar el error
                console.error("Error al cargar las materias:", error);
            }
        };

        fetchMaterias();
    }, [showError]);

    const handleMateriaClick = async (materia) => {
        setMateriaSeleccionada(materia);
        try {
            const response = await axios.get(`/api/foros/${materia}`, { withCredentials: true });
            setMensajes(response.data.mensajes);
            setUsuario(response.data.usuario);
        } catch (error) {
            showError("Error al cargar los mensajes."); // Usar el contexto para mostrar el error
            console.error("Error al cargar los mensajes:", error);
        }
    };

    return (
        <div>
            <Navbar name="Foros" />
            <div className="container container-90vh">
                <div className="row clearfix">
                    <div className="col-lg-12">
                        <div className="card chat-app">
                            <ChatList
                                materias={materias}
                                onMateriaClick={handleMateriaClick}
                                materiaSeleccionada={materiaSeleccionada}
                            />
                            <ChatWindow
                                mensajes={mensajes}
                                usuario={usuario}
                                materiaSeleccionada={materiaSeleccionada}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForoPage;
