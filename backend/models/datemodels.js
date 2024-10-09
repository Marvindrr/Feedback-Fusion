import { Schema, model } from "mongoose";

const datesshema = new Schema({

    name_estudiantes:{
        type:String,
        required:false
    },

    name_usuario:{
        type:String,
        required:true

    },

    name_respuesta: {
        type:String,
        required:true
    },

    name_preguntas: {
        type:String,
        required:true
    }
   

})

export const datemodels = model("dates", datesshema)