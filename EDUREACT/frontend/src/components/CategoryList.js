
import '../pages/forossty.css';
import '../pages/styles.css';
import React from 'react';

function CategoryList({ categorias, onCategoriaClick, categoriaSeleccionada }) {
    console.log("Categorías en CategoryList:", categorias); 

    return (
        <div id="plist" className="people-list chatn">
            <ul className="list-unstyled chat-list mt-2 mb-0">
                {categorias.map((categoria, index) => (
                    <li key={index} className={`clearfix ${categoria === categoriaSeleccionada ? 'active' : ''}`}>
                        <button onClick={() => onCategoriaClick(categoria)} className="category-button">
                            <img src="/images/fle.png" alt="icono de categoría" />
                            <div className="about">
                                <div className="name">{categoria}</div>
                                <div className="status">
                                    <i className={`fa fa-circle ${categoria === categoriaSeleccionada ? 'online' : 'offline'}`}></i>
                                    {categoria === categoriaSeleccionada ? 'activo' : 'inactivo'}
                                </div>
                            </div>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CategoryList;
