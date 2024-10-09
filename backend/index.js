import express from "express";
import mongoose from "mongoose";
import { datemodels } from "./models/datemodels.js";

mongoose.connect("mongodb://localhost:27017/cuestionario").then
(()=>{
    console.log("conexion exitosa a la bd")
})
const app = express();
app.use(express.json())
app.get("/",(req,res)=>{
    res.send("hola desde mi servidor papu")

})

app.post("/create",(req,res)=>{
    const  name_estudiantes = req.body.name_estudiantes;
    const  name_usuario = req.body.name_usuario;
    const  name_respuesta = req.body.name_respuesta;
    const  name_preguntas = req.body.name_preguntas;
   

    if(!name_estudiantes|| !name_respuesta|| !name_preguntas|| !name_usuario){
        return res.status(400).json({
            msg:"necesitamos todos los valores para almacenar un documento!"
        })
    }                   
    const obj = {
       name_estudiante: name_estudiantes,
       name_usuario: name_usuario,
       name_respuesta: name_respuesta,
       name_preguntas: name_preguntas,
        
    };

    datemodels.create(obj);
    return res.status(200).json({
        msg:"cita almacenada con exito papu"
    })

})

app.listen(400,()=>[
   console.log("servidor en linea")
])
//post- crear, put- actualizar, get-obtener, delete- eliminar

