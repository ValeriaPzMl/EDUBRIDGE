import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import cors from 'cors'; // Importar cors
import User from './models/User.js';
import Message from './models/Message.js';
import fs from 'fs';

dotenv.config();
const materias = ["Math", "Idioms", "Science", "Grammar", "Social_sciences", "Coding", "Geometry"];
const __filename = fileURLToPath(import.meta.url);
//const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'public')));
// Configuración de CORS para permitir peticiones desde el cliente React
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

// Conectar a la base de datos
const user = process.env.DB_USER;
const password = process.env.DB_PASS;
const db = process.env.DB;


const mongoUrl = `mongodb+srv://${user}:${password}@cluster0.brhv8.mongodb.net/${db}?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(mongoUrl, { serverSelectionTimeoutMS: 20000 })
    .then(() => console.log("Conectado a MongoDB Atlas"))
    .catch(err => console.error("Error de conexión a MongoDB:", err));

// Configuración de sesiones 
app.use(session({
    secret: 'mi_secreto_super_seguro',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: mongoUrl }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 día
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Para manejar JSON en las solicitudes

// Función para verificar autenticación
function verificarAutenticacion(req, res, next) {
    if (req.session.userId) {
        next();
    } else {
        res.status(401).json({ message: "No autorizado" });
    }
}

// Rutas de API

// Registro de usuario
// Registro de usuario
app.post('/api/register', async (req, res) => {
    const { nombre, apellidos, correo, contraseña, tipo, materia, idiomas } = req.body;

    try {
        // Crear un nuevo usuario con los datos del formulario
        const nuevoUsuario = new User({
            nombre,
            apellidos,
            correo,
            contraseña,
            tipo,
            materia: tipo === 'maestro' ? materia : null,
            idiomas: tipo === 'maestro' ? idiomas.split(',') : []
        });

        // Guardar el nuevo usuario en la base de datos
        const usuarioGuardado = await nuevoUsuario.save();
        
        // Enviar una sola respuesta indicando el registro exitoso
        res.status(201).json({ message: "Usuario registrado exitosamente", userId: usuarioGuardado._id });
    } catch (err) {
        console.error("Error al registrar usuario:", err);
        res.status(500).json({ message: "Error al registrar usuario" });
    }
});


// Inicio de sesión


// backend - server.js
// En AuthPage.js
app.post('/api/login', async (req, res) => {
    const { correo, contraseña } = req.body;
    try {
        const usuario = await User.findOne({ correo, contraseña });
        if (usuario) {
            req.session.userId = usuario._id;
            res.status(200).json({ message: "Inicio de sesión exitoso", userId: usuario._id });
        } else {
            res.status(401).json({ message: "Correo o contraseña incorrectos" });
        }
    } catch (err) {
        console.error("Error al iniciar sesión:", err);
        res.status(500).json({ message: "Error al iniciar sesión" });
    }
});
const handleSubmit = async (e) => {
    e.preventDefault();
    // En AuthPage.js
    const url = isLogin ? '/api/login' : '/api/register';
    try {
        const response = await axios.post(url, formData, { withCredentials: true });
        if (response.status === 200 || response.status === 201) {
            navigate('/menu'); // Redirige al menú principal si el login o registro es exitoso
        }
    } catch (error) {
        console.error("Error:", error.response ? error.response.data.message : error.message);
    }
};



// Cerrar sesión
app.post('/api/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error("Error al cerrar sesión:", err);
            res.status(500).json({ message: "Error al cerrar sesión" });
        } else {
            res.json({ message: "Sesión cerrada exitosamente" });
        }
    });
});

// backend/server.js
app.get('/api/areas', (req, res) => {
    res.json({ materias });
});

// backend/server.js


// Ruta para obtener todas las categorías de materiales
app.get('/api/material', verificarAutenticacion, (req, res) => {
    const categoriasPath = path.join(__dirname, 'public', 'PDFS');

    try {
        const categorias = fs.readdirSync(categoriasPath).filter(folder => fs.lstatSync(path.join(categoriasPath, folder)).isDirectory());
        res.json({ categorias, pageName: "Material" });
    } catch (err) {
        console.error("Error al cargar categorías:", err);
        res.status(500).json({ message: "Error al cargar las categorías." });
    }
});


// Ruta para obtener los archivos PDF de una categoría específica
app.get('/api/material/:categoria', verificarAutenticacion, (req, res) => {
    const categoriaSeleccionada = req.params.categoria;
    const pdfPath = path.join(__dirname, 'public', 'PDFS', categoriaSeleccionada);

    try {
        const categorias = fs.readdirSync(path.join(__dirname, 'public', 'PDFS')).filter(folder => fs.lstatSync(path.join(__dirname, 'public', 'PDFS', folder)).isDirectory());
        const pdfs = fs.readdirSync(pdfPath).filter(file => file.endsWith('.pdf'));
        res.json({ categorias, pdfs, categoriaSeleccionada, pageName: "Material" });
    } catch (err) {
        console.error("Error al cargar archivos PDF:", err);
        res.status(404).json({ message: "Categoría no encontrada o error al cargar los archivos." });
    }
});


// Enviar mensaje en foro

// Ruta para obtener todas las materias (lista de foros)
app.get('/api/foros', verificarAutenticacion, (req, res) => {
    res.json({ materias, pageName: "Foros" });
});

// Ruta para obtener los mensajes de un foro específico
app.get('/api/foros/:materia', verificarAutenticacion, async (req, res) => {
    const materiaSeleccionada = req.params.materia;

    try {
        const mensajes = await Message.find({ materia: materiaSeleccionada }).sort({ fecha: 1 });
        const usuario = await User.findById(req.session.userId);
        res.json({ mensajes, usuario, materiaSeleccionada, pageName: "Foros" });
    } catch (err) {
        console.error("Error al cargar mensajes por materia:", err);
        res.status(500).json({ message: "Error al cargar mensajes." });
    }
});

// Ruta para enviar un mensaje en un foro específico
app.post('/api/foros/:materia', verificarAutenticacion, async (req, res) => {
    const { contenido } = req.body;
    const materia = req.params.materia;

    try {
        const usuario = await User.findById(req.session.userId);
        const nuevoMensaje = new Message({
            usuario: usuario.nombre,
            contenido,
            materia,
        });

        await nuevoMensaje.save();
        res.status(201).json({ message: "Mensaje enviado exitosamente", nuevoMensaje });
    } catch (err) {
        console.error("Error al enviar mensaje:", err);
        res.status(500).json({ message: "Error al enviar mensaje." });
    }
});
app.get('/api/menu', verificarAutenticacion, (req, res) => {
    // Supón que el menú tiene alguna información o configuración que quieres enviar al frontend
    const menuData = {
        title: "EduBridge Menu",
        sections: [
            { name: "AREAS", path: "/areas" },
            { name: "TEACHERS", path: "/teachers" },
            { name: "FORUMS", path: "/foros" },
            { name: "MATERIAL", path: "/material" },
            { name: "QUIZZES", path: "/quizes" },
        ]
    };
    res.json(menuData); // Devuelve los datos del menú al frontend
});

// Obtener perfil de usuario
// backend/server.js

app.get('/api/perfil', verificarAutenticacion, async (req, res) => {
    try {
        const usuario = await User.findById(req.session.userId);

        if (!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado." });
        }
        
        res.json({ usuario, pageName: "Profile" });
    } catch (err) {
        console.error("Error al cargar el perfil:", err);
        res.status(500).json({ message: "Error al cargar el perfil." });
    }
});

// backend/server.js


// Ruta para obtener todas las categorías de quizzes
app.get('/api/quizes', verificarAutenticacion, (req, res) => {
    const categoriasPath = path.join(__dirname, 'public', 'QUIZZ');

    try {
        const categorias = fs.readdirSync(categoriasPath).filter(folder => fs.lstatSync(path.join(categoriasPath, folder)).isDirectory());
        res.json({ categorias, pageName: "Quizes" });
    } catch (err) {
        console.error("Error al cargar categorías:", err);
        res.status(500).json({ message: "Error al cargar las categorías." });
    }
});


// Ruta para obtener los archivos PDF de una categoría específica de quizzes
app.get('/api/quizes/:categoria', verificarAutenticacion, (req, res) => {
    const categoriaSeleccionada = req.params.categoria;
    const pdfPath = path.join(__dirname, 'public', 'QUIZZ', categoriaSeleccionada);

    try {
        const categorias = fs.readdirSync(path.join(__dirname, 'public', 'QUIZZ')).filter(folder => fs.lstatSync(path.join(__dirname, 'public', 'QUIZZ', folder)).isDirectory());
        const pdfs = fs.readdirSync(pdfPath).filter(file => file.endsWith('.pdf'));
        res.json({ categorias, pdfs, categoriaSeleccionada, pageName: "Quizes" });
    } catch (err) {
        console.error("Error al cargar archivos PDF:", err);
        res.status(404).json({ message: "Categoría no encontrada o error al cargar los archivos." });
    }
});

// backend/server.js

app.get('/api/teachers', verificarAutenticacion, async (req, res) => {
    try {
        const maestros = await User.find({ tipo: 'maestro' });
        res.json({ maestros, pageName: "Teachers" });
    } catch (err) {
        console.error("Error al cargar maestros:", err);
        res.status(500).json({ message: "Error al cargar maestros." });
    }
});

// Servir el frontend de React en producción
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
    });
}

// Middleware para manejar rutas no encontradas en el backend
app.use((req, res) => {
    res.status(404).json({ message: 'Ruta no encontrada' });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
