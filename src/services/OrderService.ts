import utilsClass from "../utils/utils";
import Orders from "../database/orders";
import IOrders from "../models/IOrders";

export default class OrderService {
    public static getOrder(): Promise<IOrders[]>{
      return new Promise(async (resolve, reject) => {
        try {
          const listOrders = await Orders.aggregate([
            {
              $match: {
                isDeleted: false,
              },
            },
            {
              $lookup: {
                from: 'users',
                localField: 'senderId',
                foreignField: '_id',
                as: 'senderMatch'
              }
            },
            {
              $lookup: {
                from: 'users',
                localField: 'receiverId',
                foreignField: '_id',
                as: 'receiverMatch'
              }
            },
            {
              $project: {
                _id: 1,
                senderMatch: {
                  _id: 1,
                  names: 1,
                  email: 1,
                },
                receiverMatch: {
                  _id: 1,
                  names: 1,
                  email: 1,
                },
                
                height: 1,
                width: 1,
                depth: 1,
                weight: 1,
                cost: 1,
                date: 1,
                status: 1,
                city: 1,
                isDeleted: 1,
              }
            }
          ])
          resolve(listOrders);
        } catch (error: any) {
          reject(error);
        }
      });
    }

    public static createOrder(Order: IOrders): Promise<string>{
        return new Promise(async (resolve, reject) => {
            try {
                Order.cost = await utilsClass.calculateCost(Order);
                await Orders.create(Order);
                resolve('Orden creado Correctamente')
            } catch (error) {
                reject(error);
            }
        })
    }

    public static editOrder(OrderId: Object, Order: IOrders): Promise<String> {
        return new Promise(async (resolve, reject) => {
          try {

            await Orders.updateOne({ _id: OrderId }, Order);
            resolve(`Orden editada correctamente.`);
          } catch (error) {
            reject(error);
          }
        });
      }
    
      public static deleteOrder(OrderId: Object): Promise<string>{
        return new Promise(async(resolve, reject) => {
          try {
            await Orders.updateOne({ _id: OrderId }, { isDeleted: true })
            resolve('Orden Eliminada correctamente.')
          } catch (error) {
            reject(error)
          }
        });
      }

      public static findById(OrderId: Object): Promise<IOrders | null>{
        return new Promise(async (resolve, reject) => {
          try {
            const OrderById: IOrders = await Orders.findOne({ _id: OrderId }, { isDeleted: false }).lean();
            resolve(OrderById);
          } catch (error: any) {
            reject(error);
          }
        })
      }
}