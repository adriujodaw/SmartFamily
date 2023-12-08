"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _tarea = require("../controlers/tarea.controller");
var _middlewares = require("../middlewares");
//  Creo un objeto Router (es un objeto de express)
var router = (0, _express.Router)();

//  Con router.acción hago que al consultar al directorio (primer atributo), devuelva el metodo del controlador correspondiente (segundo atributo)

//  ------------------------ GET ------------------------
//  GET TODOS LAS TAREAS
router.get("/api/tareas/:id_casa", _middlewares.authJwt.verifyToken, _tarea.methods.getTareas);
//  GET TAREAS POR ID
router.get("/api/tarea/:id", _middlewares.authJwt.verifyToken, _tarea.methods.getTareaId);
//  GET TAREAS PENDIENTES
router.get("/api/tareas/pendientes/:id_casa", _middlewares.authJwt.verifyToken, _tarea.methods.getTareasPendientes);
//  GET TAREAS COMPLETADAS
router.get("/api/tareas/completadas/:id_casa", _middlewares.authJwt.verifyToken, _tarea.methods.getTareasCompletadas);

//  ------------------------ POST ------------------------
//  AÑADIR TAREA (solo pueden los padres)
router.post("/api/tarea", [_middlewares.authJwt.verifyToken, _middlewares.authJwt.isPadre], _tarea.methods.addTarea);

//  ------------------------ DELETE ------------------------
//  ELIMINAR TAREA (solo pueden los padres)
router["delete"]("/api/tarea/:id", [_middlewares.authJwt.verifyToken, _middlewares.authJwt.isPadre], _tarea.methods.deleteTarea);

//  ------------------------ PUT ------------------------
//  ACTUALIZAR TAREA (solo pueden los padres)
router.put("/api/tarea/:id", [_middlewares.authJwt.verifyToken, _middlewares.authJwt.isPadre], _tarea.methods.updateTarea);
//  MARCAR TAREA COMO COMPLETADA
router.put("/api/tarea/completar/:id", [_middlewares.authJwt.verifyToken], _tarea.methods.completarTarea);
var _default = exports["default"] = router;