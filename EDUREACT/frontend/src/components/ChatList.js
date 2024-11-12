// src/components/ChatList.js
import '../pages/forossty.css';
import '../pages/styles.css';
import React from 'react';

function ChatList({ materias, onMateriaClick, materiaSeleccionada }) {
    return (
        <div id="plist" className="people-list chatn">
            <ul className="list-unstyled chat-list mt-2 mb-0">
                {materias.map((materia, index) => (
                    <li key={index} className={`clearfix ${materia === materiaSeleccionada ? 'active' : ''}`}>
                        <button onClick={() => onMateriaClick(materia)} className="category-button">
                            <img src="/images/fle.png" alt="avatar" />
                            <div className="about">
                                <div className="name">{materia}</div>
                                <div className="status">
                                    <i className={`fa fa-circle ${materia === materiaSeleccionada ? 'online' : 'offline'}`}></i>
                                    {materia === materiaSeleccionada ? 'activo' : 'inactivo'}
                                </div>
                            </div>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ChatList;
