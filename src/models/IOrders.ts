import mongoose from "mongoose";

export default interface IOrders {
    _id?: mongoose.Types.ObjectId;
    senderId: mongoose.Types.ObjectId;
    receiverId: mongoose.Types.ObjectId;
    height: number;
    width: number;
    depth: number;
    weight: number;
    cost?: number;
    date?: Date;
    status?: String;
    isDeleted?: boolean;
}

export enum EOrdersStatus {
    CREATED = "CREATED",
    EXECUTE = "ONRODAD",
    FINISHED = "FINISHED",
  }