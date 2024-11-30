
import '../pages/forossty.css';
import '../pages/styles.css';

import React from 'react';

function PdfList({ pdfs, categoriaSeleccionada, basePath }) {
    const backendUrl = 'http://localhost:5000';
    return (
        <div className="chat chatsss">
            <div className="chat-header clearfix">
                <h6 className="m-b-0">{categoriaSeleccionada || 'Selecciona una categoría'}</h6>
            </div>
            <div style={{ height: '60vh', overflowY: 'auto' }} className="chat-history">
                <ul className="m-b-0 pdf-list">
                    {pdfs.length > 0 ? (
                        pdfs.map((pdf, index) => (
                            <li key={index} className="clearfix">
                    <a href={`${backendUrl}${basePath}/${categoriaSeleccionada}/${pdf}`} target="_blank" rel="noopener noreferrer">
                    <div className="file">
                                        <img src="/images/pdfss.png" alt="PDF" height="200px" />
                                        {pdf}
                                    </div>
                                </a>
                            </li>
                        ))
                    ) : (
                        <li>{categoriaSeleccionada ? "There are no materials in this category." : "Select a category to view materials."}</li>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default PdfList;
