"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _morgan = _interopRequireDefault(require("morgan"));
var _cors = _interopRequireDefault(require("cors"));
var _usuario = _interopRequireDefault(require("./routes/usuario.routes"));
var _casa = _interopRequireDefault(require("./routes/casa.routes"));
var _evento = _interopRequireDefault(require("./routes/evento.routes"));
var _tarea = _interopRequireDefault(require("./routes/tarea.routes"));
var _auth = _interopRequireDefault(require("./routes/auth.routes"));
var _invitacion = _interopRequireDefault(require("./routes/invitacion.routes"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var app = (0, _express["default"])();
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
app.use((0, _cors["default"])());

//  #####################################Settings#####################################

//  Puerto del servidor
app.set("port", 4000);

//  ####################################Middlewares#####################################

//  Usar morgan como entorno entre la peticion y la respuesta para ver los mensajes logs por consola
app.use((0, _morgan["default"])("dev"));
//  Configuracion para que el servidor pueda leer JSON
app.use(_express["default"].json());

//  Routes
app.use(_usuario["default"]);
app.use(_casa["default"]);
app.use(_evento["default"]);
app.use(_tarea["default"]);
app.use(_auth["default"]);
app.use(_invitacion["default"]);
var _default = exports["default"] = app;