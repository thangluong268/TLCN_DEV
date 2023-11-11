import mongoose, { Document, Types } from "mongoose";
import { AddressProfileDto } from "../dto/address-profile.dto";
export declare class User extends Document {
    avatar: string;
    fullName: string;
    email: string;
    password: string;
    address: AddressProfileDto[];
    phone: string;
    gender: string;
    birthday: string;
    friends: string[];
    followStores: string[];
    wallet: number;
    warningCount: number;
    status: string;
}
export declare const UserSchema: mongoose.Schema<User, mongoose.Model<User, any, any, any, mongoose.Document<unknown, any, User> & User & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, User, mongoose.Document<unknown, {}, User> & User & {
    _id: Types.ObjectId;
}>;
