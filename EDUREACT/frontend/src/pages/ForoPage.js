// src/pages/ForoPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChatList from '../components/ChatList';
import ChatWindow from '../components/ChatWindow';
import './styles.css';
import './forossty.css';
import Navbar from '../components/Navbar';


function ForoPage() {
    const [materias, setMaterias] = useState([]);
    const [mensajes, setMensajes] = useState([]);
    const [usuario, setUsuario] = useState(null);
    const [materiaSeleccionada, setMateriaSeleccionada] = useState(null);

    useEffect(() => {
        const fetchMaterias = async () => {
            try {
                const response = await axios.get('/api/foros', { withCredentials: true });
                setMaterias(response.data.materias);
            } catch (error) {
                console.error("Error al cargar las materias:", error);
            }
        };

        fetchMaterias();
    }, []);

    const handleMateriaClick = async (materia) => {
        setMateriaSeleccionada(materia);
        try {
            const response = await axios.get(`/api/foros/${materia}`, { withCredentials: true });
            setMensajes(response.data.mensajes);
            setUsuario(response.data.usuario);
        } catch (error) {
            console.error("Error al cargar los mensajes:", error);
        }
    };

    return (
        <div>
            <Navbar />
        <div className="container container-90vh">
            <div className="row clearfix">
                <div className="col-lg-12">
                    <div className="card chat-app">
                        <ChatList materias={materias} onMateriaClick={handleMateriaClick} materiaSeleccionada={materiaSeleccionada} />
                        <ChatWindow mensajes={mensajes} usuario={usuario} materiaSeleccionada={materiaSeleccionada} />
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}

export default ForoPage;
