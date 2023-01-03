import mongoose from 'mongoose';

export default interface ICompany {
    _id?: mongoose.Types.ObjectId;
    name: string;
    phone: Number;
    city: Number;
    address: string;
    email: string;
    isDeleted: Boolean;
}