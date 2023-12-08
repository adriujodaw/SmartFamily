import express from "express";
import morgan from "morgan";
import cors from 'cors';

import usuarioRoutes from "./routes/usuario.routes";
import casaRoutes from "./routes/casa.routes";
import eventoRoutes from "./routes/evento.routes";
import tareaRoutes from "./routes/tarea.routes";
import authRoutes from "./routes/auth.routes";
import invitacionRoutes from "./routes/invitacion.routes";


const app=express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });

app.use(cors());
  
//  #####################################Settings#####################################

//  Puerto del servidor
app.set("port", 4000)

//  ####################################Middlewares#####################################

//  Usar morgan como entorno entre la peticion y la respuesta para ver los mensajes logs por consola
app.use(morgan("dev"))
//  Configuracion para que el servidor pueda leer JSON
app.use(express.json())


//  Routes
app.use(usuarioRoutes)
app.use(casaRoutes)
app.use(eventoRoutes)
app.use(tareaRoutes)
app.use(authRoutes)
app.use(invitacionRoutes)



export default app;