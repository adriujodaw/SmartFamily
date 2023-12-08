"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _usuario = require("../controlers/usuario.controller");
var _middlewares = require("../middlewares");
//  Creo un objeto Router (es un objeto de express)
var router = (0, _express.Router)();

//  Con router.acción hago que al consultar al directorio (primer atributo), devuelva el metodo del controlador correspondiente (segundo atributo)

//  ------------------------ GET ------------------------
//  GET TODOS LOS USUARIOS
router.get("/api/usuarios", _usuario.methods.getUsuarios);
//  GET USUARIO POR CORREO
router.get("/api/usuario/correo/:correo", _usuario.methods.getUsuarioCorreo);
//  GET USUARIO POR ID
router.get("/api/usuario/id/:id", _usuario.methods.getUsuarioId);

/*
//  ------------------------ POST ------------------------
//  AÑADIR USUARIO (Lo comento porque esto lo hago con auth)
router.post("/api/usuario", usuarioController.addUsuario);
*/

//  ------------------------ DELETE ------------------------
//  ELIMINAR USUARIO
router["delete"]("/api/usuario/:uid", _usuario.methods.deleteUsuario);

//  ------------------------ PUT ------------------------
//  ACTUALIZAR USUARIO
router.put("/api/usuario/:id", _usuario.methods.updateUsuario);
router.put("/api/usuario/familypoints/:id", _usuario.methods.modificarFamilyPoints);
router.put("/api/usuario/nuevacasa/:id", _usuario.methods.anadirCasa);
router.put("/api/usuario/cambiorol/:id", _usuario.methods.cambiarRol);
var _default = exports["default"] = router;