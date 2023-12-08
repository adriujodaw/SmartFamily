"use strict";

var _promiseMysql = _interopRequireDefault(require("promise-mysql"));
var _config = _interopRequireDefault(require("./../config"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/*
//  Creo la conexion con los datos de la BBDD (son variables de entorno que el archivo configuración las recibe desde el archivo .env, ahí se modifican)
const connection = mysql.createConnection({
    host:config.host,
    database:config.database,
    user:config.user,
    password:config.password,
});
*/ //  Creo la conexion con los datos de la BBDD (son variables de entorno que el archivo configuración las recibe desde el archivo .env, ahí se modifican)
var connection = _promiseMysql["default"].createConnection({
  host: "localhost",
  database: "smartfamily",
  user: "root",
  password: "root"
});

//  Funcion que crea una conexion
var getConnection = function getConnection() {
  return connection;
};

//  Exporto la funcion getConnection para poder creear una conexion
module.exports = {
  getConnection: getConnection
};