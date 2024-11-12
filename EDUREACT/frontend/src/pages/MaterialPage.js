
import './styles.css';
import './forossty.css';
import Navbar from '../components/Navbar';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CategoryList from '../components/CategoryList';
import PdfList from '../components/PdfList';

function MaterialPage() {
    const [categorias, setCategorias] = useState([]);
    const [pdfs, setPdfs] = useState([]);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const response = await axios.get('/api/material', { withCredentials: true });
                console.log("Categorias de Material:", response.data.categorias);  // Agregar esta línea
                setCategorias(response.data.categorias);
            } catch (error) {
                console.error("Error al cargar las categorías:", error);
            }
        };
    
        fetchCategorias();
    }, []);

    const handleCategoriaClick = async (categoria) => {
        setCategoriaSeleccionada(categoria);
        try {
            const response = await axios.get(`/api/material/${categoria}`, { withCredentials: true });
            setPdfs(response.data.pdfs);
        } catch (error) {
            console.error("Error al cargar los archivos PDF:", error);
        }
    };

    return (
        <div>
            <Navbar />
        <div className="container container-90vh">
            <div className="row clearfix">
                <div className="col-lg-12">
                    <CategoryList categorias={categorias} onCategoriaClick={handleCategoriaClick} categoriaSeleccionada={categoriaSeleccionada} />
                    <PdfList pdfs={pdfs} categoriaSeleccionada={categoriaSeleccionada} basePath="/PDFS" />
                </div>
            </div>
        </div>
        </div>
    );
}

export default MaterialPage;

