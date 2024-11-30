import React, { createContext, useState } from 'react';

// Crear el contexto
export const ErrorContext = createContext();

// Proveedor del contexto
export const ErrorProvider = ({ children }) => {
    const [error, setError] = useState(null);

    // Función para mostrar el error
    const showError = (message) => {
        setError(message);

        // Limpiar el error después de 5 segundos
        setTimeout(() => {
            setError(null);
        }, 5000);
    };

    return (
        <ErrorContext.Provider value={{ error, showError }}>
            {children}
        </ErrorContext.Provider>
    );
};
