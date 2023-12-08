import {Router} from "express"
import {methods as casaController} from "../controlers/casa.controller"
import {authJwt} from "../middlewares"

//  Creo un objeto Router (es un objeto de express)
const router=Router();

//  Con router.acción hago que al consultar al directorio (primer atributo), devuelva el metodo del controlador correspondiente (segundo atributo)

//  ------------------------ GET ------------------------
//  GET TODOS LAS CASAS
router.get("/api/casas", authJwt.verifyToken, casaController.getCasas);
//  GET CASA POR ID
router.get("/api/casa/:id", authJwt.verifyToken, casaController.getCasaId)

//  ------------------------ POST ------------------------
//  AÑADIR CASA
router.post("/api/casa", authJwt.verifyToken, casaController.addCasa);

//  ------------------------ DELETE ------------------------
//  ELIMINAR CASA (solo la puede eliminar el administrador)
router.delete("/api/casa/:id", [authJwt.verifyToken, authJwt.isAdmin], casaController.deleteCasa)

//  ------------------------ PUT ------------------------
//  ACTUALIZAR CASA (solo la pueden editar los padres)
router.put("/api/casa/:id", [authJwt.verifyToken, authJwt.isPadre], casaController.updateCasa)





export default router; 