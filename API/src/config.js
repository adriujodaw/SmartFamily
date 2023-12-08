import{config} from "dotenv";

//  Ejecuta la función config de DOTENV que recoge las variables de entorno del archivo .env
config();

//  Asigna el nombre del host, database... Tiene una cadena vacía como opcion por si a caso hay un error que no intente poner un valor nulo
export default{
    host: process.env.HOST || "",
    database: process.env.DATABASE || "",
    user: process.env.USER || "",
    password: process.env.PASSWORD || "",
    SECRET: 'claveSecretaToken'
}