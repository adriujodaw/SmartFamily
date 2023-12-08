"use strict";

var _app = _interopRequireDefault(require("./app"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
//  Funcion principal que se vincula con app.js y muestra por consola el puerto que escucha el servidor
var main = function main() {
  _app["default"].listen(_app["default"].get("port"));
  console.log("Server on port ".concat(_app["default"].get("port")));
};
main();