import { mySQLDB } from '../services/database';

class ProductosPersistencia {
  async getAllproductos() {
    return mySQLDB.from('productos').select();
  }

  async getProductosById(id) {
    return mySQLDB.from('productos').where({ id: id }).select();
  }

  async createProducto(data) {
    return mySQLDB('productos').insert(data);
  }

  async update(id, data) {
    return mySQLDB.from('productos').where({ id }).update(data);
  }

  async delete(id) {
    return mySQLDB.from('productos').where({ id }).del();
  }

  async query(query) {
    return mySQLDB.from('productos').where(query);
  }
}

export const productos = new ProductosPersistencia();