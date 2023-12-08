import { getConnection } from "../database/database";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../config';
import {methods as generarAleatorio} from '../libs/generarIdAleatorio'


// ######################################################################## REGISTRO DE USUARIO ########################################################################
const signUp = async (req, res) => {



            console.log(req.body)
            //  Funcion para encriptar la contraseña
            const encryptPassword = async (password) => {
                const saltRounds = 10;
                const salt = await bcrypt.genSalt( saltRounds);
                const hashedPassword = await bcrypt.hash(password, salt);
                return hashedPassword;
            }

            // Genero  un id aleatorio (la funcion esta en ../libs/generarIdAleatorio)
            const uid = await generarAleatorio.generateEncryptedId();

            //  Guardo los atributos del usuario que me envia la peticion (el id no se pone porque se autoincrementa)
            let { nombre, sexo, correo, password, telefono, fecha_nacimiento, apellidos, tipo } = req.body;
            
    
            //Comprueba que ninguno de los campos este vacio
            if ( !nombre || !apellidos || !sexo || !correo || !password || !telefono || !fecha_nacimiento ) {
                const message = res.status(400).json({message:"Rellena todos los campos"})
                return message;
            }   else {



                    tipo = "f47ac10b-58cc-4372-a567-0e02b2c3d479";

                //  Encripto la contraseña
                password = await encryptPassword(password);
                const family_points = 0;

        
                //  Creo un objeto usuario con los atributos del usuario
                const usuario = { uid, nombre, sexo, correo, password, telefono, fecha_nacimiento, apellidos, tipo, family_points }
                console.log(usuario)

                //Creo el token con el id
                const token = jwt.sign({id: usuario.uid},config.SECRET,{
                    expiresIn:86400     //24 horas
                })
        
        
                //  Crea la conexion
                const connection = await getConnection();
        
                //  Añado el usuario a la BBDD de forma sincrona
                await connection.query("INSERT INTO usuarios set ?", usuario)

                const userFound = await connection.query("SELECT * from usuarios WHERE correo = ?", correo);
                
                const userCookie = {
                    id: userFound[0].uid,
                    nombre: userFound[0].nombre,
                    apellidos: userFound[0].apellidos,
                    tipo: userFound[0].tipo,
                    token: token,
                    correo: userFound[0].correo,
                    sexo: userFound[0].sexo,
                    family_points: userFound[0].family_points,
                    id_casa: userFound[0].id_casa
                }
        
                res.json({userCookie})
            }


    

}






//  ######################################################################## LOGIN DE USUARIO ########################################################################

const signIn = async (req, res, next) => {

    //  Funcion para comparar la contraseña con bcrypt
    const comparePassword = async (passwordLogin, passwordDB) => {
        return await bcrypt.compare(passwordLogin, passwordDB)
    }

    //  Guardo en la variable correo el correo que se envía en el body de la peticion
    const { correo, password } = req.body;

    console.log(req.body)

    if (!correo || !password) return res.status(404).json({message:"Rellena todos  los campos"});
    //  Crea la conexion
    const connection = await getConnection();
    //  Guardo en userFound el usuario que encuentre en la BBDD con el correo
    const userFound = await connection.query("SELECT * from usuarios WHERE correo = ?", correo);
    if(userFound[0] === undefined) return res.status(404).json({message:"Usuario no encontrado"});
    console.log(userFound[0].tipo)

    const idRoles = userFound[0].tipo.split(',');
    let roles = [];

    for (const id of idRoles) {
        let usuario = await connection.query("SELECT rol from roles WHERE id = ?", id);
        roles.push(usuario[0].rol)
    }

    console.log(roles)

        


    


    //  Si no encuentra ningún correo envio un 404 y un User not found
    if(userFound.length == 0){
        const message = res.status(404).json({message:"Contraseña incorrecta"});
        return message;
    }



    
    else {

        //  Creo una variable llamada matchPassword que guarda un booleano el resultado de la funcion comparePassword
        const matchPassword = await comparePassword(req.body.password, userFound[0].password);
        
        //  Si la variable matchPassword es false envio un 404 e Invalid password
        if(!matchPassword) return res.status(401).json({token:null, message: 'Usuario o contraseña incorrectos'})
        //  Creo un token con el id
        const token = jwt.sign({id: userFound[0].uid},config.SECRET,{
            expiresIn:86400  //24 horas
        })

        const userCookie = {
            id: userFound[0].uid,
            nombre: userFound[0].nombre,
            apellidos: userFound[0].apellidos,
            tipo: roles,
            token: token,
            correo: userFound[0].correo,
            sexo: userFound[0].sexo,
            family_points: userFound[0].family_points,
            id_casa: userFound[0].id_casa,
            telefono: userFound[0].telefono,
            fecha_nacimiento: userFound[0].fecha_nacimiento
        }

        res.json({userCookie})
    }

}






//  ######################################################################## EXPORTACION DE MÉTODOS ########################################################################
export const methods = {
    signUp,
    signIn
};
