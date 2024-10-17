import { Schema, model } from "mongoose";

const surveySchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    carrera: {
        type: String,
        required: true
    },
    año_egreso: {
        type: Number,
        required: true
    },
    satisfaccion_carrera: {
        type: Number,
        required: true,
        min: 1,
        max: 10
    },
    empleo_actual: {
        type: String,
        enum: ['Si', 'No'],
        required: true
    },
    relacion_empleo_carrera: {
        type: String,
        enum: ['Relacionado', 'No relacionado'],
        required: true
    },
    recomendaciones_universidad: {
        type: String,
        required: true
    }
});

export const surveyModel = model("Survey", surveySchema);
