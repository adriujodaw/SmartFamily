"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _dotenv = require("dotenv");
//  Ejecuta la función config de DOTENV que recoge las variables de entorno del archivo .env
(0, _dotenv.config)();

//  Asigna el nombre del host, database... Tiene una cadena vacía como opcion por si a caso hay un error que no intente poner un valor nulo
var _default = exports["default"] = {
  host: process.env.HOST || "",
  database: process.env.DATABASE || "",
  user: process.env.USER || "",
  password: process.env.PASSWORD || "",
  SECRET: 'claveSecretaToken'
};