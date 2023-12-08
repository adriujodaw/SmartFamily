"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _auth = require("../controlers/auth.controller");
var _middlewares = require("../middlewares");
//  Creo un objeto Router (es un objeto de express)
var router = (0, _express.Router)();

//  ------------------------ POST ------------------------
//  REGISTRO USUARIO
router.post("/api/auth/register", [_middlewares.verifySingUp.checkRolesExisted, _middlewares.verifySingUp.checkDuplicatedEmail], _auth.methods.signUp);
//  LOGIN USUARIO
router.post("/api/auth/login", _auth.methods.signIn);
var _default = exports["default"] = router;