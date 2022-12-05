import User from "../database/user";
import * as bcrypt from 'bcrypt';
import { response } from "express";
import IUser from "models/IUser";

export default class UserService {
    public static getUSer(): Promise<IUser[]>{
        return new Promise( async (resolve, reject) => {
            try {
                const resultService = await User.find({ isDeleted : false });
                resolve(resultService);
            } catch (error) {
                reject(error);
            }
        });
    }

    public static createUser(user: IUser): Promise<string>{
        return new Promise(async (resolve, reject) => {
            try {
                user.password = bcrypt.hashSync(user.password,10);
                await User.create(user);
                resolve('Usuario creado Correctamente')
            } catch (error) {
                reject(error);
            }
        })
    }

    public static editUser(userId: Object, user: IUser): Promise<String> {
        return new Promise(async (resolve, reject) => {
          try {
            user.password = bcrypt.hashSync(user.password,10);
            const serviceResult =  await User.updateOne({ _id: userId }, user);
            resolve(`Usuario ${user.names} ${user.lastName} editado correctamente.`);
          } catch (error) {
            reject(error);
          }
        });
      }
    
      public static deleteUser(userId: Object): Promise<string>{
        return new Promise(async(resolve, reject) => {
          try {
            await User.updateOne({ _id: userId }, { isDeleted: true })
            resolve('Usuario Eliminado correctamente.')
          } catch (error) {
            reject(error)
          }
        });
      }

      public static findById(userId: Object): Promise<IUser>{
        return new Promise(async(resolve, reject) => {
          try {
            const serviceResult = await User.findById({ _id: userId});
            resolve(serviceResult!);
          } catch (error) {
            reject(error);
          }
        });
      }
}