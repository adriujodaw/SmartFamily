import {getConnection} from "../database/database"
import {methods as generarAleatorio} from '../libs/generarIdAleatorio'




// -------------------------------------------------------------------------------------------------- GET --------------------------------------------------------------------------------------------------

//  #################################### VER CASAS ####################################
const getCasas = async (req, res)=>{


    try {
        //  Crea la conexion
        const connection = await getConnection();
        //  Guarda en la variable result la respuesta de la consulta
        const result = await connection.query("SELECT * from casas");
        //  Devuelve un JSON con los datos obtenidos
        res.json(result)
    } catch (error) {
        //  Si hay un error mandaría el error 500 (fallo del servidor) y mandaría el mensaje del error
        res.status(500);
        res.send(error.message);
    }

};


//  #################################### VER CASA POR ID ####################################
const getCasaId = async (req, res)=>{

    try {
        //  Coge la id de los parametros
        const { id } = req.params;
        //  Crea la conexion
        const connection = await getConnection();
        //  Guarda en la variable result la respuesta de la consulta
        let result = await connection.query("SELECT * from casas WHERE idcasa = ?", id);
        // Si el campo miembros está vacío le asigno un texto más amigable para el usuario
        if (result[0].miembros == null) {result[0].miembros = ["¡No tienes ningún integrante todavía!"]}
        else { result[0].miembros = result[0].miembros.split(',')}
        //  Devuelve un JSON con los datos obtenidos
        res.json(result)
    } catch (error) {
        //  Si hay un error mandaría el error 500 (fallo del servidor) y mandaría el mensaje del error
        res.status(500);
        res.send(error.message);
    }

};




// -------------------------------------------------------------------------------------------------- POST --------------------------------------------------------------------------------------------------

//  #################################### AÑADIR NUEVA CASA ####################################
const addCasa = async (req, res)=>{


    try {
        // Genero  un id aleatorio (la funcion esta en ../libs/generarIdAleatorio)
        const idcasa = await generarAleatorio.generateEncryptedId();
        //  Guardo los atributos del usuario que me envia la peticion (el id no se pone porque se autoincrementa)
        const { nombre, administrador } = req.body;

        //Comprueba que ninguno de los campos este vacio
        if ( !nombre ) {
            res.status(400).json({message:"Tienes que asignarle un nombre a tu nueva casa"})
        }
        if ( !administrador ) {
            res.status(400).json({message:"Fallo interno. Cierre sesión y vuelva a intentarlo"})
        }


        //  Creo un objeto usuario con los atributos del usuario
        const casa = { idcasa, administrador, nombre }

        //  Crea la conexion
        const connection = await getConnection();

        //  Añado el usuario a la BBDD de forma sincrona
        await connection.query("INSERT INTO casas set ?", casa)
        
        //  Devuelve un JSON con los datos obtenidos
        res.json({message:"Casa creada", id_casa: idcasa})
    } catch (error) {
        //  Si hay un error mandaría el error 500 (fallo del servidor) y mandaría el mensaje del error
        res.status(500);
        res.json(error);
    }

    
};




// -------------------------------------------------------------------------------------------------- PUT --------------------------------------------------------------------------------------------------

//  #################################### ACTUALUZAR CASA ####################################
const updateCasa = async (req, res)=>{

    try {
        //  Recoge por parametros el id del usuario a cambiar
        const { id } = req.params;
        //  Recoge en el body los datos que hay que actualizar
        const { nombre, administrador, miembros } = req.body;

        //Comprueba que ninguno de los campos este vacio
        if ( nombre===undefined || administrador===undefined || miembros===undefined ) {
            res.status(400).json({message:"Bad Request. Please fill  all field"})
        }

        //  Crea la conexion
        const connection = await getConnection();

        //  Creo un objeto usuario en el que guardo todos los datos del usuario
        const casa = { nombre, administrador, miembros }

        //  Guarda en la variable result la respuesta de la consulta
        const result = await connection.query("UPDATE casas SET ? WHERE idcasa = ?", [casa, id]);
        //  Devuelve un JSON con los datos obtenidos
        res.send("Casa modificada")

    } catch (error) {
        //  Si hay un error mandaría el error 500 (fallo del servidor) y mandaría el mensaje del error
        res.status(500);
        res.send(error.message);
    }

};





// -------------------------------------------------------------------------------------------------- DELETE --------------------------------------------------------------------------------------------------

//  #################################### ELIMINAR CASA ####################################
const deleteCasa = async (req, res)=>{

    try {
        const { id } = req.params;
        //  Crea la conexion
        const connection = await getConnection();
        //  Guarda en la variable result la respuesta de la consulta
        const result = await connection.query("DELETE FROM casas WHERE idcasa = ?", id);
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
    getCasas,
    addCasa,
    getCasaId,
    updateCasa,
    deleteCasa
};