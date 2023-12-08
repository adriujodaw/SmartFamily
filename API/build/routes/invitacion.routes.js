"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _invitacion = require("../controlers/invitacion.controller");
var _middlewares = require("../middlewares");
//  Creo un objeto Router (es un objeto de express)
var router = (0, _express.Router)();

//  Con router.acción hago que al consultar al directorio (primer atributo), devuelva el metodo del controlador correspondiente (segundo atributo)

//  ------------------------ GET ------------------------
//  GET Invitacion POR ID
router.get("/api/invitacion/:id", _invitacion.methods.getInvitacion);

//  ------------------------ POST ------------------------
//  CREAR INVITACION
router.post("/api/invitacion", _invitacion.methods.addInvitacion);
//  CREAR INVITACION
router.post("/api/invitacion/unirse/:codigo", _invitacion.methods.unirseInvitacion);

//  ------------------------ DELETE ------------------------
//  ELIMINAR INVITACION (no hace falta token)
router["delete"]("/api/invitaciones", _invitacion.methods.deleteInvitacion);
var _default = exports["default"] = router;