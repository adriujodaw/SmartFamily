import {Router} from "express"
import {methods as eventoController} from "../controlers/evento.controller"
import {authJwt} from "../middlewares"

//  Creo un objeto Router (es un objeto de express)
const router=Router();

//  Con router.acción hago que al consultar al directorio (primer atributo), devuelva el metodo del controlador correspondiente (segundo atributo)

//  ------------------------ GET ------------------------
//  GET TODOS LOS EVENTOS
router.get("/api/eventos/:id_casa", authJwt.verifyToken, eventoController.getEventos);
//  GET EVENTOS POR ID
router.get("/api/evento/:id", authJwt.verifyToken, eventoController.getEventoId)

//  ------------------------ POST ------------------------
//  AÑADIR EVENTOS (pueden también los hijos como prueba)
router.post("/api/evento", authJwt.verifyToken, eventoController.addEvento);

//  ------------------------ DELETE ------------------------
//  ELIMINAR EVENTOS (solo pueden los padres)
router.delete("/api/evento/:id", [authJwt.verifyToken, authJwt.isPadre], eventoController.deleteEvento)

//  ------------------------ PUT ------------------------
//  ACTUALIZAR EVENTOS (solo pueden los padres)
router.put("/api/evento/:id", [authJwt.verifyToken, authJwt.isPadre], eventoController.updateEvento)





export default router; 