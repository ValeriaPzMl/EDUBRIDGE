import React, { useContext } from 'react';
import { ErrorContext } from '../context/ErrorContext';

function ErrorAlert() {
    const { error } = useContext(ErrorContext);

    if (!error) return null;

    return (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
            {error}
            <button
                type="button"
                className="btn-close"
                onClick={() => {
                    // Limpia el error manualmente para evitar problemas de desmontaje
                    document.querySelector('.alert').classList.remove('show');
                }}
                aria-label="Close"
            ></button>
        </div>
    );
}

export default ErrorAlert;
