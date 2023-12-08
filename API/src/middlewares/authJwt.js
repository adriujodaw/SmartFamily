import jwt from "jsonwebtoken";
import config from '../config';
import {getConnection} from "../database/database"


export const verifyToken = async (req, res, next) => {
    //  Recoge el token de la cabecera de la peticion
    const token = req.headers["x-acces-token"];

    //  Si no hay token devielve un 303
    if(!token) return res.status(303).json({message: "No token provided"});

    //  Comprueba si es un token correcto
    try {
        //  Decodifico el id del token
        const decodedId = jwt.verify(token, config.SECRET)

        //  Lo guardo en req.id
        req.uid = decodedId.id;
        
        //  Creo una conexion a la BBDD
        const connection = await getConnection();
        //  Consulto si existe el usuario
        const user = await connection.query("SELECT uid FROM usuarios WHERE uid = ?", req.uid);
        //  Devuelvo un 404 si el usuario no se encontró
        if(!user) return res.status(404).json({message: "No user found"});

    } catch (error) {
        return res.status(404).json({message: "Unauthorized"});
    }
    
    
    
    next();
}

/*

// -------------------------------------------------- DICCIONARIO CON LOS IDS DE LOS ROLES --------------------------------------------------
const rolesMapeo = {
    'f47ac10b-58cc-4372-a567-0e02b2c3d479' : 'hijo',
    '4b3bfc65-3f8d-4957-bb9d-9071e3e30c1a' : 'padre',
    '9b2f3452-1a46-4e0d-8d49-0e6e9d4f8ec9' : 'administrador'
}

*/

export const isPadre = async (req, res, next) => {
    
    //  Recoge el token de la cabecera de la peticion
    const token = req.headers["x-acces-token"];

    //  Si no hay token devielve un 303
    if(!token) return res.status(303).json({message: "No token provided"});

    //  Comprueba si es un token correcto
    try {
        //  Decodifico el id del token
        const decodedId = jwt.verify(token, config.SECRET)

        //  Lo guardo en req.id
        req.uid = decodedId.id;
        
        //  Creo una conexion a la BBDD
        const connection = await getConnection();
        //  Busca el usuario que tenga el id decodificado
        const user = await connection.query("SELECT tipo FROM usuarios WHERE uid = ?", req.uid);

        
        //  Guardo el id del rol 'padre'
        const rolPadre = await connection.query("SELECT id FROM roles WHERE rol = 'padre'");

        //  Creo una lista con los roles del usuario (pueden ser varios)
        const listaRoles = user[0].tipo.split(",").map(item => item.trim());

        //  Declaro la variable booleana autrhorized que me servira para saber si ell usuario está autorizado o no
        let authorized = false;

        //  Compruebo con un foreach si coincide que está autorizado alguno de los roles
        listaRoles.forEach((rol) => {

            if (rol == rolPadre[0].id){
                authorized = true;
            }

        });

        
        //  Si no está autorizado hago un status 500 y envío un mensaje
        if (!authorized) return res.status(500).json({message: "You are not authorized"})



    } catch (error) {
        return res.status(404).json({message: "Unauthorized"});
    }
    next();

}

export const isAdmin = async (req, res, next) => {
       //  Recoge el token de la cabecera de la peticion
       const token = req.headers["x-acces-token"];

       //  Si no hay token devielve un 303
       if(!token) return res.status(303).json({message: "No token provided"});
   
       //  Comprueba si es un token correcto
       try {
           //  Decodifico el id del token
           const decodedId = jwt.verify(token, config.SECRET)
   
           //  Lo guardo en req.id
           req.uid = decodedId.id;
           
           //  Creo una conexion a la BBDD
           const connection = await getConnection();
           //  Busca el usuario que tenga el id decodificado
           const user = await connection.query("SELECT tipo FROM usuarios WHERE uid = ?", req.uid);
   
           
           //  Guardo el id del rol 'padre'
           const rolAdmin = await connection.query("SELECT id FROM roles WHERE rol = 'administrador'");
   
           //  Creo una lista con los roles del usuario (pueden ser varios)
           const listaRoles = user[0].tipo.split(",").map(item => item.trim());
   
           //  Declaro la variable booleana autrhorized que me servira para saber si ell usuario está autorizado o no
           let authorized = false;
   
           //  Compruebo con un foreach si coincide que está autorizado alguno de los roles
           listaRoles.forEach((rol) => {
   
               if (rol == rolAdmin[0].id){
                   authorized = true;
               }
   
           });
   
           
           //  Si no está autorizado hago un status 500 y envío un mensaje
           if (!authorized) return res.status(500).json({message: "You are not authorized"})
   
   
   
       } catch (error) {
           return res.status(404).json({message: "Unauthorized"});
       }
       next();
}