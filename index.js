import dotenv from "dotenv";
dotenv.config();
//----------- para leer el fichero .env, no importa al subirlo a internet

import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cors from "cors";
import { buscarUsuario,leerProyectos,leerProyecto, crearProyectos,actualizarProyectos,borrarProyectos } from "./db.js";

function autorizar(peticion,respuesta,siguiente){
    if(peticion.headers.authorization){
        let posibleToken = peticion.headers.authorization.split("Bearer ");

        if(posibleToken.length == 2 && posibleToken[0] == ""){
            return jwt.verify(posibleToken[1],process.env.SECRET, (error,datos) => {
                if(!error){
                    peticion.usuario = datos.usuario;
                    return siguiente();
                }
                respuesta.sendStatus(401);
            });
        }
    }
    respuesta.sendStatus(401);

}

const servidor = express();

servidor.use(cors()); //el frontend puede hacer peticiones a localhost4000

servidor.use(express.json());

servidor.post("/login", async (peticion,respuesta,siguiente) => {
    let {usuario,password} = peticion.body;

    if(!usuario || usuario.trim() == "" || !password || password.trim() == ""){
        return siguiente(true);
    }
    try{
        let usuarioBBDD = await buscarUsuario(usuario);

        if(!usuarioBBDD){
            return siguiente();
        }

        let valido = await bcrypt.compare(password,usuarioBBDD.password);

        if(!valido){
            return respuesta.sendStatus(403);
        }
       
        let token = jwt.sign({ usuario : usuarioBBDD._id},process.env.SECRET);

        respuesta.json({ token });//tienes acceso

    }catch(e){
        respuesta.sendStatus(500);

    }
});

//servidor.use(autorizar);

servidor.get("/api/proyectos", async (peticion,respuesta) => {
    try{
        let proyectos = await leerProyectos();

        respuesta.json(proyectos);
    }catch(e){
        console.log(e);
        respuesta.sendStatus(500);
    }
   
});

servidor.get("/api/proyectos/:id", async (peticion,respuesta,siguiente) => {

    if(!/^[a-f0-9]{24}$/.test(peticion.params.id)){
        return siguiente();
    }

    try{

        let proyecto = await leerProyecto(
            peticion.params.id
        );

        if(!proyecto){
            return siguiente();
        }

        respuesta.json(proyecto);

    }catch(e){

        respuesta.sendStatus(500);

    }

});

servidor.post("/api/proyectos/nuevo",autorizar, async (peticion,respuesta) => {
        let {titulo,slug,categoria,descripcion,imagenes,herramientas,destacado,usuarioId,fecha} = peticion.body;

        //la validacion comprueba que los datos recibidos tienen el tipo correcto antes de guardar el proyecto en la base de datos. Si alguno no cumple , la variable será falsa y se devuelve un Bad Request 400

        let valido = typeof titulo == "string" && typeof slug == "string" &&typeof categoria == "string" && typeof descripcion == "string" && Array.isArray(imagenes) && Array.isArray(herramientas) && typeof destacado == "boolean" && /^[0-9]{1,5}$/.test(usuarioId) && /^[0-9]{4}$/.test(fecha);

        if(!valido){
            return respuesta.sendStatus(400);
        }

        let {usuario} = peticion;


        try{
            let _id = await crearProyectos({titulo,slug,categoria,descripcion,imagenes,herramientas,destacado,usuarioId,fecha,usuario});

            respuesta.status(201);
            respuesta.json({_id});
        }catch(e){
            respuesta.sendStatus(500);

        }
});


servidor.patch("/api/proyectos/actualizar/:id", autorizar, async (peticion,respuesta,siguiente) => {
        
        if(!/^[a-f0-9]{24}$/.test(peticion.params.id)){
            return siguiente();
        }
        try{
            let {modifiedCount,matchedCount} = await actualizarProyectos(peticion.params.id,peticion.body);

            if(matchedCount){
                return respuesta.sendStatus(204);
            }
            siguiente();

        }catch(e){
            respuesta.sendStatus(500);
        }
        

});


servidor.delete("/api/proyectos/borrar/:id", async (peticion,respuesta,siguiente) => {
        if(!/^[a-f0-9]{24}$/.test(peticion.params.id)){
            return siguiente();
        }
        try{
            let cantidad = await borrarProyectos(peticion.params.id);

            if(cantidad){
                return respuesta.sendStatus(204);
            }
            siguiente();
        }catch(e){
            respuesta.sendStatus(500);
        }

});

servidor.use((error,peticion,respuesta,siguiente) => {
        respuesta.sendStatus(400);
});

servidor.use((peticion,respuesta) =>{
        respuesta.sendStatus(404);
});

servidor.listen(process.env.PORT, () => {
    console.log("API PORTFOLIO ARRANCADA");
    console.log("Puerto:", process.env.PORT);
    console.log("POST /login disponible"); 
});

