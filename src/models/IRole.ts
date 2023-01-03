import mongoose from "mongoose";

export default interface IRole {
    _id?: mongoose.Types.ObjectId;
    name: string;
    permissions: string[];
    isDeleted?: boolean;
}

export enum ERolePermissions {
    CREATE = "CREATE",
    EDIT = "EDIT",
    DELETE = "DELETE",
    SEARCH = "SEARCH",
}
