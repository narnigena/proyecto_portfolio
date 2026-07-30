import dotenv from "dotenv";
dotenv.config();
//-----------------

import { MongoClient, ObjectId } from "mongodb";

function conectar(){
    return MongoClient.connect(process.env.MONGO_URL);
}

export function leerProyectos(){
    return new Promise((ok,ko) => {
        let conexion = null;

        conectar()
        .then(conexionMongo => {
            conexion = conexionMongo;
            let coleccion = conexion.db("proyectos").collection("proyectos");
            return coleccion.find({}).toArray();
        })
        .then( proyectos => {
            ok(proyectos);
        })
        .catch( e => ko())
        .finally(() => {
            if(conexion){
                conexion.close();
            }
        });
    });
}

leerProyectos()
.then( x => console.log(x))
.catch((x) => console.log(""));