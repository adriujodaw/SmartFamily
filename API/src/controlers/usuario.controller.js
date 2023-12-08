import {getConnection} from "../database/database"



// -------------------------------------------------------------------------------------------------- GET --------------------------------------------------------------------------------------------------

//  #################################### VER USUARIOS ####################################
const getUsuarios = async (req, res)=>{


    try {
        //  Crea la conexion
        const connection = await getConnection();
        //  Guarda en la variable result la respuesta de la consulta
        const result = await connection.query("SELECT * from usuarios");
        //  Devuelve un JSON con los datos obtenidos
        res.json(result)
    } catch (error) {
        //  Si hay un error mandaría el error 500 (fallo del servidor) y mandaría el mensaje del error
        res.status(500);
        res.send(error.message);
    }

};


//  #################################### VER USUARIO POR CORREO ####################################
const getUsuarioCorreo = async (req, res)=>{

    try {
        const { correo } = req.params;
        //  Crea la conexion
        const connection = await getConnection();
        //  Guarda en la variable result la respuesta de la consulta
        let result = await connection.query("SELECT * from usuarios WHERE correo = ?", correo);

        let tiposId = result[0].tipo.split(',')
        let tiposRol = []
        for (let i = 0; i < tiposId.length; i++) {
            const idRol = tiposId[i];
            let rol = await connection.query("SELECT rol from roles WHERE id = ?", idRol);
            console.log(rol[0].rol)
            tiposRol.push(rol[0].rol)
            
        }

        console.log(tiposRol)

        result[0].tipo = tiposRol
        console.log(result)
        console.log("\n\n\n\n\n")

        //  Devuelve un JSON con los datos obtenidos
        res.json(result)
    } catch (error) {
        //  Si hay un error mandaría el error 500 (fallo del servidor) y mandaría el mensaje del error
        res.status(500);
        res.send(error.message);
    }

};



//  #################################### VER USUARIO POR ID ####################################
const getUsuarioId = async (req, res)=>{

    try {
        const { id } = req.params;
        //  Crea la conexion
        const connection = await getConnection();
        //  Guarda en la variable result la respuesta de la consulta
        const result = await connection.query("SELECT * from usuarios WHERE uid = ?", id);
        //  Devuelve un JSON con los datos obtenidos
        res.json(result)
    } catch (error) {
        //  Si hay un error mandaría el error 500 (fallo del servidor) y mandaría el mensaje del error
        res.status(500);
        res.send(error.message);
    }

};



// -------------------------------------------------------------------------------------------------- POST --------------------------------------------------------------------------------------------------

//  #################################### AÑADIR NUEVO USUARIO ####################################
// const addUsuario = async (req, res)=>{


//     try {
//         //  Guardo los atributos del usuario que me envia la peticion (el id no se pone porque se autoincrementa)
//         const { nombre, sexo, correo, password, telefono, fecha_nacimiento, tipo } = req.body;

//         //Comprueba que ninguno de los campos este vacio
//         if ( nombre===undefined || sexo===undefined || correo===undefined || password===undefined || telefono===undefined || fecha_nacimiento===undefined || tipo===undefined ) {
//             res.status(400).json({message:"Bad Request. Please fill  all field"})
//         }

//         //  Creo un objeto usuario con los atributos del usuario
//         const usuario = { nombre, sexo, correo, password, telefono, fecha_nacimiento, tipo }

//         console.log(usuario);


//         //  Crea la conexion
//         const connection = await getConnection();

//         //  Añado el usuario a la BBDD de forma sincrona
//         await connection.query("INSERT INTO usuarios set ?", usuario)
        
//         //  Devuelve un JSON con los datos obtenidos
//         res.send("Usuario añadido")
//     } catch (error) {
//         //  Si hay un error mandaría el error 500 (fallo del servidor) y mandaría el mensaje del error
//         res.status(500);
//         res.send(error.message);
//     }

// };




// -------------------------------------------------------------------------------------------------- PUT --------------------------------------------------------------------------------------------------

//  #################################### ACTUALUZAR USUARIO ####################################
const updateUsuario = async (req, res)=>{

//    try {

        //  Recoge por parametros el id del usuario a cambiar
        const { id } = req.params;
        //  Recoge en el body los datos que hay que actualizar
        const { nombre, sexo, correo, telefono, fecha_nacimiento } = req.body;
        console.log(req.body);

        //Comprueba que ninguno de los campos este vacio
        if ( nombre===undefined || sexo===undefined || correo===undefined || password===undefined || telefono===undefined || fecha_nacimiento===undefined || tipo===undefined ) {
            res.status(400).json({message:"Bad 2 Request. Please fill  all field"})
        }

        //  Crea la conexion
        const connection = await getConnection();

        //  Creo un objeto usuario en el que guardo todos los datos del usuario
        const usuario = { nombre, sexo, correo, password, telefono, fecha_nacimiento, tipo }

        //  Guarda en la variable result la respuesta de la consulta
        const result = await connection.query("UPDATE usuarios SET ? WHERE uid = ?", [usuario, id]);
        //  Devuelve un JSON con los datos obtenidos
        res.send("Usuario modificado")
/*    } catch (error) {*/
        //  Si hay un error mandaría el error 500 (fallo del servidor) y mandaría el mensaje del error
        res.status(500);
        res.send(error.message);
//    }

};



const modificarFamilyPoints = async (req, res)=>{

    //try {
        //  Recoge por parametros el id del usuario a cambiar
        const { id } = req.params;
        //  Recoge en el body los datos que hay que actualizar
        const { family_points } = req.body;

        //Comprueba que ninguno de los campos este vacio
        if ( family_points===undefined ) {
            res.status(400).json({message:"No has enviado un numero de family_points"})
        }

        //  Crea la conexion
        const connection = await getConnection();

        const puntos = {"family_points": family_points}

        //  Guarda en la variable result la respuesta de la consulta
        const result = await connection.query("UPDATE usuarios SET ? WHERE uid = ?", [puntos, id]);

        //  Devuelve un JSON con los datos obtenidos
        res.json(result)
    /*} catch (error) {
        //  Si hay un error mandaría el error 500 (fallo del servidor) y mandaría el mensaje del error
        res.status(500);
        res.send(error.message);
    }*/

};

const cambiarRol = async (req, res)=>{

    //try {
        //  Recoge por parametros el id del usuario a cambiar
        const { id } = req.params;

        //  Crea la conexion
        const connection = await getConnection();

        //  Guarda en la variable result la respuesta de la consulta
        let roles = await connection.query("SELECT tipo FROM usuarios WHERE uid = ?", id);

        // Creo un array con los roles separados por comas
        roles = roles[0].tipo.split(',')

        let rolesNuevos = []

        // Invierto los roles
        if(roles.includes('4b3bfc65-3f8d-4957-bb9d-9071e3e30c1a')) {
            rolesNuevos.push('f47ac10b-58cc-4372-a567-0e02b2c3d479')
        }  else {
            rolesNuevos.push('4b3bfc65-3f8d-4957-bb9d-9071e3e30c1a')
        }

        if(roles.includes('9b2f3452-1a46-4e0d-8d49-0e6e9d4f8ec9')) {
            rolesNuevos.push('9b2f3452-1a46-4e0d-8d49-0e6e9d4f8ec9')
        }

        rolesNuevos = rolesNuevos.join(',')
        console.log("roles")
        console.log(roles)
        console.log("rolesNuevos")
        console.log(rolesNuevos)





        const result = await connection.query("UPDATE usuarios SET tipo = ? WHERE uid = ?", [rolesNuevos, id]);

        //  Devuelve un JSON con los datos obtenidos
        res.json(rolesNuevos)
    /*} catch (error) {
        //  Si hay un error mandaría el error 500 (fallo del servidor) y mandaría el mensaje del error
        res.status(500);
        res.send(error.message);
    }*/

};


const anadirCasa = async (req, res)=>{

    //try {
        //  Recoge por parametros el id del usuario a cambiar
        const { id } = req.params;
        //  Recoge en el body los datos que hay que actualizar
        const { id_casa } = req.body;

        //Comprueba que ninguno de los campos este vacio
        if ( !id_casa ) {
            res.status(400).json({message:"Fallo interno, cierra sesión y vuelve a intentarlo"})
        }

        //  Crea la conexion
        const connection = await getConnection();

        const casa = {"id_casa": id_casa}

        //  Guarda en la variable result la respuesta de la consulta
        const result = await connection.query("UPDATE usuarios SET ? WHERE uid = ?", [casa, id]);

        //  Devuelve un JSON con los datos obtenidos
        res.json(result)
    /*} catch (error) {
        //  Si hay un error mandaría el error 500 (fallo del servidor) y mandaría el mensaje del error
        res.status(500);
        res.send(error.message);
    }*/

};





// -------------------------------------------------------------------------------------------------- DELETE --------------------------------------------------------------------------------------------------

//  #################################### ELIMINAR USUARIO ####################################
const deleteUsuario = async (req, res)=>{

    try {
        const { uid } = req.params;
        //  Crea la conexion
        const connection = await getConnection();
        //  Guarda en la variable result la respuesta de la consulta
        const result = await connection.query("DELETE FROM usuarios WHERE uid = ?", uid);
        //  Devuelve un JSON con los datos obtenidos
        res.json(result)
    } catch (error) {
        //  Si hay un error mandaría el error 500 (fallo del servidor) y mandaría el mensaje del error
        res.status(500);
        res.send(error.message);
    }

};








//  #################################### EXPORTAR METODOS ####################################
export const methods = {
    getUsuarios,
    // addUsuario,
    getUsuarioCorreo,
    anadirCasa,
    deleteUsuario,
    updateUsuario,
    getUsuarioId,
    modificarFamilyPoints,
    cambiarRol
};