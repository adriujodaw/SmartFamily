import {getConnection} from "../database/database"
import {methods as generarAleatorio} from '../libs/generarIdAleatorio'



// -------------------------------------------------------------------------------------------------- GET --------------------------------------------------------------------------------------------------

//  #################################### VER EVENTOS ####################################
const getEventos = async (req, res)=>{

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

    const convertirMilisegundosAHMS = (milisegundos) => {
        // Calcula las horas, minutos y segundos
        const horas = Math.floor(milisegundos / 3600000);
        milisegundos %= 3600000;
      
        const minutos = Math.floor(milisegundos / 60000);
        milisegundos %= 60000;
      
        const segundos = Math.floor(milisegundos / 1000);
      
        return `${horas} horas, ${minutos} minutos y ${segundos} segundos`;
      }
    const nombreParticipante = async (correo) => {
        //  Crea la conexion

      }


      //try {

        const { id_casa } = req.params;

        const connection = await getConnection();
        const result = await connection.query("SELECT * from eventos WHERE id_casa = ?", id_casa);
        let proximosEventos = [];
        let eventosPasados = [];
      
        const eventosPromesas = result.map(async (evento) => {
          //    Separo los correos de los participantes por las comas
          const correosParticipantes = evento.participantes.split(',');
          //    Guardo en nombresPromesas los nombres de los usuarios
          const nombresPromesas = correosParticipantes.map(async (participante) => {
            console.log(participante)
            const connection = await getConnection();
            const nombre = await connection.query("SELECT nombre FROM usuarios WHERE correo = ?", participante);
            console.log(nombre)
            return nombre[0].nombre;
          });
          
          //    Guardo en nombresParticipantes el resultado de la promesa
          const nombresParticipantes = await Promise.all(nombresPromesas);
          //    Guardo los participantes en el objeto evento
          evento.participantes = nombresParticipantes;
          
          //    Declaro la fecha actual y la del evento para compararlas más adelante
          const fechaActual = new Date();
          const fechaEvento = new Date(evento.fecha);

          //    Formateo la fecha
          evento.fecha = formatearFecha(evento.fecha);
          //    Formateo la duracion
          evento.duracion = convertirMilisegundosAHMS(evento.duracion);

          //    Compruebo si ya ha pasado el evento para almacenarlos en proximosEventos o en eventosPasados
          if (fechaActual < fechaEvento) {
            proximosEventos.push(evento);
          } else {
            eventosPasados.push(evento);
          }
        });
      
        //  Espero a la promesa
        await Promise.all(eventosPromesas);
        
        //  Guardo en una lista llamada eventos los dos objetos de eventos
        const eventos = [eventosPasados, proximosEventos];


        //  Envío los eventos
        res.json(eventos);
      // } catch (error) {
      //   res.status(500);
      //   res.send(error.message);
      // }

};


//  #################################### VER EVENTO POR ID ####################################
const getEventoId = async (req, res)=>{

    try {
        //  Coge la id de los parametros
        const { id } = req.params;
        //  Crea la conexion
        const connection = await getConnection();
        //  Guarda en la variable result la respuesta de la consulta
        const result = await connection.query("SELECT * from eventos WHERE ideventos = ?", id);
        //  Devuelve un JSON con los datos obtenidos
        res.json(result)
    } catch (error) {
        //  Si hay un error mandaría el error 500 (fallo del servidor) y mandaría el mensaje del error
        res.status(500);
        res.send(error.message);
    }

};




// -------------------------------------------------------------------------------------------------- POST --------------------------------------------------------------------------------------------------

//  #################################### AÑADIR NUEVO EVENTO ####################################
const addEvento = async (req, res)=>{


    try {
        const ideventos = await generarAleatorio.generateEncryptedId();
        //  Guardo los atributos del usuario que me envia la peticion (el id no se pone porque se autoincrementa)
        let {fecha} = req.body
        const { nombre, hora, ubicacion, participantes, duracion, id_casa } = req.body;


        

        //Comprueba que ninguno de los campos este vacio
        if ( !ideventos || !nombre || !fecha || !ubicacion) {
          const respuesta = res.status(400).json({message:"Rellena todos los campos por favor"})
          return respuesta
        }
        const horaFormateada = hora +':00.000000'

        fecha = `${fecha} ${horaFormateada}`

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
        const evento = { ideventos, nombre, fecha, ubicacion, participantes, duracion, id_casa }

        //  Crea la conexion
        const connection = await getConnection();

        //  Añado el usuario a la BBDD de forma sincrona
        const eventoCreado = await connection.query("INSERT INTO eventos SET ?", evento)
        
        //  Devuelve un JSON con los datos obtenidos
        res.json({eventoCreado})
    } catch (error) {
        //  Si hay un error mandaría el error 500 (fallo del servidor) y mandaría el mensaje del error
        res.status(500);
        res.send(error.message);
    }

};




// -------------------------------------------------------------------------------------------------- PUT --------------------------------------------------------------------------------------------------

//  #################################### ACTUALUZAR EVENTO ####################################
const updateEvento = async (req, res)=>{

    try {
        //  Recoge por parametros el id del usuario a cambiar
        const { id } = req.params;
        //  Recoge en el body los datos que hay que actualizar
        //  Como el id pudo haber cambiado porque es un hash de el nombre y la casa a la que pertenece, lo envío en el body
        const { ideventos, nombre, fecha, ubicacion, participantes, duracion } = req.body;

        //Comprueba que ninguno de los campos este vacio
        if ( ideventos===undefined || nombre===undefined || fecha===undefined ) {
            res.status(400).json({message:"Bad Request. Please fill  all field"})
        }

        //  Crea la conexion
        const connection = await getConnection();


        //  Creo un objeto usuario en el que guardo todos los datos del usuario
        const evento = { ideventos, nombre, fecha, ubicacion, participantes, duracion }

        //  Guarda en la variable result la respuesta de la consulta
        const result = await connection.query("UPDATE eventos SET ? WHERE ideventos = ?", [evento, id]);
        //  Devuelve un JSON con los datos obtenidos
        res.json(result)

    } catch (error) {
        //  Si hay un error mandaría el error 500 (fallo del servidor) y mandaría el mensaje del error
        res.status(500);
        res.send(error.message);
    }

};





// -------------------------------------------------------------------------------------------------- DELETE --------------------------------------------------------------------------------------------------

//  #################################### ELIMINAR EVENTO ####################################
const deleteEvento = async (req, res)=>{

    try {
        const { id } = req.params;
        //  Crea la conexion
        const connection = await getConnection();
        //  Guarda en la variable result la respuesta de la consulta
        const result = await connection.query("DELETE FROM eventos WHERE ideventos = ?", id);
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
    getEventos,
    getEventoId,
    addEvento,
    updateEvento,
    deleteEvento
};