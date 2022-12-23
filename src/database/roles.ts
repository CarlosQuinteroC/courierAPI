import { ERolePermissions } from "../models/IRole";
import mongoose from "mongoose";

const { Schema } = mongoose;

const RoleSchema = new Schema(
    {
        
        name: {
            type: String,
            required: true,
        },
        permissions: {
            type: [String],
            enum: Object.values(ERolePermissions),
            required: true
        },
        isDeleted: {
            type: Boolean,
            default: false,
        }
    },
    {
        collection: 'roles',
        versionKey: false,
    }
);

const Role = mongoose.model('Role', RoleSchema);
export default Role;