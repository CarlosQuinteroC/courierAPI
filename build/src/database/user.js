"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// crear un esquema de usuarios
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const UserSchema = new Schema({
    names: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
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
    },
    role: {
        type: mongoose_1.default.Types.ObjectId, //No se envia rreglo pues solo es posible tener un role
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
}, {
    collection: 'users',
    versionKey: false,
});
const User = mongoose_1.default.model('User', UserSchema);
exports.default = User;
