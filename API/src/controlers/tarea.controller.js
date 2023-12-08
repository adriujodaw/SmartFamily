import {getConnection} from "../database/database"
import {methods as generarAleatorio} from '../libs/generarIdAleatorio'




// -------------------------------------------------------------------------------------------------- GET --------------------------------------------------------------------------------------------------
const formatearFecha = (fechaOriginal) => {
    const fecha = new Date(fechaOriginal);
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Los meses comienzan en 0
    const año = fecha.getFullYear();
    const hora = fecha.getHours().toString().padStart(2, '0');
    const minutos = fecha.getMinutes().toString().padStart(2, '0');
    const segundos = fecha.getSeconds().toString().padStart(2, '0');
  
    return `${dia}/${mes}/${año} ${hora}:${minutos}:${segundos}`;
  }
//  #################################### VER TAREAS ####################################
const getTareas = async (req, res)=>{



      //try {
        const connection = await getConnection();
        //  Coge la id_casa de los parametros
        const { id_casa } = req.params;
        console.log("ID CASA")
        console.log(id_casa)

        const result = await connection.query("SELECT * FROM tareas WHERE id_casa = ?", id_casa);
      
        // Mapear las tareas y obtener nombres de participantes
        const tareasPromesas = result.map(async (tarea) => {
          const correosParticipantes = tarea.participantes.split(',');
      
          const nombresPromesas = correosParticipantes.map(async (participante) => {
            const connection = await getConnection();
            const usuario = await connection.query("SELECT nombre FROM usuarios WHERE correo = ?", participante);
            const nombre = usuario[0] ? usuario[0].nombre : 'Nombre no encontrado'; // Comprobar si usuario[0] existe
            return nombre;
          });
      
          const nombresParticipantes = await Promise.all(nombresPromesas);
      
          // Actualizar la tarea con los nombres de los participantes
          tarea.participantes = nombresParticipantes;
          //console.log(tarea)
          if (!tarea.fecha_completada) {
            tarea.fecha_completada = "Debes hacerla";
          } else {
            tarea.fecha_completada = formatearFecha(tarea.fecha_completada);
          }
      
          tarea.fecha_creacion = formatearFecha(tarea.fecha_creacion);
      
          return tarea; // Devolver la tarea actualizada
        });

      
        // Esperar a que todas las promesas de tareas se resuelvan
        const tareas = await Promise.all(tareasPromesas);
      
        // console.log("Datos modificados");
        // console.log(tareas);
      
        res.json(tareas);
      /*} catch (error) {
        res.status(500).send(error.message);
      }*/


};

//  #################################### VER TAREAS PENDIENTES ####################################
const getTareasPendientes = async (req, res)=>{


      try {
        const { id_casa } = req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM tareas WHERE id_casa = ? and estado <> 'Completado'", id_casa);
      
        // Mapear las tareas y obtener nombres de participantes
        const tareasPromesas = result.map(async (tarea) => {
          const correosParticipantes = tarea.participantes.split(',');
      
          const nombresPromesas = correosParticipantes.map(async (participante) => {
            const connection = await getConnection();
            const usuario = await connection.query("SELECT nombre FROM usuarios WHERE correo = ?", participante);
            const nombre = usuario[0] ? usuario[0].nombre : 'Nombre no encontrado'; // Comprobar si usuario[0] existe
            return nombre;
          });
      
          const nombresParticipantes = await Promise.all(nombresPromesas);
      
          // Actualizar la tarea con los nombres de los participantes
          tarea.participantes = nombresParticipantes;
      
          if (!tarea.fecha_completada) {
            tarea.fecha_completada = "Debes hacerla";
          } else {
            tarea.fecha_completada = formatearFecha(tarea.fecha_completada);
          }
      
          tarea.fecha_creacion = formatearFecha(tarea.fecha_creacion);
      
          return tarea; // Devolver la tarea actualizada
        });
      
        // Esperar a que todas las promesas de tareas se resuelvan
        const tareas = await Promise.all(tareasPromesas);
      
        console.log("Datos modificados");
        console.log(tareas);
      
        res.json(tareas);
      } catch (error) {
        res.status(500).send(error.message);
      }

};


//  #################################### VER TAREAS COMPLETADAS ####################################
const getTareasCompletadas = async (req, res)=>{


      try {
        const { id_casa } = req.params;

        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM tareas WHERE id_casa = ? and estado = 'Completado'", id_casa);
      
        // Mapear las tareas y obtener nombres de participantes
        const tareasPromesas = result.map(async (tarea) => {
          const correosParticipantes = tarea.participantes.split(',');
      
          const nombresPromesas = correosParticipantes.map(async (participante) => {
            const connection = await getConnection();
            const usuario = await connection.query("SELECT nombre FROM usuarios WHERE correo = ?", participante);
            const nombre = usuario[0] ? usuario[0].nombre : 'Nombre no encontrado'; // Comprobar si usuario[0] existe
            return nombre;
          });
      
          const nombresParticipantes = await Promise.all(nombresPromesas);
      
          // Actualizar la tarea con los nombres de los participantes
          tarea.participantes = nombresParticipantes;
      
          if (!tarea.fecha_completada) {
            tarea.fecha_completada = "Debes hacerla";
          } else {
            tarea.fecha_completada = formatearFecha(tarea.fecha_completada);
          }
      
          tarea.fecha_creacion = formatearFecha(tarea.fecha_creacion);
      
          return tarea; // Devolver la tarea actualizada
        });
      
        // Esperar a que todas las promesas de tareas se resuelvan
        const tareas = await Promise.all(tareasPromesas);
      
        console.log("Datos modificados");
        console.log(tareas);
      
        res.json(tareas);
      } catch (error) {
        res.status(500).send(error.message);
      }

};



//  #################################### VER TAREA POR ID ####################################
const getTareaId = async (req, res)=>{

    try {
        //  Coge la id de los parametros
        const { id } = req.params;
        //  Crea la conexion
        const connection = await getConnection();
        //  Guarda en la variable result la respuesta de la consulta
        const result = await connection.query("SELECT * FROM tareas WHERE idtareas = ?", id);
        //  Devuelve un JSON con los datos obtenidos
        res.json(result)
    } catch (error) {
        //  Si hay un error mandaría el error 500 (fallo del servidor) y mandaría el mensaje del error
        res.status(500);
        res.send(error.message);
    }

};





// -------------------------------------------------------------------------------------------------- POST --------------------------------------------------------------------------------------------------

//  #################################### AÑADIR NUEVA TAREA ####################################
const addTarea = async (req, res)=>{


    //try {
        //  Guardo los atributos del usuario que me envia la peticion (el id no se pone porque se autoincrementa)
        const { nombre, descripcion, participantes, estado, id_casa } = req.body;
        const idtareas = await generarAleatorio.generateEncryptedId();

        //  Comprueba que ninguno de los campos este vacio 
        //  No pongo fecha_completada como obligatorio
        if ( idtareas===undefined || !nombre || !estado || !participantes ) {
            const message = res.status(400).json({message:"Rellena todos los campos por favor"})
            return message;
        }

        // Separo los participantes y los meto en un array
        const correosParticipantes = participantes.split(',');
        // Declaro una variable para saber si los correos están registrados en la app
        let malCorreo = false

        // Mapeo los correos
        await Promise.all(correosParticipantes.map(async (participante) => {
          const connection = await getConnection();
          // Hago una consulta a la BBDD con cada correo del array
          const usuario = await connection.query("SELECT nombre FROM usuarios WHERE correo = ?", participante);

          // Si el usuario está vacío significa que no encontro ningún usuario con ese correo
          if(usuario.length == 0) {
            // Cambio la variable malCorreo a true
            malCorreo = true;
          }
        }));

        
        // Si alguno de los correos no es bueno devielve un error y su mensaje
        if (malCorreo == true) return res.status(400).json({message:"Alguno de los correos no se corresponden a usuarios de la aplicación"})


        //  Creo un objeto usuario con los atributos del usuario
        const tarea = { idtareas, nombre, descripcion, participantes, estado, id_casa }

        //  Crea la conexion
        const connection = await getConnection();

        //  Añado el usuario a la BBDD de forma sincrona
        const nuevaTarea = await connection.query("INSERT INTO tareas SET ?", tarea)
        
        //  Devuelve un JSON con los datos obtenidos
        res.json({nuevaTarea})
    // } catch (error) {
    //     //  Si hay un error mandaría el error 500 (fallo del servidor) y mandaría el mensaje del error
    //     res.status(500);
    //     res.send(error.message);
    // }
};





// -------------------------------------------------------------------------------------------------- PUT --------------------------------------------------------------------------------------------------

//  #################################### ACTUALUZAR TAREA ####################################
const updateTarea = async (req, res)=>{

    try {
        //  Recoge por parametros el id del usuario a cambiar
        const { id } = req.params;
        //  Recoge en el body los datos que hay que actualizar
        //  Como el id pudo haber cambiado porque es un hash de el nombre y la casa a la que pertenece, lo envío en el body
        const { idtareas, nombre, descripcion, participantes, estado, fecha_creacion, fecha_completada } = req.body;

        //  Comprueba que ninguno de los campos este vacio 
        //  No pongo fecha_completada como obligatorio
        if ( !idtareas || !nombre || !estado || !participantes ) {
            res.status(400).json({message:"Rellena todos los campos por favor"})
        }

        //  Crea la conexion
        const connection = await getConnection();

        

        //  Creo un objeto usuario en el que guardo todos los datos del usuario
        const tarea = { idtareas, nombre, descripcion, participantes, estado, fecha_creacion, fecha_completada }

        //  Guarda en la variable result la respuesta de la consulta
        const result = await connection.query("UPDATE tareas SET ? WHERE idtareas = ?", [tarea, id]);
        //  Devuelve un JSON con los datos obtenidos
        res.json(result)

    } catch (error) {
        //  Si hay un error mandaría el error 500 (fallo del servidor) y mandaría el mensaje del error
        res.status(500);
        res.send(error.message);
    }

};




//  #################################### COMPLETAR TAREA ####################################
const completarTarea = async (req, res)=>{

    //try {
        //  Recoge por parametros el id del usuario a cambiar
        const { id } = req.params;

        //  Crea la conexion
        const connection = await getConnection();



        //  Guarda en la variable result la respuesta de la consulta
        const result = await connection.query("UPDATE tareas SET estado = 'Completado' WHERE idtareas = ?",  id);
        //  Devuelve un JSON con los datos obtenidos
        res.json(result)

    /*} catch (error) {
        //  Si hay un error mandaría el error 500 (fallo del servidor) y mandaría el mensaje del error
        res.status(500);
        res.send(error.message);
    }*/

};






// -------------------------------------------------------------------------------------------------- DELETE --------------------------------------------------------------------------------------------------

//  #################################### ELIMINAR TAREAS ####################################
const deleteTarea = async (req, res)=>{

    try {
        //  Recibo el id actual por parametros
        const { id } = req.params;
        //  Crea la conexion
        const connection = await getConnection();
        //  Guarda en la variable result la respuesta de la consulta
        const result = await connection.query("DELETE FROM tareas WHERE idtareas = ?", id);
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
    getTareas,
    getTareaId,
    addTarea,
    updateTarea,
    deleteTarea,
    getTareasPendientes,
    getTareasCompletadas,
    completarTarea
};