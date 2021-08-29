import { sqliteDB } from '../services/database';

class MensajesRepository {
    async getAllMensajes() {
      return sqliteDB.from('mensajes').select();
    }
  
   
  
    async createMensaje(data) {
      return sqliteDB('mensajes').insert(data);
    }
  
    
  }
  
  export const mensajes = new MensajesRepository();