import {Router} from "express"
import {methods as invitacionController} from "../controlers/invitacion.controller"
import {authJwt} from "../middlewares"

//  Creo un objeto Router (es un objeto de express)
const router=Router();

//  Con router.acción hago que al consultar al directorio (primer atributo), devuelva el metodo del controlador correspondiente (segundo atributo)

//  ------------------------ GET ------------------------
//  GET Invitacion POR ID
router.get("/api/invitacion/:id", invitacionController.getInvitacion)

//  ------------------------ POST ------------------------
//  CREAR INVITACION
router.post("/api/invitacion", invitacionController.addInvitacion);
//  CREAR INVITACION
router.post("/api/invitacion/unirse/:codigo", invitacionController.unirseInvitacion);

//  ------------------------ DELETE ------------------------
//  ELIMINAR INVITACION (no hace falta token)
router.delete("/api/invitaciones", invitacionController.deleteInvitacion)





export default router; 