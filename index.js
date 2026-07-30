import dotenv from "dotenv";
dotenv.config();
//----------- para leer el fichero .env, no importa al subirlo a internet

import express from "express";

const servidor = express();

servidor.listen(process.env.PORT);

