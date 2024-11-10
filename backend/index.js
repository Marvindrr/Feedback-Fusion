import express from 'express';
import mongoose from 'mongoose';
import { surveyModel } from './models/surveyModel.js'; // Asegúrate de que la ruta sea correcta

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/encuesta_egresados')
    .then(() => {
        console.log('¡La conexión ha sido exitosa!')
    })
    .catch(err => console.error('Error conectando a MongoDB:', err));

const app = express();
app.use(express.json()); // Middleware para manejar JSON

// Endpoint para verificar que el servidor está funcionando
app.get('/', (req, res) => {
    res.send('Hola desde mi servidor'); // <- Es un endpoint
});

// Endpoint POST para crear una nueva respuesta a la encuesta
app.post('/create', (req, res) => {
    const { nombre, carrera, año_egreso, satisfaccion_carrera, empleo_actual, relacion_empleo_carrera, recomendaciones_universidad } = req.body;

    // Validar que todos los campos requeridos están presentes
    if (!nombre || !carrera || !año_egreso || !satisfaccion_carrera || !empleo_actual || !relacion_empleo_carrera || !recomendaciones_universidad) {
        return res.status(400).json({
            msg: '¡Necesitamos todos los campos para almacenar la respuesta de la encuesta!'
        });
    }

    // Crear el objeto con las respuestas de la encuesta
    const newSurveyResponse = {
        nombre,
        carrera,
        año_egreso,
        satisfaccion_carrera,
        empleo_actual,
        relacion_empleo_carrera,
        recomendaciones_universidad
    };

    // Crear y guardar la respuesta en la base de datos
    surveyModel.create(newSurveyResponse)
        .then(() => {
            return res.status(200).json({
                msg: '¡Respuesta de la encuesta creada con éxito!'
            });
        })
        .catch((error) => {
            return res.status(500).json({
                msg: 'Error creando la respuesta de la encuesta',
                error
            });
        });
});

// Iniciar el servidor
app.listen(4000, () => {
    console.log('¡Servidor en línea en el puerto 4000!');
});

// Modelo de Mongoose (surveyModel.js)
import mongoose from 'mongoose';

const surveySchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    carrera: { type: String, required: true },
    año_egreso: { type: Number, required: true },
    satisfaccion_carrera: { type: Number, required: true }, // Valor del 1 al 5
    empleo_actual: { type: String, required: true }, // "Si" o "No"
    relacion_empleo_carrera: { type: String, required: true }, // "Relacionado" o "No relacionado"
    recomendaciones_universidad: { type: String, required: true } // Texto libre
});

export const surveyModel = mongoose.model('Survey', surveySchema);
