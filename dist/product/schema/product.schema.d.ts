import mongoose, { Document, Types } from "mongoose";
export declare class Product extends Document {
    avatar: string[];
    quantity: number;
    productName: string;
    price: number;
    description: string;
    category: string;
    keywords: string[];
    type: string;
    status: boolean;
    storeId: string;
    storeName: string;
}
export declare const ProductSchema: mongoose.Schema<Product, mongoose.Model<Product, any, any, any, mongoose.Document<unknown, any, Product> & Product & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Product, mongoose.Document<unknown, {}, Product> & Product & {
    _id: Types.ObjectId;
}>;
