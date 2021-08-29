"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.productos = void 0;

var _database = require("../services/database");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

class ProductosPersistencia {
  getAllproductos() {
    return _asyncToGenerator(function* () {
      return _database.mySQLDB.from('productos').select();
    })();
  }

  getProductosById(id) {
    return _asyncToGenerator(function* () {
      return _database.mySQLDB.from('productos').where({
        id: id
      }).select();
    })();
  }

  createProducto(data) {
    return _asyncToGenerator(function* () {
      return (0, _database.mySQLDB)('productos').insert(data);
    })();
  }

  update(id, data) {
    return _asyncToGenerator(function* () {
      return _database.mySQLDB.from('productos').where({
        id
      }).update(data);
    })();
  }

  delete(id) {
    return _asyncToGenerator(function* () {
      return _database.mySQLDB.from('productos').where({
        id
      }).del();
    })();
  }

  query(query) {
    return _asyncToGenerator(function* () {
      return _database.mySQLDB.from('productos').where(query);
    })();
  }

}

var productos = new ProductosPersistencia();
exports.productos = productos;