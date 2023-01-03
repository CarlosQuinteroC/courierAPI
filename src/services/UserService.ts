import User from "../database/user";
import * as bcrypt from 'bcrypt';
import IUser from "../models/IUser";

export default class UserService {
    public static getUSer(): Promise<IUser[]>{
      return new Promise(async (resolve, reject) => {
        try {
          const listUsers = await User.aggregate([
            {
              $match: {
                isDeleted: false,
              },
            },
            {
              $lookup: {
                from: 'roles',
                localField: 'roleId',
                foreignField: '_id',
                as: 'roleMatch'
              }
            },
            {
              $unwind: "$roleMatch"
            },
            {
              $project: {
                _id: 1,
                names: 1,
                lastName: 1,
                identification: 1,
                email: 1,
                role: 1,
                roleName: "$roleMatch.name",
                permisions: "$roleMatch.permisions",
                city: 1,
                address: 1,
                isDeleted: 1,
              }
            }
          ])
          resolve(listUsers);
        } catch (error: any) {
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
            await User.updateOne({ _id: userId }, user);
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
/*
      public static findById(userId: Object): Promise<IUser | null>{
        return new Promise(async (resolve, reject) => {
          try {
            const UserById = await User.findOne({ _id: userId }, { isDeleted: false });
            resolve(UserById);
          } catch (error: any) {
            reject(error);
          }
        })
      }*/
}