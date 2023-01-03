import mongoose from 'mongoose';

export default interface IUser {
    _id?: mongoose.Types.ObjectId;
    companyId?:mongoose.Types.ObjectId;
    names: string;
    lastName: string;
    identification: Number;
    email: string;
    password: string;
    roleId: mongoose.Types.ObjectId;
    city: string;
    address: string;
    isDeleted: Boolean;
}