
import './styles.css'; 
import Navbar from '../components/Navbar';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


function AreasPage() {
    const [materias, setMaterias] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMaterias = async () => {
            try {
                const response = await axios.get('/api/areas');
                setMaterias(response.data.materias);
            } catch (err) {
                console.error("Error al cargar las áreas de estudio:", err);
                setError("Error al cargar las áreas de estudio");
            }
        };

        fetchMaterias();
    }, []);

    return (
        <div>
            <Navbar name="Areas"/>
            <h1>Areas of Study</h1>
            {error && <p>{error}</p>}
            {materias.map((materia, index) => (
                <div key={index} className="area">
                    <h1>{materia}</h1>

                    <div className="cosas">
                        <div className="icon-box">
                            <Link to={`/material/${materia}`}>
                                <img src="/images/matr.png" alt="Material" />
                                <p>Material</p>
                            </Link>
                        </div>

                        {}
                        <div className="icon-box">
                            <Link to={`/quizes/${materia}`}>
                                <img src="/images/exam.png" alt="Quizzes" />
                                <p>Quizzes</p>
                            </Link>
                        </div>
                    </div>
                    <hr />
                </div>
            ))}
        </div>
    );
}

export default AreasPage;


