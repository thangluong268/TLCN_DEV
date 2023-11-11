import mongoose, { Document, Types } from "mongoose";
export declare class Store extends Document {
    userId: string;
    avatar: string;
    storeName: string;
    address: string;
    phone: string[];
    warningCount: number;
    status: boolean;
}
export declare const StoreSchema: mongoose.Schema<Store, mongoose.Model<Store, any, any, any, mongoose.Document<unknown, any, Store> & Store & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Store, mongoose.Document<unknown, {}, Store> & Store & {
    _id: Types.ObjectId;
}>;
