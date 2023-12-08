"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _casa = require("../controlers/casa.controller");
var _middlewares = require("../middlewares");
//  Creo un objeto Router (es un objeto de express)
var router = (0, _express.Router)();

//  Con router.acción hago que al consultar al directorio (primer atributo), devuelva el metodo del controlador correspondiente (segundo atributo)

//  ------------------------ GET ------------------------
//  GET TODOS LAS CASAS
router.get("/api/casas", _middlewares.authJwt.verifyToken, _casa.methods.getCasas);
//  GET CASA POR ID
router.get("/api/casa/:id", _middlewares.authJwt.verifyToken, _casa.methods.getCasaId);

//  ------------------------ POST ------------------------
//  AÑADIR CASA
router.post("/api/casa", _middlewares.authJwt.verifyToken, _casa.methods.addCasa);

//  ------------------------ DELETE ------------------------
//  ELIMINAR CASA (solo la puede eliminar el administrador)
router["delete"]("/api/casa/:id", [_middlewares.authJwt.verifyToken, _middlewares.authJwt.isAdmin], _casa.methods.deleteCasa);

//  ------------------------ PUT ------------------------
//  ACTUALIZAR CASA (solo la pueden editar los padres)
router.put("/api/casa/:id", [_middlewares.authJwt.verifyToken, _middlewares.authJwt.isPadre], _casa.methods.updateCasa);
var _default = exports["default"] = router;