import {getConnection} from "../database/database"


export const checkDuplicatedEmail = async (req, res, next) => {
    //  Crea una conexion con la BBDD
    const connection = await getConnection();
    //  Guardo en roles los ids de los roles que existen 
    const usuario = await connection.query("SELECT uid FROM usuarios WHERE correo = ?", req.body.correo);

    console.log(usuario);

    if(usuario[0]) return res.status(500).json({message: "El usuario ya existe"})
    next();
}


export const checkRolesExisted = async (req, res, next) => {

    //  Crea una conexion con la BBDD
    const connection = await getConnection();
    //  Guardo en roles los ids de los roles que existen 
    const roles = await connection.query("SELECT id FROM roles");
    //  Los guardo en una lista
    const listaRoles = roles.map(row => row.id);
    
    //  Compruebo que envía roles en el req.body
    if (req.body.tipo){

        //  Descompongo la cadena de texto en una lista con los diferentes roles
        const nuevosRoles = req.body.tipo.split(",").map(item => item.trim());

        //  Recorro los roles con los que se intenta registrar el usuario para comprobar que existen
        for (let i = 0; i < nuevosRoles.length; i++) {
            const element = nuevosRoles[i];
            //  Si no está en la lista de roles existente devuelvo un status 404 y un mensaje con el rol que no se encontro
            if (!listaRoles.includes(element)){
                return res.status(404).json({message: `Rol ${element} not found`})
            }
        }
    }

    next();
}