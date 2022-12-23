import { EOrdersStatus } from "../models/IOrders";
import mongoose from "mongoose";

const { Schema } = mongoose;

const OrdersSchema = new Schema(
    {
        senderId: {
            type: mongoose.Types.ObjectId,
            required: true
        },
        receiverId: {
            type: mongoose.Types.ObjectId,
            required: true
        },
        height: {
            type: Number,
            required: true
        },
        width: {
            type: Number,
            required: true
        },
        depth: {
            type: Number,
            required: true
        },
        weight:{
            type: Number,
            required: true
        },
        cost:{
            type: Number,
            
        },
        date: {
            type: Date,
            required: true,
            default: new Date(),
        },
        status:{
            type: String,
            enum: Object.values(EOrdersStatus),
        },
        isDeleted: {
            type: Boolean,
            default: false
        }
    },
    {
        collection: 'orders',
        versionKey: false,
    }
);

const Orders = mongoose.model('Orders', OrdersSchema);
export default Orders;