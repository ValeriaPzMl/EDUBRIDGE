import './styles.css';
import './forossty.css';
import Navbar from '../components/Navbar';

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import CategoryList from '../components/CategoryList';
import PdfList from '../components/PdfList';
import { ErrorContext } from '../context/ErrorContext'; // Importar el contexto de errores

function MaterialPage() {
    const [categorias, setCategorias] = useState([]);
    const [pdfs, setPdfs] = useState([]);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
    const { showError } = useContext(ErrorContext); // Usa el contexto de errores

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const response = await axios.get('/api/material', { withCredentials: true });
                console.log("Categorias de Material:", response.data.categorias); 
                setCategorias(response.data.categorias);
            } catch (error) {
                showError("Error al cargar las categorías."); // Mostrar el error en el contexto
                console.error("Error al cargar las categorías:", error);
            }
        };

        fetchCategorias();
    }, [showError]);

    const handleCategoriaClick = async (categoria) => {
        setCategoriaSeleccionada(categoria);
        try {
            const response = await axios.get(`/api/material/${categoria}`, { withCredentials: true });
            setPdfs(response.data.pdfs);
        } catch (error) {
            showError("Error al cargar los archivos PDF."); // Mostrar el error en el contexto
            console.error("Error al cargar los archivos PDF:", error);
        }
    };

    return (
        <div>
            <Navbar name="Material"/>
            <div className="container container-90vh">
                <div className="row clearfix">
                    <div className="col-lg-12">
                        <CategoryList 
                            categorias={categorias} 
                            onCategoriaClick={handleCategoriaClick} 
                            categoriaSeleccionada={categoriaSeleccionada} 
                        />
                        <PdfList 
                            pdfs={pdfs} 
                            categoriaSeleccionada={categoriaSeleccionada} 
                            basePath="/PDFS" 
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MaterialPage;
