// src/components/ChatWindow.js
import React, { useState } from 'react';
import axios from 'axios';
import '../pages/forossty.css';
import '../pages/styles.css';


function ChatWindow({ mensajes, usuario, materiaSeleccionada }) {
    const [contenido, setContenido] = useState('');

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!contenido) return;

        try {
            await axios.post(`/api/foros/${materiaSeleccionada}`, { contenido }, { withCredentials: true });
            setContenido(''); // Limpiar el mensaje después de enviarlo
        } catch (error) {
            console.error("Error al enviar el mensaje:", error);
        }
    };

    return (
        <div className="chat chatsss">
            <div className="chat-header clearfix">
                <h6 className="m-b-0">{materiaSeleccionada || 'Select a forum'}</h6>
            </div>
            <div style={{ height: '60vh', overflowY: 'scroll' }} className="chat-history">
                <ul className="m-b-0">
                    {mensajes.length > 0 ? (
                        mensajes.map((mensaje, index) => (
                            <li key={index} className="clearfix">
                                <div className={`message-data ${mensaje.usuario === usuario?.nombre ? 'text-right' : ''}`}>
                                    <span className="message-data-time">{mensaje.usuario} {new Date(mensaje.fecha).toLocaleString()}</span>
                                </div>
                                <div className={`message ${mensaje.usuario === usuario?.nombre ? 'my-message' : 'other-message float-right'}`}>
                                    {mensaje.contenido}
                                </div>
                            </li>
                        ))
                    ) : (
                        <li>{materiaSeleccionada ? "There are no messages for this subject." : "Select a subject to view messages."}</li>
                    )}
                </ul>
            </div>
            {materiaSeleccionada && (
                <div className="chat-message clearfix">
                    <form onSubmit={handleSendMessage}>
                        <div className="input-group mb-0">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Write your message here..."
                                value={contenido}
                                onChange={(e) => setContenido(e.target.value)}
                            />
                            <button type="submit" className="btn input-group-text">
                                <i className="fa fa-send"></i>
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}

export default ChatWindow;
