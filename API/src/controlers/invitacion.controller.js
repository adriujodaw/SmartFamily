import {getConnection} from "../database/database"
import {methods as generarAleatorio} from '../libs/generarIdAleatorio'

//  Funcion que crea el codigo de invitacion aleatorio
function generarCodigoAleatorio() {
    var caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var longitudCodigo = 5;
    var codigo = '';

    for (var i = 0; i < longitudCodigo; i++) {
        // Selecciona un carácter aleatorio de la cadena 'caracteres'
        var caracterAleatorio = caracteres.charAt(Math.floor(Math.random() * caracteres.length));
        
        // Concatena el carácter aleatorio al código
        codigo += caracterAleatorio;
    }

    return codigo;
}

// -------------------------------------------------------------------------------------------------- GET --------------------------------------------------------------------------------------------------


//  #################################### VER INVITACION POR ID ####################################
const getInvitacion = async (req, res)=>{

    try {
        //  Coge la id de los parametros
        const { id } = req.params;
        //  Crea la conexion
        const connection = await getConnection();
        //  Guarda en la variable result la respuesta de la consulta
        const result = await connection.query("SELECT codigo FROM invitaciones WHERE idCasa = ?", id);
        //  Devuelve un JSON con los datos obtenidos
        res.json(result)
    } catch (error) {
        //  Si hay un error mandaría el error 500 (fallo del servidor) y mandaría el mensaje del error
        res.status(500);
        res.send(error.message);
    }

};




// -------------------------------------------------------------------------------------------------- POST --------------------------------------------------------------------------------------------------

//  #################################### CREAR NUEVA INVITACION ####################################
const addInvitacion = async (req, res)=>{


    try {

        const codigo = generarCodigoAleatorio();
        //  Guardo los atributos del usuario que me envia la peticion (el id no se pone porque se autoincrementa)
        const { idCasa } = req.body;

        //  Creo un objeto usuario con los atributos del usuario
        const invitacion = { codigo, idCasa };

        //  Crea la conexion
        const connection = await getConnection();

        //  Añado el usuario a la BBDD de forma sincrona
        await connection.query("INSERT INTO invitaciones set ?", invitacion)
        
        //  Devuelve un JSON con los datos obtenidos
        res.json({message: `Invitacion creada con el código ${codigo}`, codigo: codigo})
    } catch (error) {
        //  Si hay un error mandaría el error 500 (fallo del servidor) y mandaría el mensaje del error
        res.status(500);
        res.send(error.message);
    }

};




//  #################################### UNIRSE INVITACION ####################################
const unirseInvitacion = async (req, res)=>{


    //try {

        //  Guardo los atributos del usuario que me envia la peticion (el id no se pone porque se autoincrementa)
        const { codigo } = req.params;

        const { uid } = req.body;

        //  Crea la conexion
        const connection = await getConnection();

        //  Añado el usuario a la BBDD de forma sincrona
        const id_casa = await connection.query("SELECT idCasa FROM invitaciones WHERE codigo = ?", codigo);

        if ( id_casa.length == 0 ) {
            const message = res.status(400).json({message:"Código incorrecto"});
            return message;
        }

        
        let idCasa = id_casa[0].idCasa;
        // Actualizo el id_casa del usuario 
        await connection.query("UPDATE usuarios SET id_casa = ? WHERE uid = ?", [idCasa, uid]);
        console.log(idCasa);

        let correoUsuario = await connection.query("SELECT correo FROM usuarios WHERE uid = ?", uid);
        correoUsuario = correoUsuario[0].correo;
        //console.log(correoUsuario)

        let miembrosCasa = await connection.query("SELECT miembros FROM casas WHERE idcasa = ?", idCasa);
        miembrosCasa = miembrosCasa[0].miembros;
        if(!miembrosCasa){
            miembrosCasa = correoUsuario
        }   else {
            miembrosCasa += `,${correoUsuario}`
        }
        
        


        console.log(miembrosCasa)


        await connection.query("UPDATE casas SET miembros = ? WHERE idcasa = ?", [miembrosCasa, idCasa]);

        
        
        //  Devuelve un JSON con los datos obtenidos
        res.json({message:'Se ha unido a la casa', id_casa: idCasa})
    // } catch (error) {
    //     //  Si hay un error mandaría el error 500 (fallo del servidor) y mandaría el mensaje del error
    //     res.status(500);
    //     res.send(error.message);
    // }

};




// -------------------------------------------------------------------------------------------------- DELETE --------------------------------------------------------------------------------------------------

//  #################################### ELIMINAR INVITACION ####################################
const deleteInvitacion = async (req, res)=>{

    try {
        const { id } = req.params;
        //  Crea la conexion
        const connection = await getConnection();
        //  Elimina las invitaciones que tienen más de 10 minutos de antiguedad
        const result = await connection.query("DELETE FROM invitaciones WHERE TIMESTAMPDIFF(MINUTE, CreatedAt, NOW()) > 10;");
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
    deleteInvitacion,
    addInvitacion,
    getInvitacion,
    unirseInvitacion
};