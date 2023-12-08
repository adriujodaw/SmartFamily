"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongose = require("mongose");
var roleSchema = new _mongose.Schema({
  name: String
}, {
  versionKey: false
});
var _default = exports["default"] = (0, _mongose.model)("Role", roleSchema);