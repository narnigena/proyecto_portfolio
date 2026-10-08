import dotenv from "dotenv";
dotenv.config();
//-----------------

import { MongoClient, ObjectId } from "mongodb";

function conectar(){
    return MongoClient.connect(process.env.MONGO_URL);
}

export function buscarUsuario(nombre){
    return new Promise((ok,ko) => {
        let conexion = null;

        conectar()
        .then(conexionMongo => {
            conexion = conexionMongo;
            let coleccion = conexion.db("portfolio").collection("usuarios");
            return coleccion.findOne({ usuario : nombre });
        })
        .then( usuario => {
            ok(usuario);
        })
        .catch( e => ko())
        .finally(() => {
            if(conexion){
                conexion.close();
            }
        });
    });
}

export function leerProyectos(){
    return new Promise((ok,ko) => {
        let conexion = null;

        conectar()
        .then(conexionMongo => {
            conexion = conexionMongo;
            let coleccion = conexion.db("portfolio").collection("proyectos");
            return coleccion.find({}).toArray();
            //dame todos los documentos de la colección proyectos
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

export function leerProyecto(id){
    return new Promise((ok,ko) => {

        let conexion = null;

        conectar()
        .then(conexionMongo => {

            conexion = conexionMongo;

            let coleccion = conexion
                .db("portfolio")
                .collection("proyectos");

            return coleccion.findOne({
                _id: new ObjectId(id)
            });

        })
        .then(proyecto => {

            ok(proyecto);

        })
        .catch(e => {

            ko(e);

        })
        .finally(() => {

            if(conexion){
                conexion.close();
            }

        });

    });
}

export function crearProyectos(objProyecto){//usuario
    return new Promise((ok,ko) => {
        let conexion = null;

        conectar()
        .then(conexionMongo => {
            conexion = conexionMongo;
            let coleccion = conexion.db("portfolio").collection("proyectos");
            return coleccion.insertOne(objProyecto);
        })
        .then( ({insertedId}) => {
            ok(insertedId);
        })
        .catch( e => ko(e))
        .finally(() => {
            if(conexion){
                conexion.close();
            }
        });
    });
}


export function actualizarProyectos(id,objCambios){//cyakqyuer combinacion
    return new Promise((ok,ko) => {
        let conexion = null;

        conectar()
        .then(conexionMongo => {
            conexion = conexionMongo;
            let coleccion = conexion.db("portfolio").collection("proyectos");
            return coleccion.updateOne({ _id : new ObjectId(id) }, { $set : objCambios});
        })
        .then( ({modifiedCount,matchedCount}) => {
            ok({modifiedCount,matchedCount});
        })
        .catch( e => ko(e))
        .finally(() => {
            if(conexion){
                conexion.close();
            }
        });
    });
}

// prueba borrar '6a57f7e542816d5ecf2625e1'
export function borrarProyectos(id){//
    return new Promise((ok,ko) => {
        let conexion = null;

        conectar()
        .then(conexionMongo => {
            conexion = conexionMongo;
            let coleccion = conexion.db("portfolio").collection("proyectos");
            return coleccion.deleteOne({ _id : new ObjectId(id) });
        })
        .then( ({deletedCount}) => {
            ok(deletedCount);
        })
        .catch( e => ko(e))
        .finally(() => {
            if(conexion){
                conexion.close();
            }
        });
    });
}
