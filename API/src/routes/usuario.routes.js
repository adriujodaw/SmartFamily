import {Router} from "express"
import {methods as usuarioController} from "../controlers/usuario.controller"
import {verifyToken} from "../middlewares"


//  Creo un objeto Router (es un objeto de express)
const router=Router();

//  Con router.acción hago que al consultar al directorio (primer atributo), devuelva el metodo del controlador correspondiente (segundo atributo)

//  ------------------------ GET ------------------------
//  GET TODOS LOS USUARIOS
router.get("/api/usuarios", usuarioController.getUsuarios);
//  GET USUARIO POR CORREO
router.get("/api/usuario/correo/:correo", usuarioController.getUsuarioCorreo)
//  GET USUARIO POR ID
router.get("/api/usuario/id/:id", usuarioController.getUsuarioId)

/*
//  ------------------------ POST ------------------------
//  AÑADIR USUARIO (Lo comento porque esto lo hago con auth)
router.post("/api/usuario", usuarioController.addUsuario);
*/


//  ------------------------ DELETE ------------------------
//  ELIMINAR USUARIO
router.delete("/api/usuario/:uid", usuarioController.deleteUsuario)

//  ------------------------ PUT ------------------------
//  ACTUALIZAR USUARIO
router.put("/api/usuario/:id", usuarioController.updateUsuario)
router.put("/api/usuario/familypoints/:id", usuarioController.modificarFamilyPoints)
router.put("/api/usuario/nuevacasa/:id", usuarioController.anadirCasa)
router.put("/api/usuario/cambiorol/:id", usuarioController.cambiarRol)





export default router; 