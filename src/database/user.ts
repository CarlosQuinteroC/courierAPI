// crear un esquema de usuarios
import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = new Schema(
    {
        companyId:{
            type: mongoose.Types.ObjectId,
        },
        names: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        identification:{
            type: Number,
            required: true
        },
        email: {
            type: String,
            required: true,
            index: {
                unique: true,
            },
        },
        password: {
            type: String,
            required: true,
            select: false
        },
        roleId: {
            type: mongoose.Types.ObjectId, //No se envia rreglo pues solo es posible tener un role
            required: true
        },
        city:{
            type: String,
            required: true
        },
        address:{
            type: String,
            required: true
        },
        isDeleted: {
            type: Boolean,
            default: false
        },
        
    },
    {
        collection: 'users',
        versionKey: false,
    }
);

const User = mongoose.model('User', UserSchema);

export default User;
