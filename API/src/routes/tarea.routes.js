import {Router} from "express"
import {methods as tareaController} from "../controlers/tarea.controller"
import {authJwt} from "../middlewares"

//  Creo un objeto Router (es un objeto de express)
const router=Router();

//  Con router.acción hago que al consultar al directorio (primer atributo), devuelva el metodo del controlador correspondiente (segundo atributo)

//  ------------------------ GET ------------------------
//  GET TODOS LAS TAREAS
router.get("/api/tareas/:id_casa", authJwt.verifyToken, tareaController.getTareas);
//  GET TAREAS POR ID
router.get("/api/tarea/:id", authJwt.verifyToken, tareaController.getTareaId);
//  GET TAREAS PENDIENTES
router.get("/api/tareas/pendientes/:id_casa", authJwt.verifyToken, tareaController.getTareasPendientes);
//  GET TAREAS COMPLETADAS
router.get("/api/tareas/completadas/:id_casa", authJwt.verifyToken, tareaController.getTareasCompletadas);

//  ------------------------ POST ------------------------
//  AÑADIR TAREA (solo pueden los padres)
router.post("/api/tarea", [authJwt.verifyToken, authJwt.isPadre], tareaController.addTarea);

//  ------------------------ DELETE ------------------------
//  ELIMINAR TAREA (solo pueden los padres)
router.delete("/api/tarea/:id", [authJwt.verifyToken, authJwt.isPadre], tareaController.deleteTarea);

//  ------------------------ PUT ------------------------
//  ACTUALIZAR TAREA (solo pueden los padres)
router.put("/api/tarea/:id", [authJwt.verifyToken, authJwt.isPadre], tareaController.updateTarea);
//  MARCAR TAREA COMO COMPLETADA
router.put("/api/tarea/completar/:id", [authJwt.verifyToken], tareaController.completarTarea);





export default router; 