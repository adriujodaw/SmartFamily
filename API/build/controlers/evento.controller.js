"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.methods = void 0;
var _database = require("../database/database");
var _generarIdAleatorio = require("../libs/generarIdAleatorio");
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
// -------------------------------------------------------------------------------------------------- GET --------------------------------------------------------------------------------------------------
//  #################################### VER EVENTOS ####################################
var getEventos = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var formatearFecha, convertirMilisegundosAHMS, nombreParticipante, id_casa, connection, result, proximosEventos, eventosPasados, eventosPromesas, eventos;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          formatearFecha = function formatearFecha(fechaOriginal) {
            var fecha = new Date(fechaOriginal);
            var dia = fecha.getDate().toString().padStart(2, '0');
            var mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Los meses comienzan en 0
            var año = fecha.getFullYear();
            var hora = fecha.getHours().toString().padStart(2, '0');
            var minutos = fecha.getMinutes().toString().padStart(2, '0');
            var segundos = fecha.getSeconds().toString().padStart(2, '0');
            return "".concat(dia, "/").concat(mes, "/").concat(año, " ").concat(hora, ":").concat(minutos, ":").concat(segundos);
          };
          convertirMilisegundosAHMS = function convertirMilisegundosAHMS(milisegundos) {
            // Calcula las horas, minutos y segundos
            var horas = Math.floor(milisegundos / 3600000);
            milisegundos %= 3600000;
            var minutos = Math.floor(milisegundos / 60000);
            milisegundos %= 60000;
            var segundos = Math.floor(milisegundos / 1000);
            return "".concat(horas, " horas, ").concat(minutos, " minutos y ").concat(segundos, " segundos");
          };
          nombreParticipante = /*#__PURE__*/function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(correo) {
              return _regeneratorRuntime().wrap(function _callee$(_context) {
                while (1) switch (_context.prev = _context.next) {
                  case 0:
                  case "end":
                    return _context.stop();
                }
              }, _callee);
            }));
            return function nombreParticipante(_x3) {
              return _ref2.apply(this, arguments);
            };
          }(); //try {
          id_casa = req.params.id_casa;
          _context4.next = 6;
          return (0, _database.getConnection)();
        case 6:
          connection = _context4.sent;
          _context4.next = 9;
          return connection.query("SELECT * from eventos WHERE id_casa = ?", id_casa);
        case 9:
          result = _context4.sent;
          proximosEventos = [];
          eventosPasados = [];
          eventosPromesas = result.map( /*#__PURE__*/function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(evento) {
              var correosParticipantes, nombresPromesas, nombresParticipantes, fechaActual, fechaEvento;
              return _regeneratorRuntime().wrap(function _callee3$(_context3) {
                while (1) switch (_context3.prev = _context3.next) {
                  case 0:
                    //    Separo los correos de los participantes por las comas
                    correosParticipantes = evento.participantes.split(','); //    Guardo en nombresPromesas los nombres de los usuarios
                    nombresPromesas = correosParticipantes.map( /*#__PURE__*/function () {
                      var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(participante) {
                        var connection, nombre;
                        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
                          while (1) switch (_context2.prev = _context2.next) {
                            case 0:
                              console.log(participante);
                              _context2.next = 3;
                              return (0, _database.getConnection)();
                            case 3:
                              connection = _context2.sent;
                              _context2.next = 6;
                              return connection.query("SELECT nombre FROM usuarios WHERE correo = ?", participante);
                            case 6:
                              nombre = _context2.sent;
                              console.log(nombre);
                              return _context2.abrupt("return", nombre[0].nombre);
                            case 9:
                            case "end":
                              return _context2.stop();
                          }
                        }, _callee2);
                      }));
                      return function (_x5) {
                        return _ref4.apply(this, arguments);
                      };
                    }()); //    Guardo en nombresParticipantes el resultado de la promesa
                    _context3.next = 4;
                    return Promise.all(nombresPromesas);
                  case 4:
                    nombresParticipantes = _context3.sent;
                    //    Guardo los participantes en el objeto evento
                    evento.participantes = nombresParticipantes;

                    //    Declaro la fecha actual y la del evento para compararlas más adelante
                    fechaActual = new Date();
                    fechaEvento = new Date(evento.fecha); //    Formateo la fecha
                    evento.fecha = formatearFecha(evento.fecha);
                    //    Formateo la duracion
                    evento.duracion = convertirMilisegundosAHMS(evento.duracion);

                    //    Compruebo si ya ha pasado el evento para almacenarlos en proximosEventos o en eventosPasados
                    if (fechaActual < fechaEvento) {
                      proximosEventos.push(evento);
                    } else {
                      eventosPasados.push(evento);
                    }
                  case 11:
                  case "end":
                    return _context3.stop();
                }
              }, _callee3);
            }));
            return function (_x4) {
              return _ref3.apply(this, arguments);
            };
          }()); //  Espero a la promesa
          _context4.next = 15;
          return Promise.all(eventosPromesas);
        case 15:
          //  Guardo en una lista llamada eventos los dos objetos de eventos
          eventos = [eventosPasados, proximosEventos]; //  Envío los eventos
          res.json(eventos);
          // } catch (error) {
          //   res.status(500);
          //   res.send(error.message);
          // }
        case 17:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function getEventos(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

//  #################################### VER EVENTO POR ID ####################################
var getEventoId = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var id, connection, result;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          //  Coge la id de los parametros
          id = req.params.id; //  Crea la conexion
          _context5.next = 4;
          return (0, _database.getConnection)();
        case 4:
          connection = _context5.sent;
          _context5.next = 7;
          return connection.query("SELECT * from eventos WHERE ideventos = ?", id);
        case 7:
          result = _context5.sent;
          //  Devuelve un JSON con los datos obtenidos
          res.json(result);
          _context5.next = 15;
          break;
        case 11:
          _context5.prev = 11;
          _context5.t0 = _context5["catch"](0);
          //  Si hay un error mandaría el error 500 (fallo del servidor) y mandaría el mensaje del error
          res.status(500);
          res.send(_context5.t0.message);
        case 15:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 11]]);
  }));
  return function getEventoId(_x6, _x7) {
    return _ref5.apply(this, arguments);
  };
}();

// -------------------------------------------------------------------------------------------------- POST --------------------------------------------------------------------------------------------------

//  #################################### AÑADIR NUEVO EVENTO ####################################
var addEvento = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    var ideventos, fecha, _req$body, nombre, hora, ubicacion, participantes, duracion, id_casa, respuesta, horaFormateada, correosParticipantes, malCorreo, evento, connection, eventoCreado;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return _generarIdAleatorio.methods.generateEncryptedId();
        case 3:
          ideventos = _context7.sent;
          //  Guardo los atributos del usuario que me envia la peticion (el id no se pone porque se autoincrementa)
          fecha = req.body.fecha;
          _req$body = req.body, nombre = _req$body.nombre, hora = _req$body.hora, ubicacion = _req$body.ubicacion, participantes = _req$body.participantes, duracion = _req$body.duracion, id_casa = _req$body.id_casa; //Comprueba que ninguno de los campos este vacio
          if (!(!ideventos || !nombre || !fecha || !ubicacion)) {
            _context7.next = 9;
            break;
          }
          respuesta = res.status(400).json({
            message: "Rellena todos los campos por favor"
          });
          return _context7.abrupt("return", respuesta);
        case 9:
          horaFormateada = hora + ':00.000000';
          fecha = "".concat(fecha, " ").concat(horaFormateada);
          correosParticipantes = participantes.split(','); // Declaro una variable para saber si los correos están registrados en la app
          malCorreo = false; // Mapeo los correos
          _context7.next = 15;
          return Promise.all(correosParticipantes.map( /*#__PURE__*/function () {
            var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(participante) {
              var connection, usuario;
              return _regeneratorRuntime().wrap(function _callee6$(_context6) {
                while (1) switch (_context6.prev = _context6.next) {
                  case 0:
                    _context6.next = 2;
                    return (0, _database.getConnection)();
                  case 2:
                    connection = _context6.sent;
                    _context6.next = 5;
                    return connection.query("SELECT nombre FROM usuarios WHERE correo = ?", participante);
                  case 5:
                    usuario = _context6.sent;
                    // Si el usuario está vacío significa que no encontro ningún usuario con ese correo
                    if (usuario.length == 0) {
                      // Cambio la variable malCorreo a true
                      malCorreo = true;
                    }
                  case 7:
                  case "end":
                    return _context6.stop();
                }
              }, _callee6);
            }));
            return function (_x10) {
              return _ref7.apply(this, arguments);
            };
          }()));
        case 15:
          if (!(malCorreo == true)) {
            _context7.next = 17;
            break;
          }
          return _context7.abrupt("return", res.status(400).json({
            message: "Alguno de los correos no se corresponden a usuarios de la aplicación"
          }));
        case 17:
          //  Creo un objeto usuario con los atributos del usuario
          evento = {
            ideventos: ideventos,
            nombre: nombre,
            fecha: fecha,
            ubicacion: ubicacion,
            participantes: participantes,
            duracion: duracion,
            id_casa: id_casa
          }; //  Crea la conexion
          _context7.next = 20;
          return (0, _database.getConnection)();
        case 20:
          connection = _context7.sent;
          _context7.next = 23;
          return connection.query("INSERT INTO eventos SET ?", evento);
        case 23:
          eventoCreado = _context7.sent;
          //  Devuelve un JSON con los datos obtenidos
          res.json({
            eventoCreado: eventoCreado
          });
          _context7.next = 31;
          break;
        case 27:
          _context7.prev = 27;
          _context7.t0 = _context7["catch"](0);
          //  Si hay un error mandaría el error 500 (fallo del servidor) y mandaría el mensaje del error
          res.status(500);
          res.send(_context7.t0.message);
        case 31:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 27]]);
  }));
  return function addEvento(_x8, _x9) {
    return _ref6.apply(this, arguments);
  };
}();

// -------------------------------------------------------------------------------------------------- PUT --------------------------------------------------------------------------------------------------

//  #################################### ACTUALUZAR EVENTO ####################################
var updateEvento = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
    var id, _req$body2, ideventos, nombre, fecha, ubicacion, participantes, duracion, connection, evento, result;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          //  Recoge por parametros el id del usuario a cambiar
          id = req.params.id; //  Recoge en el body los datos que hay que actualizar
          //  Como el id pudo haber cambiado porque es un hash de el nombre y la casa a la que pertenece, lo envío en el body
          _req$body2 = req.body, ideventos = _req$body2.ideventos, nombre = _req$body2.nombre, fecha = _req$body2.fecha, ubicacion = _req$body2.ubicacion, participantes = _req$body2.participantes, duracion = _req$body2.duracion; //Comprueba que ninguno de los campos este vacio
          if (ideventos === undefined || nombre === undefined || fecha === undefined) {
            res.status(400).json({
              message: "Bad Request. Please fill  all field"
            });
          }

          //  Crea la conexion
          _context8.next = 6;
          return (0, _database.getConnection)();
        case 6:
          connection = _context8.sent;
          //  Creo un objeto usuario en el que guardo todos los datos del usuario
          evento = {
            ideventos: ideventos,
            nombre: nombre,
            fecha: fecha,
            ubicacion: ubicacion,
            participantes: participantes,
            duracion: duracion
          }; //  Guarda en la variable result la respuesta de la consulta
          _context8.next = 10;
          return connection.query("UPDATE eventos SET ? WHERE ideventos = ?", [evento, id]);
        case 10:
          result = _context8.sent;
          //  Devuelve un JSON con los datos obtenidos
          res.json(result);
          _context8.next = 18;
          break;
        case 14:
          _context8.prev = 14;
          _context8.t0 = _context8["catch"](0);
          //  Si hay un error mandaría el error 500 (fallo del servidor) y mandaría el mensaje del error
          res.status(500);
          res.send(_context8.t0.message);
        case 18:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[0, 14]]);
  }));
  return function updateEvento(_x11, _x12) {
    return _ref8.apply(this, arguments);
  };
}();

// -------------------------------------------------------------------------------------------------- DELETE --------------------------------------------------------------------------------------------------

//  #################################### ELIMINAR EVENTO ####################################
var deleteEvento = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res) {
    var id, connection, result;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          id = req.params.id; //  Crea la conexion
          _context9.next = 4;
          return (0, _database.getConnection)();
        case 4:
          connection = _context9.sent;
          _context9.next = 7;
          return connection.query("DELETE FROM eventos WHERE ideventos = ?", id);
        case 7:
          result = _context9.sent;
          //  Devuelve un JSON con los datos obtenidos
          res.json(result);
          _context9.next = 15;
          break;
        case 11:
          _context9.prev = 11;
          _context9.t0 = _context9["catch"](0);
          //  Si hay un error mandaría el error 500 (fallo del servidor) y mandaría el mensaje del error
          res.status(500);
          res.send(_context9.t0.message);
        case 15:
        case "end":
          return _context9.stop();
      }
    }, _callee9, null, [[0, 11]]);
  }));
  return function deleteEvento(_x13, _x14) {
    return _ref9.apply(this, arguments);
  };
}();

//  #################################### EXPORTAR METODOS ####################################
var methods = exports.methods = {
  getEventos: getEventos,
  getEventoId: getEventoId,
  addEvento: addEvento,
  updateEvento: updateEvento,
  deleteEvento: deleteEvento
};