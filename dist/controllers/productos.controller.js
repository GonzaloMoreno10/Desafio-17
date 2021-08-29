"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.productoController = void 0;

var _productos = require("../repository/productos.repository");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var tableName = 'productos';

class ProductosController {
  getAllproductos(req, res) {
    return _asyncToGenerator(function* () {
      var items = yield _productos.productos.getAllproductos();
      res.json({
        data: items
      });
    })();
  }

  getProductosByid(req, res) {
    return _asyncToGenerator(function* () {
      var {
        id
      } = req.params;
      var item = yield _productos.productos.getProductosById(id);

      if (!item) {
        return res.status(404).json({
          msg: 'Producto no encontrado'
        });
      }

      res.json({
        data: item
      });
    })();
  }

  createProductos(req, res) {
    return _asyncToGenerator(function* () {
      var {
        title,
        price,
        thumbnail
      } = req.body;
      var producto = {
        title,
        price,
        thumbnail
      };
      var id = yield _productos.productos.createProducto(producto);
      var newItem = yield _productos.productos.getAllproductos(id);
      res.json({
        data: newItem
      });
    })();
  }

  updateProductos(req, res) {
    return _asyncToGenerator(function* () {
      var {
        title,
        price,
        thumbnail
      } = req.body;
      var {
        id
      } = req.params;

      if (!title || !price || !thumbnail) {
        return res.status(400).json({
          msg: 'Invalida body'
        });
      }

      var productoOriginal = yield _productos.productos.getProductosById(id);

      if (!productoOriginal.length) {
        return res.status(404).json({
          msg: 'Producto no encontrado'
        });
      }

      var producto = {
        title,
        price,
        thumbnail
      };
      yield _productos.productos.update(id, producto);
      var item = yield _productos.productos.getProductosById(id);
      res.json({
        msg: 'Producto Actualizado',
        item
      });
    })();
  }

  deleteProductos(req, res) {
    return _asyncToGenerator(function* () {
      var {
        id
      } = req.params;
      var producto = yield _productos.productos.delete(id);

      if (!producto) {
        return res.status(404).json({
          msg: 'Producto no encontrado'
        });
      }

      yield _productos.productos.delete(id);
      res.json({
        msg: 'Producto eliminado'
      });
    })();
  }

}

var productoController = new ProductosController();
exports.productoController = productoController;