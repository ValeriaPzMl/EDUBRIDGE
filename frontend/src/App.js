import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import MenuPage from './pages/MenuPage';
import TeachersPage from './pages/TeachersPage';
import ProfilePage from './pages/ProfilePage';
import QuizPage from './pages/QuizPage';
import ForoPage from './pages/ForoPage';
import MaterialPage from './pages/MaterialPage';
import AuthPage from './pages/AuthPage';
import AreasPage from './pages/AreasPage'; 
import { ErrorProvider } from './context/ErrorContext'; // Importa el proveedor del contexto
import ErrorAlert from './components/ErrorAlert'; // Importa el componente de alerta
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';



function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <ErrorProvider> {/* Proveedor del contexto */}
            <Router>
                <ErrorAlert /> {/* Componente para mostrar errores */}
                <Routes>
                    <Route path="/" element={!isAuthenticated ? <AuthPage setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/menu" />} />
                    <Route path="/menu" element={isAuthenticated ? <MenuPage /> : <Navigate to="/" />} />
                    <Route path="/teachers" element={isAuthenticated ? <TeachersPage /> : <Navigate to="/" />} />
                    <Route path="/perfil" element={isAuthenticated ? <ProfilePage /> : <Navigate to="/" />} />
                    <Route path="/quizes" element={isAuthenticated ? <QuizPage /> : <Navigate to="/" />} />
                    <Route path="/foros" element={isAuthenticated ? <ForoPage /> : <Navigate to="/" />} />
                    <Route path="/material" element={isAuthenticated ? <MaterialPage /> : <Navigate to="/" />} />
                    <Route path="/areas" element={isAuthenticated ? <AreasPage /> : <Navigate to="/" />} /> 
                </Routes>
            </Router>
        </ErrorProvider>
    );
}

export default App;

