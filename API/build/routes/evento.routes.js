"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _evento = require("../controlers/evento.controller");
var _middlewares = require("../middlewares");
//  Creo un objeto Router (es un objeto de express)
var router = (0, _express.Router)();

//  Con router.acción hago que al consultar al directorio (primer atributo), devuelva el metodo del controlador correspondiente (segundo atributo)

//  ------------------------ GET ------------------------
//  GET TODOS LOS EVENTOS
router.get("/api/eventos/:id_casa", _middlewares.authJwt.verifyToken, _evento.methods.getEventos);
//  GET EVENTOS POR ID
router.get("/api/evento/:id", _middlewares.authJwt.verifyToken, _evento.methods.getEventoId);

//  ------------------------ POST ------------------------
//  AÑADIR EVENTOS (pueden también los hijos como prueba)
router.post("/api/evento", _middlewares.authJwt.verifyToken, _evento.methods.addEvento);

//  ------------------------ DELETE ------------------------
//  ELIMINAR EVENTOS (solo pueden los padres)
router["delete"]("/api/evento/:id", [_middlewares.authJwt.verifyToken, _middlewares.authJwt.isPadre], _evento.methods.deleteEvento);

//  ------------------------ PUT ------------------------
//  ACTUALIZAR EVENTOS (solo pueden los padres)
router.put("/api/evento/:id", [_middlewares.authJwt.verifyToken, _middlewares.authJwt.isPadre], _evento.methods.updateEvento);
var _default = exports["default"] = router;