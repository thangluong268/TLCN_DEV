import mongoose, { Document } from "mongoose";
export declare enum RoleName {
    USER = "User",
    SELLER = "Seller",
    MANAGER = "Manager",
    ADMIN = "Admin"
}
export declare class Role extends Document {
    name: RoleName;
    listUser: string[];
}
export declare const RoleSchema: mongoose.Schema<Role, mongoose.Model<Role, any, any, any, mongoose.Document<unknown, any, Role> & Role & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Role, mongoose.Document<unknown, {}, Role> & Role & {
    _id: mongoose.Types.ObjectId;
}>;
