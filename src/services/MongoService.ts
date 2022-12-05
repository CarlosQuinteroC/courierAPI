import mongoose from 'mongoose';
import config from '../config';


//Servicio para abrir la conexion con mongo
export default class MongoService {
    public static async connect() {
      let conn = null;
      if (conn === null) {
        conn = mongoose
          .connect(config.databaseString, {
            serverSelectionTimeoutMS: 5000,
          })
          .then(() => mongoose);
          console.log('Database connected');
      }
      return conn;
    }
  }