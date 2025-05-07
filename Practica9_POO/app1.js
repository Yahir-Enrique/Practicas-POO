const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Middleware para procesar JSON
app.use(express.json());

// Conectar a MongoDB Compass (Base de datos "Practica8")
mongoose.connect('mongodb://127.0.0.1:27017/Practica8', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Conectado a MongoDB Compass'))
.catch(err => console.error('Error al conectar a MongoDB:', err));

// Definir esquema y modelo
const UsuarioSchema = new mongoose.Schema({
    nombre: String,
    email: String,
    edad: Number
});

const Usuario = mongoose.model('Usuario', UsuarioSchema);

// Ruta para agregar usuarios
app.post('/usuarios', async (req, res) => {
    try {
        const nuevoUsuario = new Usuario(req.body);
        await nuevoUsuario.save();
        res.json({ mensaje: 'Usuario guardado', data: nuevoUsuario });
    } catch (error) {
        res.status(500).json({ error: 'Error al guardar usuario', detalle: error });
    }
});

// Ruta para obtener usuarios
app.get('/usuarios', async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener usuarios', detalle: error });
    }
});

app.listen(port, () => console.log(`Servidor corriendo en http://localhost:${port}`));

// {
//   "nombre": "Juan",
//   "edad": 25
// }